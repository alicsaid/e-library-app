// src/components/other/AccessDenied.tsx
import React from "react";

const AccessDenied = () => {
  const handleGoBack = () => {
    window.history.back(); // Vraća korisnika na prethodnu stranicu
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-xl">
          Sorry, but you do not have permission to access this page.
        </p>
        <button
          onClick={handleGoBack}
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
