import React from 'react';
import { PROVINCES } from '../constants';
import { ProvinceData } from '../types';

interface VietnamMapProps {
  onProvinceSelect: (province: ProvinceData) => void;
  selectedProvince: ProvinceData | null;
}

const VietnamMap: React.FC<VietnamMapProps> = ({ onProvinceSelect, selectedProvince }) => {
  return (
    <div className="relative w-full h-[600px] bg-blue-50/50 rounded-3xl shadow-inner border border-blue-100 overflow-hidden">
      {/* Map Background Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>
      
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl text-xs text-slate-500 border border-slate-200 z-10 max-w-[200px]">
        <p className="font-semibold mb-1 text-blue-600">Bản đồ tương tác</p>
        <p>Di chuột hoặc chọn một điểm để xem dự báo mưa năm 2025.</p>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-full p-8">
        {PROVINCES.map((province) => {
          const isSelected = selectedProvince?.id === province.id;
          
          return (
            <div
              key={province.id}
              onClick={() => onProvinceSelect(province)}
              className={`absolute group cursor-pointer transition-all duration-500 ease-in-out flex flex-col items-center justify-center z-20`}
              style={{
                left: `${province.coordinates.x}%`,
                top: `${province.coordinates.y}%`,
                transform: 'translate(-50%, -50%)' // Center the dot
              }}
            >
              {/* Ripple Effect for Selected/Hover */}
              <div className={`absolute w-8 h-8 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500 ${isSelected ? 'animate-ping opacity-30' : ''}`}></div>
              
              {/* The Dot */}
              <div 
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 shadow-sm
                  ${isSelected 
                    ? 'bg-blue-600 border-white scale-125 shadow-blue-300' 
                    : 'bg-white border-blue-400 hover:bg-blue-500 hover:border-white hover:scale-110'
                  }
                `}
              />

              {/* Tooltip Label (Always visible if selected, else hover) */}
              <div className={`absolute top-4 pointer-events-none whitespace-nowrap z-30 transition-all duration-300 
                  ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
              `}>
                <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg flex flex-col items-center">
                   <span className="font-bold">{province.name}</span>
                   <span className="text-[9px] text-slate-300 font-light">Click để phân tích</span>
                </div>
                {/* Triangle pointer */}
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-slate-800 mx-auto -mt-[24px] mb-[18px] rotate-180"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Sea Labels for context */}
      <div className="absolute right-10 top-1/3 text-blue-200 font-bold text-2xl tracking-widest rotate-90 opacity-50 pointer-events-none select-none">BIỂN ĐÔNG</div>
      <div className="absolute left-4 top-10 text-slate-300 font-bold text-sm tracking-wide opacity-50 pointer-events-none select-none">LÀO</div>
      <div className="absolute left-10 bottom-1/3 text-slate-300 font-bold text-sm tracking-wide opacity-50 pointer-events-none select-none">CAMPUCHIA</div>

    </div>
  );
};

export default VietnamMap;
