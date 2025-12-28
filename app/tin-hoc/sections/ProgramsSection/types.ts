import { Program } from '@/lib/api';

export interface ProgramsSectionProps {
  programs: Program[];
  selectedProgram: Program | null;
  isLoading: boolean;
  onProgramSelect: (program: Program) => void;
}

export interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  onSelect: (program: Program) => void;
}

export interface ProgramDetailProps {
  program: Program;
}

export interface ProgramListProps {
  programs: Program[];
  selectedProgram: Program | null;
  onProgramSelect: (program: Program) => void;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}