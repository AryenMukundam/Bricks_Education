import React, { useState } from 'react';
import TeamLeaderboard from '../components/LeaderBoard/TeamLeaderboard';
import MetaDataSidebar from '../components/LeaderBoard/MetaDataSidebar';
import SchoolCodeEntry from '../components/LeaderBoard/SchoolCodeEntry';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [schoolInfo, setSchoolInfo] = useState(null);

  const handleCodeSubmit = (code, schoolName) => {
    setSchoolInfo({ code, schoolName });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSchoolInfo(null);
  };

  // Show school code entry if not authenticated
  if (!isAuthenticated) {
    return <SchoolCodeEntry onCodeSubmit={handleCodeSubmit} />;
  }

  // Show leaderboard if authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Metadata */}
        <div className="w-1/3 min-w-[400px] bg-white/80 backdrop-blur-sm border-r border-gray-200/50">
          <MetaDataSidebar schoolInfo={schoolInfo} onLogout={handleLogout} />
        </div>
        
        {/* Right Content - Leaderboard */}
        <div className="flex-1 overflow-auto">
          <TeamLeaderboard schoolInfo={schoolInfo} />
        </div>
      </div>
    </div>
  );
};

export default Index;