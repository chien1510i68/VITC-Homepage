export interface NewsItem {
  id?: string | number;
  title: string;
  excerpt?: string;
  image?: string;
  date?: string;
  url?: string;
  slug?: string;
  category?: string;
  description?: string;
}

export type NewsLayout = 'horizontal-scroll' | 'grid' | 'list';

export interface NewsSectionProps {
  variant?: NewsLayout;
  title?: string;
  description?: string;
  label?: string;
  news: NewsItem[];
  isLoading?: boolean;
  maxItems?: number;
  showViewMore?: boolean;
  viewMoreUrl?: string;
  viewMoreText?: string;
  className?: string;
  id?: string;
}
