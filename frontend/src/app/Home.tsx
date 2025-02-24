/**
 * Home Component
 * The main landing page component of the application
 * Displays a welcome message and demonstrates component usage
 */

import React from 'react';
import MyButton from '../components/Button';

/**
 * Home Page Component
 * Features:
 * - Centered layout with flex container
 * - Welcome message with custom styling
 * - Integration of the MyButton component
 * 
 * Styling:
 * - Uses Tailwind CSS for responsive design
 * - Full screen height with centered content
 * - Light gray background
 * - Flex column layout with gap spacing
 */
const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to the Telegram Monetization Tool!
      </h1>
      <MyButton />
    </div>
  );
};

export default Home;
