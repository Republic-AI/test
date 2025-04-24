import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Search, Loader2 } from 'lucide-react';

interface UserInfo {
  userId: string;
  points: number;
  avatar: string;
}

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // auto guest-login on mount
  useEffect(() => {
    async function fetchGuest() {
      try {
        const res = await fetch('/api/guest-login');
        if (!res.ok) throw new Error('Guest login failed');
        const data: UserInfo = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGuest();
  }, []);

  return (
    <aside
      className={cn(
        "w-[260px] hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border p-4",
        className
      )}
    >
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="font-serif font-bold text-2xl 
                        bg-gradient-to-r 
                        from-drama-pink via-drama-lavender to-drama-blue 
                        bg-clip-text text-transparent">
          DraMai
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors">
          <Home size={20} className="text-primary" />
          <span className="font-medium">Discover Stories</span>
        </button>
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
          <Search size={20} />
          <span>Search</span>
        </button>
      </nav>

      {/* User Info / Guest-Login */}
      <div className="mt-auto">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin" />
          </div>
        ) : userInfo ? (
          <div className="bg-sidebar-accent rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-drama-lavender overflow-hidden">
                <img
                  src={userInfo.avatar}
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{userInfo.userId}</div>
                <div className="text-sm text-muted-foreground">
                  {userInfo.points} points
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="w-full p-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            onClick={() => window.location.href = '/login'}
          >
            Sign In
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;