// src/components/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you're looking for does not exist."
        extra={
          <Button type="primary" size="large" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        }
        style={{ padding: '20px' }}
      />
    </div>
  );
};

export default NotFound;
