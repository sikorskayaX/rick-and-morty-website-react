import React from 'react';

const LoadMore = ({ onClick, isVisible }) => {
    if (!isVisible) return null;
  
    return (
      <div className="medium">
        <button className='medium__button' onClick={onClick}>Load More</button>
      </div>
    );
  };

export default LoadMore;