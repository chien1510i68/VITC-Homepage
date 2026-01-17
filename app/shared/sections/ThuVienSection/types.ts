export interface LibraryItem {
  id: string | number;
  title: string;
  excerpt?: string;
  image?: string;
  date?: string;
  type?: 'document' | 'slide' | 'video';
  url?: string;
  fileUrl?: string;
}

export interface ThuVienSectionProps {
  title?: string;
  description?: string;
  label?: string;
  items: LibraryItem[];
  maxItems?: number;
  className?: string;
  id?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}
