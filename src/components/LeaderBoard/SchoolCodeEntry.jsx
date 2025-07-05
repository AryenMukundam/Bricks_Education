import React, { useState } from 'react';
import { School, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import BricksLogo from '../../assets/Logo.png';

const SchoolCodeEntry = ({ onCodeSubmit }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  // Valid school codes (in real app, this would be validated against a backend)
  const validCodes = {
    'RKPS2024': 'RadhaKrishna Public School',
    'DEMO2024': 'Demo School',
    'TEST2024': 'Test Institution'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter your school code');
      return;
    }

    setIsLoading(true);
    setIsValidating(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const upperCode = code.toUpperCase();
      if (validCodes[upperCode]) {
        onCodeSubmit(upperCode, validCodes[upperCode]);
      } else {
        setError('Invalid school code. Please check and try again.');
        setIsLoading(false);
        setIsValidating(false);
      }
    }, 1500);
  };

  const formatCode = (value) => {
    // Remove non-alphanumeric characters and convert to uppercase
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    return cleaned.slice(0, 8); // Limit to 8 characters
  };

  const handleCodeChange = (e) => {
    const formatted = formatCode(e.target.value);
    setCode(formatted);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <img
              src={BricksLogo}
              alt="Bricks Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">Welcome to Bricks</h1>
          <p className="text-gray-600">Enter your school code to access the leaderboard</p>
        </div>

        {/* School Code Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <School className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">School Authentication</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="schoolCode" className="block text-sm font-semibold text-gray-700 mb-2">
                School Code
              </label>
              <div className="relative">
                <input
                  id="schoolCode"
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="Enter your school code"
                  className={`w-full px-4 py-4 text-lg font-mono tracking-wider text-center border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 ${
                    error 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                      : 'border-gray-200 focus:border-orange-500 focus:ring-orange-100 bg-white'
                  }`}
                  disabled={isLoading}
                />
                {isValidating && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {error && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !code.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                isLoading || !code.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl hover:scale-105'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Validating...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Access Leaderboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-blue-600 mt-0.5">
                <CheckCircle className="w-full h-full" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-blue-800 mb-1">Need help?</p>
                <p className="text-blue-700">
                  Contact your teacher or administrator for your school's unique access code.
                </p>
              </div>
            </div>
          </div>
        </div>       
      </div>
    </div>
  );
};

export default SchoolCodeEntry;