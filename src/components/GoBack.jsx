import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from './svg/ArrowLeft';

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="character__go-back" onClick={handleGoBack}>
      <ArrowLeft/>
      <h3>GO BACK</h3>
    </div>
  );
};

export default GoBack;


