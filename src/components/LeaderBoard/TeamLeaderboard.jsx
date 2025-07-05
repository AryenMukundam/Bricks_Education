
import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, Medal, Award, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import TeamCard from './TeamCard';

const TeamLeaderboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [expandedTeams, setExpandedTeams] = useState(new Set());

  // Sample team data
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Code Warriors',
      points: 2840,
      wins: 12,
      losses: 3,
      members: [
        { name: 'Alex Chen', role: 'Team Lead'},
        { name: 'Sarah Kim', role: 'Developer' },
        { name: 'Mike Johnson', role: 'Designer' },
        { name: 'Emma Davis', role: 'Tester' }
      ]
    },
    {
      id: 2,
      name: 'Innovation Squad',
      points: 2650,
      wins: 10,
      losses: 2,
      members: [
        { name: 'David Rodriguez', role: 'Team Lead' },
        { name: 'Lisa Wang', role: 'Developer' },
        { name: 'Ryan O\'Connor', role: 'Strategist'},
        { name: 'Maya Patel', role: 'Analyst'}
      ]
    },
    {
      id: 3,
      name: 'Tech Titans',
      points: 2580,
      wins: 11,
      losses: 4,
      members: [
        { name: 'James Wilson', role: 'Team Lead'},
        { name: 'Anna Thompson', role: 'Developer'},
        { name: 'Chris Taylor', role: 'Designer'},
        { name: 'Sophie Brown', role: 'Researcher'}
      ]
    },
    {
      id: 4,
      name: 'Digital Pioneers',
      points: 2420,
      wins: 9,
      losses: 3,
      members: [
        { name: 'Marcus Lee', role: 'Team Lead'},
        { name: 'Jessica Miller', role: 'Developer' },
        { name: 'Tom Anderson', role: 'Architect'},
        { name: 'Zoe Clark', role: 'QA Lead' }
      ]
    },
    {
      id: 5,
      name: 'Future Builders',
      points: 2380,
      wins: 8,
      losses: 4,
      members: [
        { name: 'Kevin Zhang', role: 'Team Lead' },
        { name: 'Rachel Green', role: 'Developer'},
        { name: 'Ben Carter', role: 'Designer' },
        { name: 'Amy Wong', role: 'Project Manager'}
      ]
    },
    
  ]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const sortedTeams = useMemo(() => {
    return [...teams].sort((a, b) => b.points - a.points);
  }, [teams]);

  const handleRefresh = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setTeams(prevTeams => 
        prevTeams.map(team => ({
          ...team,
          points: Math.max(0, team.points + Math.floor(Math.random() * 21) - 10)
        }))
      );
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const toggleTeam = (teamId) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId);
    } else {
      newExpanded.add(teamId);
    }
    setExpandedTeams(newExpanded);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="w-8 h-8 text-yellow-500 drop-shadow-lg" />;
      case 2: return <Medal className="w-8 h-8 text-gray-400 drop-shadow-lg" />;
      case 3: return <Award className="w-8 h-8 text-orange-500 drop-shadow-lg" />;
      default: return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-inner">
          <span className="text-sm font-bold text-orange-700">#{rank}</span>
        </div>
      );
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">Team Rankings</h1>
          <p className="text-gray-600">Live competition leaderboard</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className={`p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl ${
            isLoading ? 'animate-spin' : 'hover:scale-105'
          }`}
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      

      {/* Teams List */}
      <div className="space-y-4">
        {sortedTeams.map((team, index) => (
          <TeamCard
            key={team.id}
            team={team}
            rank={index + 1}
            isExpanded={expandedTeams.has(team.id)}
            onToggle={() => toggleTeam(team.id)}
            getRankIcon={getRankIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderboard;