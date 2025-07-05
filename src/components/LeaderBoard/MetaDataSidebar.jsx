import React from "react";
import {
  Award,
  Calendar,
  MapPin,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";
import EventCard from "./EventCard";
import BricksLogo from "../../assets/Logo.png";
const MetadataSidebar = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Challenge",
      time: "10:00 AM",
      type: "Competition",
      description: "Solve complex algorithms in teams",
    },
    {
      id: 2,
      title: "UI/UX Workshop",
      time: "2:00 PM",
      type: "Workshop",
      description: "Learn modern design principles",
    },
    {
      id: 3,
      title: "Demo Day",
      time: "3:30 PM",
      type: "Presentation",
      description: "Present your team projects",
    },
  ];

  const stats = [
    {
      label: "Active Teams",
      value: "12",
      icon: Users,
      color: "text-orange-600",
    },
    {
      label: "Total Students",
      value: "48",
      icon: TrendingUp,
      color: "text-red-600",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-8 bg-gradient-to-br from-orange-600 via-orange-700 to-red-800 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-lg overflow-hidden">
            <img
              src={BricksLogo}
              alt="Bricks Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black">Bricks</h1>
            <p className="text-orange-100">Educational Platform</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-orange-200" />
            <span className="font-semibold">RadhaKrishna Public School</span>
          </div>
         
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 bg-white/50 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
        <div className="flex gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-white/60 rounded-xl flex-1"
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-bold text-gray-800">Upcoming Events</h3>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetadataSidebar;
