
import React from 'react';
import { VoteHistory } from '@/types/drama';
import { cn } from '@/lib/utils';

interface VoteHistoryPanelProps {
  voteHistory: VoteHistory[];
  className?: string;
}

const VoteHistoryPanel: React.FC<VoteHistoryPanelProps> = ({
  voteHistory,
  className
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <h2 className="font-serif text-xl font-semibold mb-4">Your Decisions</h2>
      
      <div className="space-y-4 overflow-y-auto flex-1">
        {voteHistory.map((vote, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border-l-4 border-primary"
          >
            <h3 className="font-medium mb-2">{vote.question}</h3>
            <div className="flex flex-wrap gap-2">
              {vote.options.map(option => (
                <span
                  key={option}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full",
                    option === vote.userChoice
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 dark:bg-gray-700 text-muted-foreground"
                  )}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteHistoryPanel;
