'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaYinYang, FaDumbbell, FaMedal, FaUserCircle } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('yogaJourney');
  const { theme } = useTheme();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  if (status === 'loading') return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const renderTabContent = () => {
    const baseClasses = "p-6 rounded-lg shadow-md";
    const bgClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
    
    switch (activeTab) {
      case 'yogaJourney':
        return (
          <div className={`${baseClasses} ${bgClass}`}>
            <h2 className="text-xl font-semibold mb-4">Your Yoga Journey</h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <h3 className="font-semibold">Current Level: Intermediate</h3>
                <p>You've completed 25 yoga sessions. Keep it up!</p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'}`}>
                <h3 className="font-semibold">Next Milestone</h3>
                <p>5 more sessions to reach Advanced level</p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <h3 className="font-semibold">Recommended Practice</h3>
                <p>Try a 30-minute Vinyasa flow to improve your flexibility</p>
              </div>
            </div>
          </div>
        );
      case 'performanceMetrics':
        return (
          <div className={`${baseClasses} ${bgClass}`}>
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                <h3 className="font-semibold">Strength Progress</h3>
                <p>+15% improvement in core strength</p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900' : 'bg-red-100'}`}>
                <h3 className="font-semibold">Flexibility Score</h3>
                <p>7/10 - Great progress in hip flexibility!</p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                <h3 className="font-semibold">Balance Assessment</h3>
                <p>8/10 - Excellent improvement in standing poses</p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-pink-900' : 'bg-pink-100'}`}>
                <h3 className="font-semibold">Breathing Technique</h3>
                <p>6/10 - Focus on ujjayi breathing in your next session</p>
              </div>
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className={`${baseClasses} ${bgClass}`}>
            <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg flex items-center ${theme === 'dark' ? 'bg-yellow-900' : 'bg-gold-100'}`}>
                <FaMedal className={`mr-4 text-3xl ${theme === 'dark' ? 'text-yellow-500' : 'text-gold-500'}`} />
                <div>
                  <h3 className="font-semibold">30-Day Streak Master</h3>
                  <p>Completed 30 consecutive days of practice</p>
                </div>
              </div>
              <div className={`p-4 rounded-lg flex items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-silver-100'}`}>
                <FaMedal className={`mr-4 text-3xl ${theme === 'dark' ? 'text-gray-400' : 'text-silver-500'}`} />
                <div>
                  <h3 className="font-semibold">Headstand Hero</h3>
                  <p>Mastered the headstand pose</p>
                </div>
              </div>
              <div className={`p-4 rounded-lg flex items-center ${theme === 'dark' ? 'bg-orange-900' : 'bg-bronze-100'}`}>
                <FaMedal className={`mr-4 text-3xl ${theme === 'dark' ? 'text-orange-500' : 'text-bronze-500'}`} />
                <div>
                  <h3 className="font-semibold">Mindfulness Mentor</h3>
                  <p>Completed 10 guided meditation sessions</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className={`${baseClasses} ${bgClass}`}>
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <div className="space-y-4">
              <p><strong>Name:</strong> {session?.user?.name}</p>
              <p><strong>Email:</strong> {session?.user?.email}</p>
              <p><strong>Preferred Practice:</strong> Vinyasa Flow</p>
              <p><strong>Goals:</strong> Improve flexibility, Reduce stress</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Edit Profile
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Your Wellness Journey, {session?.user?.name}</h1>
        <div className="flex flex-wrap mb-6">
          {['yogaJourney', 'performanceMetrics', 'achievements', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center mr-4 mb-2 px-4 py-2 rounded-lg ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : theme === 'dark' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-200 text-black'
              } transition-colors duration-200`}
            >
              {tab === 'yogaJourney' && <FaYinYang className="mr-2" />}
              {tab === 'performanceMetrics' && <FaDumbbell className="mr-2" />}
              {tab === 'achievements' && <FaMedal className="mr-2" />}
              {tab === 'profile' && <FaUserCircle className="mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
