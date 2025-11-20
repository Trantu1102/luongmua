export interface RainfallYear {
  year: string | number;
  rainfall: number; // mm
  isForecast?: boolean;
}

export interface ProvinceData {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // % relative to map container
  region: 'North' | 'Central' | 'South' | 'Highlands';
}

export interface AnalysisResult {
  provinceName: string;
  chartData: RainfallYear[];
  analysisText: string;
  laNinaImpact: 'High' | 'Medium' | 'Low' | 'Unknown';
  average10Years: number;
  rainfall2025: number;
  sources?: Array<{ title: string; url: string }>;
}

export enum LoadingState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}