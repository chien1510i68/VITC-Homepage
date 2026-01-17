import { MapPin, Award, Star } from 'lucide-react';

type IconType = 'location' | 'certificate' | 'rating';

interface FeatureIconProps {
  type: IconType;
  className?: string;
}

export function FeatureIcon({ type, className = 'w-12 h-12 text-gray-900' }: FeatureIconProps) {
  const icons = {
    location: MapPin,
    certificate: Award,
    rating: Star,
  };

  const Icon = icons[type];
  return <Icon className={className} strokeWidth={1} />;
}
