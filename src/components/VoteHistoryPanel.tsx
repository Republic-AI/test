import React from 'react';
import { VoteHistory } from '@/types/drama';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

interface VoteHistoryPanelProps {
  voteHistory: VoteHistory[];
  className?: string;
}

const VoteHistoryPanel: React.FC<VoteHistoryPanelProps> = ({
  voteHistory,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      {voteHistory.map((vote, index) => (
        <React.Fragment key={`${vote.requestId}-${index}`}>
          {/* Question Box */}
          <div
            className={cn(
              "w-full max-w-2xl rounded-lg border-2 border-[#E3B341] px-4 py-2",
              vote.hasVoted ? "bg-[#E3B341]" : "bg-transparent"
            )}
          >
            <p className={cn(
              "text-center text-sm leading-tight",
              vote.hasVoted ? "text-[#8B5E34]" : "text-[#E3B341]"
            )}>
              {vote.content}
            </p>
          </div>

          {/* Vote Options - Show for all questions */}
          <div className="w-full flex flex-col items-center">
            <div className="flex items-end justify-center relative w-full max-w-md">
              {vote.options.map((option) => {
                const isCorrect = option === vote.correctOption;
                const isUserChoice = option === vote.userChoice;
                
                return (
                  <div 
                    key={option} 
                    className={cn(
                      "flex flex-col items-center",
                      isCorrect ? "order-2" : option === "YES" ? "order-1" : "order-3",
                      isCorrect ? "mx-20" : "mx-[-24px]"
                    )}
                  >
                    {isUserChoice && (
                      <p className="text-gray-500 text-xs mb-1">Your choice</p>
                    )}
                    <div
                      className={cn(
                        "px-3 py-1 rounded-md border-2 border-[#E3B341] text-xs leading-none",
                        isUserChoice
                          ? "bg-[#E3B341] text-[#8B5E34]"
                          : "bg-transparent text-[#E3B341]"
                      )}
                    >
                      {option}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrow - show after options */}
          {index < voteHistory.length - 1 && (
            <div className="flex justify-center w-full py-1">
              <ChevronDown className="w-6 h-6 text-[#E3B341]" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default VoteHistoryPanel;
