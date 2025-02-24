import React from 'react';
import MyButton from '../components/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to the Telegram Monetization Tool!</h1>
      <MyButton />
    </div>
  );
};

export default Home;
