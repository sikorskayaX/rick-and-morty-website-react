import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="character__go-back" onClick={handleGoBack}>
      <h3>GO BACK</h3>
    </div>
  );
};

export default GoBack;


