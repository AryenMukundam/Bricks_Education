
import React from 'react';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';

const TeamCard = ({ team, rank, isExpanded, onToggle, getRankIcon }) => {
  const winRate = team.wins + team.losses > 0 ? (team.wins / (team.wins + team.losses) * 100).toFixed(1) : 0;

  const getTopThreeGradient = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-50 via-amber-100/50 to-yellow-50';
      case 2: return 'from-gray-50 via-gray-100/50 to-gray-50';
      case 3: return 'from-orange-50 via-orange-100/50 to-orange-50';
      default: return 'from-white to-orange-50/30';
    }
  };

  const getTopThreeBorder = (rank) => {
    switch (rank) {
      case 1: return 'border-yellow-200/60 shadow-yellow-100/30';
      case 2: return 'border-gray-200/60 shadow-gray-100/30';
      case 3: return 'border-orange-200/60 shadow-orange-100/30';
      default: return 'border-orange-200/40 shadow-orange-100/20';
    }
  };

  return (
    <div
      className={`rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        rank <= 3 
          ? `bg-gradient-to-r ${getTopThreeGradient(rank)} ${getTopThreeBorder(rank)} shadow-lg` 
          : 'bg-gradient-to-r from-white to-orange-50/30 border-orange-200/40 hover:shadow-orange-100/30'
      }`}
    >
      {/* Main Team Info */}
      <div className="flex items-center gap-6 p-6">
        {/* Rank */}
        <div className="flex items-center justify-center w-16 h-16">
          {getRankIcon(rank)}
        </div>
        
        {/* Team Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-800">{team.name}</h3>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-white/60 transition-colors duration-200 group"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {team.members.length} members
            </span>
          </div>
        </div>
        
        {/* Points */}
        <div className="text-right">
          <div className="text-3xl font-black text-gray-800 mb-1">
            {team.points.toLocaleString()}
          </div>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Points
          </div>
        </div>
      </div>

      {/* Expanded Team Members */}
      {isExpanded && (
        <div className="border-t border-gray-200/50 bg-white/40 backdrop-blur-sm">
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Members
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {team.members.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors duration-200"
                >
        
                  <div>
                    <div className="font-semibold text-gray-800">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCard;