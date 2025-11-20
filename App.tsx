import React, { useState, useCallback } from 'react';
import { Search, MapPin, CloudLightning, Info, Loader2, Droplets } from 'lucide-react';
import AnalysisPanel from './components/AnalysisPanel';
import { PROVINCES } from './constants';
import { analyzeRainfall } from './services/geminiService';
import { ProvinceData, AnalysisResult, LoadingState } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle province selection
  const handleSelectProvince = useCallback(async (province: ProvinceData) => {
    setSelectedProvince(province);
    setSearchQuery(province.name);
    setLoadingState(LoadingState.LOADING);
    setErrorMsg(null);
    setAnalysisData(null);

    try {
      const result = await analyzeRainfall(province.name);
      setAnalysisData(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("Không thể lấy dữ liệu. Vui lòng thử lại sau.");
      setLoadingState(LoadingState.ERROR);
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Reset selected province to allow autocomplete to show again if user edits text
    if (selectedProvince && e.target.value !== selectedProvince.name) {
      setSelectedProvince(null);
    }
  };

  // Filter provinces for search autocomplete
  const filteredProvinces = searchQuery
    ? PROVINCES.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const showDropdown = searchQuery && filteredProvinces.length > 0 && (!selectedProvince || searchQuery !== selectedProvince.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 font-sans">
      
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-200 animate-float">
            <CloudLightning className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">VinaRain <span className="text-blue-600">AI Expert</span></h1>
            <p className="text-slate-500 text-sm">Chuyên gia phân tích lượng mưa & thiên tai</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-[400px] group z-50">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3.5 border-none rounded-xl bg-white shadow-md ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
            placeholder="Nhập tên tỉnh thành để phân tích..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          
          {/* Autocomplete Dropdown */}
          {showDropdown && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
              {filteredProvinces.map(p => (
                <button
                  key={p.id}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                  onClick={() => handleSelectProvince(p)}
                >
                  <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
                    <MapPin size={14} />
                  </div>
                  <span className="text-slate-700 font-medium">{p.name}</span>
                  <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{p.region}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto transition-all duration-500">
          
          {/* LOADING STATE */}
          {loadingState === LoadingState.LOADING && (
            <div className="flex flex-col items-center justify-center glass-panel rounded-3xl p-12 text-center space-y-8 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 rounded-full animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Đang phân tích dữ liệu...</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Hệ thống đang tìm kiếm số liệu lượng mưa và đánh giá rủi ro La Nina cho 
                  <span className="font-bold text-blue-600 ml-1.5">{selectedProvince?.name}</span>.
                </p>
              </div>
            </div>
          )}

          {/* ERROR STATE */}
          {loadingState === LoadingState.ERROR && (
            <div className="flex flex-col items-center justify-center glass-panel rounded-3xl p-12 text-center animate-fade-in">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-500">
                 <Info size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-800">Đã xảy ra lỗi</h3>
               <p className="text-slate-500 mt-2 mb-6">{errorMsg}</p>
               <button 
                 onClick={() => selectedProvince && handleSelectProvince(selectedProvince)}
                 className="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200 flex items-center gap-2"
               >
                 <Loader2 size={16} className="animate-spin" style={{ display: 'none' }} /> {/* Placeholder for icon */}
                 Thử lại ngay
               </button>
            </div>
          )}

          {/* SUCCESS STATE */}
          {loadingState === LoadingState.SUCCESS && analysisData && (
            <div className="animate-fade-in-up">
              <div className="mb-6 flex items-center gap-3">
                 <div className="h-10 w-1 bg-blue-500 rounded-full"></div>
                 <h2 className="text-2xl font-bold text-slate-800">Báo cáo: {analysisData.provinceName}</h2>
              </div>
              <AnalysisPanel data={analysisData} />
            </div>
          )}

           {/* IDLE STATE (Welcome) */}
           {loadingState === LoadingState.IDLE && (
            <div className="glass-panel p-10 rounded-3xl border border-white/60 text-center shadow-xl shadow-slate-200/50">
              <div className="bg-gradient-to-tr from-blue-100 to-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Droplets className="text-blue-600 w-12 h-12" />
              </div>
              
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Tra cứu lượng mưa & Dự báo 2025</h2>
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 text-lg">
                Hệ thống sử dụng trí tuệ nhân tạo <strong>Gemini 2.5 Flash</strong> kết hợp với <strong>Google Search</strong> để tổng hợp dữ liệu lượng mưa thực tế trong 10 năm qua tại Việt Nam.
                <br className="hidden md:block" />
                Đặc biệt tập trung phân tích ảnh hưởng của <strong>La Nina</strong> đến xu thế thời tiết năm 2025.
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-full text-sm font-medium">
                 <Search size={16} />
                 Nhập tên tỉnh thành vào ô tìm kiếm phía trên để bắt đầu
              </div>
            </div>
          )}

      </main>
    </div>
  );
};

export default App;