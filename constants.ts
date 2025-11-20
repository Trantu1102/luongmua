import { ProvinceData } from './types';

// A simplified "Dot Map" representation of Vietnam
// Coordinates are percentage based (0-100) on a strictly aspect-ratio container
export const PROVINCES: ProvinceData[] = [
  // North
  { id: 'hagiang', name: 'Hà Giang', coordinates: { x: 40, y: 5 }, region: 'North' },
  { id: 'caobang', name: 'Cao Bằng', coordinates: { x: 55, y: 7 }, region: 'North' },
  { id: 'laocai', name: 'Lào Cai', coordinates: { x: 25, y: 8 }, region: 'North' },
  { id: 'yenbai', name: 'Yên Bái', coordinates: { x: 30, y: 12 }, region: 'North' },
  { id: 'tuyenquang', name: 'Tuyên Quang', coordinates: { x: 40, y: 12 }, region: 'North' },
  { id: 'langson', name: 'Lạng Sơn', coordinates: { x: 55, y: 15 }, region: 'North' },
  { id: 'thainguyen', name: 'Thái Nguyên', coordinates: { x: 45, y: 16 }, region: 'North' },
  { id: 'phutho', name: 'Phú Thọ', coordinates: { x: 35, y: 18 }, region: 'North' },
  { id: 'vinhphuc', name: 'Vĩnh Phúc', coordinates: { x: 38, y: 19 }, region: 'North' },
  { id: 'bacgiang', name: 'Bắc Giang', coordinates: { x: 50, y: 19 }, region: 'North' },
  { id: 'bacninh', name: 'Bắc Ninh', coordinates: { x: 48, y: 21 }, region: 'North' },
  { id: 'hanoi', name: 'Hà Nội', coordinates: { x: 42, y: 22 }, region: 'North' },
  { id: 'haiduong', name: 'Hải Dương', coordinates: { x: 52, y: 23 }, region: 'North' },
  { id: 'haiphong', name: 'Hải Phòng', coordinates: { x: 58, y: 24 }, region: 'North' },
  { id: 'quangninh', name: 'Quảng Ninh', coordinates: { x: 65, y: 22 }, region: 'North' },
  { id: 'hungyen', name: 'Hưng Yên', coordinates: { x: 45, y: 24 }, region: 'North' },
  { id: 'hanam', name: 'Hà Nam', coordinates: { x: 43, y: 26 }, region: 'North' },
  { id: 'thaibinh', name: 'Thái Bình', coordinates: { x: 50, y: 27 }, region: 'North' },
  { id: 'namdinh', name: 'Nam Định', coordinates: { x: 48, y: 28 }, region: 'North' },
  { id: 'ninhbinh', name: 'Ninh Bình', coordinates: { x: 42, y: 29 }, region: 'North' },
  { id: 'hoabinh', name: 'Hòa Bình', coordinates: { x: 30, y: 25 }, region: 'North' },
  { id: 'sonla', name: 'Sơn La', coordinates: { x: 20, y: 20 }, region: 'North' },
  { id: 'dienbien', name: 'Điện Biên', coordinates: { x: 10, y: 15 }, region: 'North' },
  { id: 'laichau', name: 'Lai Châu', coordinates: { x: 15, y: 10 }, region: 'North' },

  // North Central
  { id: 'thanhhoa', name: 'Thanh Hóa', coordinates: { x: 38, y: 33 }, region: 'Central' },
  { id: 'nghean', name: 'Nghệ An', coordinates: { x: 30, y: 38 }, region: 'Central' },
  { id: 'hatinh', name: 'Hà Tĩnh', coordinates: { x: 35, y: 43 }, region: 'Central' },
  { id: 'quangbinh', name: 'Quảng Bình', coordinates: { x: 40, y: 48 }, region: 'Central' },
  { id: 'quangtri', name: 'Quảng Trị', coordinates: { x: 45, y: 52 }, region: 'Central' },
  { id: 'thuuathienhue', name: 'Thừa Thiên Huế', coordinates: { x: 50, y: 55 }, region: 'Central' },

  // South Central
  { id: 'danang', name: 'Đà Nẵng', coordinates: { x: 55, y: 58 }, region: 'Central' },
  { id: 'quangnam', name: 'Quảng Nam', coordinates: { x: 55, y: 62 }, region: 'Central' },
  { id: 'quangngai', name: 'Quảng Ngãi', coordinates: { x: 60, y: 65 }, region: 'Central' },
  { id: 'binhdinh', name: 'Bình Định', coordinates: { x: 62, y: 70 }, region: 'Central' },
  { id: 'phuyen', name: 'Phú Yên', coordinates: { x: 63, y: 75 }, region: 'Central' },
  { id: 'khanhhoa', name: 'Khánh Hòa', coordinates: { x: 65, y: 80 }, region: 'Central' },
  { id: 'ninhthuan', name: 'Ninh Thuận', coordinates: { x: 60, y: 85 }, region: 'Central' },
  { id: 'binhthuan', name: 'Bình Thuận', coordinates: { x: 50, y: 88 }, region: 'Central' },

  // Highlands
  { id: 'kontum', name: 'Kon Tum', coordinates: { x: 48, y: 65 }, region: 'Highlands' },
  { id: 'gialai', name: 'Gia Lai', coordinates: { x: 48, y: 70 }, region: 'Highlands' },
  { id: 'daklak', name: 'Đắk Lắk', coordinates: { x: 45, y: 75 }, region: 'Highlands' },
  { id: 'daknong', name: 'Đắk Nông', coordinates: { x: 42, y: 80 }, region: 'Highlands' },
  { id: 'lamdong', name: 'Lâm Đồng', coordinates: { x: 45, y: 84 }, region: 'Highlands' },

  // South
  { id: 'binhphuoc', name: 'Bình Phước', coordinates: { x: 38, y: 82 }, region: 'South' },
  { id: 'tayninh', name: 'Tây Ninh', coordinates: { x: 30, y: 84 }, region: 'South' },
  { id: 'binhduong', name: 'Bình Dương', coordinates: { x: 35, y: 86 }, region: 'South' },
  { id: 'dongnai', name: 'Đồng Nai', coordinates: { x: 40, y: 88 }, region: 'South' },
  { id: 'bariavungtau', name: 'Bà Rịa - Vũng Tàu', coordinates: { x: 42, y: 92 }, region: 'South' },
  { id: 'hochiminh', name: 'TP. Hồ Chí Minh', coordinates: { x: 35, y: 90 }, region: 'South' },
  { id: 'longan', name: 'Long An', coordinates: { x: 28, y: 89 }, region: 'South' },
  { id: 'tiengiang', name: 'Tiền Giang', coordinates: { x: 28, y: 92 }, region: 'South' },
  { id: 'bentre', name: 'Bến Tre', coordinates: { x: 32, y: 94 }, region: 'South' },
  { id: 'travinh', name: 'Trà Vinh', coordinates: { x: 30, y: 96 }, region: 'South' },
  { id: 'vinhlong', name: 'Vĩnh Long', coordinates: { x: 25, y: 94 }, region: 'South' },
  { id: 'dongthap', name: 'Đồng Tháp', coordinates: { x: 22, y: 91 }, region: 'South' },
  { id: 'angiang', name: 'An Giang', coordinates: { x: 18, y: 92 }, region: 'South' },
  { id: 'kiengiang', name: 'Kiên Giang', coordinates: { x: 15, y: 95 }, region: 'South' },
  { id: 'cantho', name: 'Cần Thơ', coordinates: { x: 22, y: 95 }, region: 'South' },
  { id: 'haugiang', name: 'Hậu Giang', coordinates: { x: 22, y: 97 }, region: 'South' },
  { id: 'soctrang', name: 'Sóc Trăng', coordinates: { x: 25, y: 98 }, region: 'South' },
  { id: 'baclieu', name: 'Bạc Liêu', coordinates: { x: 20, y: 99 }, region: 'South' },
  { id: 'camau', name: 'Cà Mau', coordinates: { x: 15, y: 100 }, region: 'South' },
];
