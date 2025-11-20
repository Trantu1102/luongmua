import React from 'react';
import { AnalysisResult } from '../types';
import RainfallChart from './RainfallChart';
import { CloudRain, TrendingUp, AlertTriangle, ExternalLink, Droplets } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AnalysisPanelProps {
  data: AnalysisResult;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ data }) => {
  const isHighImpact = data.laNinaImpact === 'High';
  const percentageDiff = data.average10Years > 0 
    ? ((data.rainfall2025 - data.average10Years) / data.average10Years) * 100 
    : 0;

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Droplets size={20} />
            </div>
            <span className="text-slate-500 text-sm font-medium">Lượng mưa 2025</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{data.rainfall2025.toLocaleString()} <span className="text-sm font-normal text-slate-500">mm</span></p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border-l-4 border-indigo-500 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <TrendingUp size={20} />
            </div>
            <span className="text-slate-500 text-sm font-medium">Trung bình 10 năm</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{data.average10Years.toLocaleString()} <span className="text-sm font-normal text-slate-500">mm</span></p>
        </div>

        <div className={`glass-panel p-4 rounded-2xl border-l-4 shadow-sm ${isHighImpact ? 'border-red-500 bg-red-50/50' : 'border-green-500 bg-green-50/50'}`}>
          <div className="flex items-center gap-3 mb-2">
             <div className={`p-2 rounded-lg ${isHighImpact ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              <AlertTriangle size={20} />
            </div>
            <span className="text-slate-500 text-sm font-medium">Tác động La Nina</span>
          </div>
          <p className={`text-lg font-bold ${isHighImpact ? 'text-red-700' : 'text-green-700'}`}>
            {isHighImpact ? 'Nguy cơ cao' : data.laNinaImpact === 'Medium' ? 'Trung bình' : 'Thấp/Chưa rõ'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {percentageDiff > 0 ? '+' : ''}{percentageDiff.toFixed(1)}% so với TB
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-panel p-6 rounded-3xl shadow-lg border border-white/50">
        <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
          <CloudRain className="text-blue-500" size={20}/>
          Biểu đồ lượng mưa (2015 - 2025)
        </h3>
        <RainfallChart data={data.chartData} average={data.average10Years} />
      </div>

      {/* Analysis Text Section */}
      <div className="glass-panel p-6 rounded-3xl shadow-lg border border-white/50">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Phân tích chuyên sâu từ AI</h3>
        <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed">
           <ReactMarkdown>{data.analysisText}</ReactMarkdown>
        </div>
      </div>
      
      {/* Grounding Sources */}
      {data.sources && data.sources.length > 0 && (
        <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nguồn dữ liệu (Google Search)</p>
          <ul className="space-y-2">
            {data.sources.map((source, idx) => (
              <li key={idx}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline truncate">
                  <ExternalLink size={14} />
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalysisPanel;
