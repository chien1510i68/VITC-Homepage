export interface UtilityItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  color: string;
}

export interface ServiceItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}
