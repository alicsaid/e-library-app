import React from "react";
import Navbar from "../../components/Navbar";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Welcome to e-Library</h1>
        <p className="text-lg mb-6 text-center">
          Manage your library’s catalog, track user activity, and handle book
          rentals with ease.
        </p>
      </div>
    </>
  );
};

export default HomePage;
