/**
 * GradeBadge Component - Displays grade classification with appropriate styling
 * @module shared/sections/CertificateLookupSection/components
 */

type GradeType = 'Giỏi' | 'Khá' | 'Trung bình' | string;

interface GradeBadgeProps {
  grade: GradeType;
}

/**
 * GradeBadge Component
 * Responsible for displaying grade classification badges (Giỏi, Khá, Trung bình) with appropriate colors only
 */
export function GradeBadge({ grade }: GradeBadgeProps) {
  const getGradeStyle = (grade: GradeType) => {
    switch (grade) {
      case 'Giỏi':
        return 'bg-green-100 text-green-800';
      case 'Khá':
        return 'bg-blue-100 text-blue-800';
      case 'Trung bình':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getGradeStyle(grade)}`}>
      {grade || '-'}
    </span>
  );
}
