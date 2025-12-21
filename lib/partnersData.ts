export interface PartnerItem {
  id: number | string;
  name: string;
  logo: string;
  url?: string;
}

export const PARTNERS: PartnerItem[] = [
  { id: 1, name: 'FPT Software', logo: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2019/08/Picture1.png', url: 'https://fptsoftware.com' },
  { id: 6, name: 'Viettel', logo: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2019/08/Picture2.png', url: 'https://viettel.com.vn' },
  { id: 7, name: 'VNPT', logo: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2019/08/Picture3.png', url: 'https://vnpt.vn' },
  { id: 7, name: 'VNPT', logo: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2019/08/Picture4.png', url: 'https://vnpt.vn' },
  { id: 7, name: 'VNPT', logo: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2019/08/Picture5.png', url: 'https://vnpt.vn' },
  { id: 7, name: 'VNPT', logo: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2019/08/Picture6.png', url: 'https://vnpt.vn' }
 ];

export default PARTNERS;
