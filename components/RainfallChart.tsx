import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import { RainfallYear } from '../types';

interface RainfallChartProps {
  data: RainfallYear[];
  average: number;
}

const RainfallChart: React.FC<RainfallChartProps> = ({ data, average }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur p-3 border border-slate-200 shadow-xl rounded-lg text-sm">
          <p className="font-bold text-slate-700 mb-1">Năm {label}</p>
          <p className="text-blue-600 font-semibold">
            Lượng mưa: {payload[0].value.toLocaleString()} mm
          </p>
          {payload[0].payload.isForecast && (
            <span className="inline-block mt-1 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">
              Dự báo / Hiện tại
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[350px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
          <ReferenceLine y={average} label={{ value: 'TB 10 Năm', position: 'insideBottomRight', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
          <Bar dataKey="rainfall" radius={[4, 4, 0, 0]} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.year === 2025 || entry.year === '2025' 
                  ? (entry.rainfall > average * 1.2 ? '#ef4444' : '#f59e0b') 
                  : '#3b82f6'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center gap-4 mt-2 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-500 rounded-sm"></span> Lịch sử
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-amber-500 rounded-sm"></span> Năm 2025 (Dự báo/Thực tế)
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500 rounded-sm"></span> Cao bất thường (>20%)
        </div>
      </div>
    </div>
  );
};

export default RainfallChart;
