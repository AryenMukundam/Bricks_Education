
import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Competition': return 'bg-red-100 text-red-700 border-red-200';
      case 'Workshop': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Presentation': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 hover:shadow-lg hover:bg-white/90 transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
          {event.title}
        </h4>
        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getEventTypeColor(event.type)}`}>
          {event.type}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500">
     
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;