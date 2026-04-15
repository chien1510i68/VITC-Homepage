'use client';

import React from 'react';

interface QuestionGridProps {
  totalQuestions: number;
  userAnswers: Record<string, string>;
  questionIds: string[];
  onJumpToQuestion: (idx: number) => void;
  results?: Record<string, boolean>;
}

export default function QuestionGrid({ 
  userAnswers, 
  questionIds,
  onJumpToQuestion,
  results
}: QuestionGridProps) {
  return (
    <div className="flex gap-1 flex-wrap">
      {questionIds.map((id, idx) => {
        const isAnswered = !!userAnswers[id];
        const isCorrect = results ? results[id] : null;
        
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-500';

        if (isAnswered) {
          bgColor = 'bg-[#07314e]';
          textColor = 'text-white';
        }

        if (isCorrect === true) {
          bgColor = 'bg-green-500';
          textColor = 'text-white';
        } else if (isCorrect === false) {
          bgColor = 'bg-red-500';
          textColor = 'text-white';
        }

        return (
          <button
            key={id}
            onClick={() => onJumpToQuestion(idx)}
            className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold rounded ${bgColor} ${textColor} hover:opacity-80 transition-all active:scale-95`}
            title={`Câu ${idx + 1}`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
}