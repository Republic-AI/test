import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import DragonBonesAnimation from './DragonBonesAnimation';

type Tag = {
  id: string;
  label: string;
  activeIconUrl: string;
  inactiveIconUrl: string;
};

// Mock data for initial development
const MOCK_TAGS: Tag[] = [
  { 
    id: 'ranch', 
    label: 'RANCH LOVE STORY',
    activeIconUrl: '/icons/ranch-active.png',
    inactiveIconUrl: '/icons/ranch-inactive.png'
  },
  { 
    id: 'idol', 
    label: 'URBAN IDOL LIFE',
    activeIconUrl: '/icons/idol-active.png',
    inactiveIconUrl: '/icons/idol-inactive.png'
  },
];

interface HeaderProps {
  onTagSelect: (tagId: string) => void;
  selectedTag: string;
  className?: string;
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTagSelect, selectedTag, className, onLogoClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tags] = useState<Tag[]>(MOCK_TAGS);
  const [key, setKey] = useState(0); // 添加 key 状态来强制重新渲染

  // 监听路由变化
  useEffect(() => {
    if (location.pathname === '/home') {
      // 当路由变为 /home 时，更新 key 以强制重新渲染动画
      setKey(prev => prev + 1);
    }
  }, [location.pathname]);

  const handleTagClick = (tagId: string) => {
    onTagSelect(tagId);
  };

  return (
    <header className={cn("bg-background border-b", className)}>
      <div className="w-full">
        {location.pathname === '/home' && (
          <>
            <div className="relative w-full h-[250px] overflow-hidden">
              <img
                src="/images/header-bg.png"
                alt="DraMai Header"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <img
                  src="/icons/live.png"
                  alt="Live"
                  className="h-6 w-auto animate-pulse"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
              <div className="absolute inset-0 flex flex-col items-center justify-center" key={key}>
                <DragonBonesAnimation
                  className="w-[800px] h-[00px] ml-[700px] mt-[-50px]"
                  skePath="/animations/painting/painting_ske.json"
                  texJsonPath="/animations/painting/painting_tex.json"
                  texPngPath="/animations/painting/painting_tex.png"
                  animationName="paint"
                />
                <DragonBonesAnimation
                  className="w-[-800px] h-[100px] ml-[900px] -mt-20"
                  skePath="/animations/pickflower/pickflower_ske.json"
                  texJsonPath="/animations/pickflower/pickflower_tex.json"
                  texPngPath="/animations/pickflower/pickflower_tex.png"
                  animationName="pickflower"
                />
              </div>
              <div className="absolute bottom-8 left-8">
                <img
                  src="/images/title.png"
                  alt="Live Stream AI Story"
                  className="h-[120px] w-auto"
                />
              </div>
            </div>
          </>
        )}
        <div className={cn(
          "flex items-end justify-between px-4 bg-background",
          location.pathname === '/' ? "-mt-5" : "mt-0"
        )}>
          <div className="flex gap-6">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag.id)}
                className={cn(
                  "transition-transform hover:scale-105 flex items-end",
                  selectedTag === tag.id ? "opacity-100" : "opacity-70 hover:opacity-90"
                )}
              >
                <img
                  src={selectedTag === tag.id ? tag.activeIconUrl : tag.inactiveIconUrl}
                  alt={tag.label}
                  className="w-56 h-20 object-contain"
                />
              </button>
            ))}
          </div>
          <div className="flex items-end">
            <img
              src="/icons/live-now.png"
              alt="Live Now"
              className="h-11 w-auto object-contain mb-5"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
