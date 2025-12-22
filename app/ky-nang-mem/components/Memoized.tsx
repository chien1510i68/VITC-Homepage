import { memo } from 'react';
import { InstructorCard } from './InstructorCard';
import { LeaderCard } from './LeaderCard';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card } from './Card';
import type { Instructor, Leader } from '../types';

// Memoized InstructorCard - prevents re-render when props don't change
export const MemoizedInstructorCard = memo(InstructorCard, (prevProps, nextProps) => {
  return (
    prevProps.instructor.id === nextProps.instructor.id &&
    prevProps.delay === nextProps.delay
  );
});

MemoizedInstructorCard.displayName = 'MemoizedInstructorCard';

// Memoized LeaderCard - prevents re-render when props don't change
export const MemoizedLeaderCard = memo(LeaderCard, (prevProps, nextProps) => {
  return (
    prevProps.leader.id === nextProps.leader.id &&
    prevProps.delay === nextProps.delay
  );
});

MemoizedLeaderCard.displayName = 'MemoizedLeaderCard';

// Memoized Button - prevents re-render when props don't change
export const MemoizedButton = memo(Button);
MemoizedButton.displayName = 'MemoizedButton';

// Memoized Badge - prevents re-render when props don't change
export const MemoizedBadge = memo(Badge);
MemoizedBadge.displayName = 'MemoizedBadge';

// Memoized Card - prevents re-render when props don't change
export const MemoizedCard = memo(Card);
MemoizedCard.displayName = 'MemoizedCard';
