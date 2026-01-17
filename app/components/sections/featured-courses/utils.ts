export const getBadgeStyles = (type: string) => {
  switch (type) {
    case 'hot':
      return 'bg-orange-500 text-white shadow-lg';
    case 'upcoming':
      return 'bg-green-600 text-white shadow-lg';
    case 'new':
      return 'bg-green-500 text-white shadow-lg';
    default:
      return 'bg-gray-500 text-white shadow-lg';
  }
};