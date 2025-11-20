import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, RainfallYear } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const analyzeRainfall = async (provinceName: string): Promise<AnalysisResult> => {
  
  const prompt = `
    Tôi cần tìm kiếm và phân tích dữ liệu lượng mưa trung bình năm (mm) của tỉnh/thành phố "${provinceName}" ở Việt Nam trong 10 năm qua (2015-2024) và năm 2025 (số liệu thực tế hoặc dự báo mới nhất).
    
    Hãy sử dụng Google Search để tìm số liệu chính xác từ các nguồn uy tín như Tổng cục Khí tượng Thủy văn, các báo cáo môi trường, hoặc tin tức báo chí uy tín.
    
    Nhiệm vụ của bạn:
    1. Tìm lượng mưa trung bình (mm/năm) cho từng năm từ 2015 đến 2025. Nếu không có số liệu chính xác cho một năm cụ thể, hãy ước lượng dựa trên vùng khí hậu hoặc số liệu trung bình nhiều năm của vùng đó, nhưng ưu tiên số liệu tìm kiếm được.
    2. Đặc biệt chú ý năm 2025: So sánh với trung bình 10 năm trước. Liệu có sự tăng đột biến nào do hiện tượng La Nina (hoặc ENSO) không?
    3. Trả về kết quả bao gồm một khối JSON (được bọc trong \`\`\`json ... \`\`\`) và một đoạn văn bản phân tích chi tiết bằng tiếng Việt.
    
    Cấu trúc JSON mong muốn:
    {
      "data": [
        {"year": 2015, "rainfall": 1800},
        ...
        {"year": 2025, "rainfall": 2400, "isForecast": true}
      ],
      "impactLevel": "High" | "Medium" | "Low" | "Unknown", // Mức độ ảnh hưởng của La Nina đến mưa năm 2025
      "analysis": "Tóm tắt ngắn gọn về xu thế mưa và tác động La Nina..."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || "";
    
    // Extract sources from grounding metadata
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => {
        if (chunk.web) {
          return { title: chunk.web.title, url: chunk.web.uri };
        }
        return null;
      })
      .filter((source: any) => source !== null) || [];

    // Extract JSON from the text response
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    let parsedData: any = {};
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        parsedData = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse JSON from Gemini response", e);
        // Fallback or error handling could go here
      }
    }

    // Validate and sanitize chart data
    const chartData: RainfallYear[] = Array.isArray(parsedData.data) 
      ? parsedData.data.map((item: any) => ({
          year: item.year,
          rainfall: Number(item.rainfall) || 0,
          isForecast: !!item.isForecast
        }))
      : [];

    // Calculate stats
    const rainfall2025 = chartData.find(d => d.year == 2025 || d.year === '2025')?.rainfall || 0;
    const pastYears = chartData.filter(d => d.year != 2025);
    const avg10Years = pastYears.length > 0 
      ? pastYears.reduce((sum, d) => sum + d.rainfall, 0) / pastYears.length
      : 0;

    // If JSON parsing failed or returned partial data, rely on text but ensure basic structure
    if (chartData.length === 0) {
        throw new Error("Could not extract valid rainfall data.");
    }

    return {
      provinceName,
      chartData,
      analysisText: text.replace(/```json[\s\S]*?```/, '').trim(), // Remove JSON block for clean text display
      laNinaImpact: parsedData.impactLevel || 'Unknown',
      average10Years: Math.round(avg10Years),
      rainfall2025: Math.round(rainfall2025),
      sources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
