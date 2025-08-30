const LoadMore = ({ onClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="medium">
      <button onClick={onClick}>Load More</button>
    </div>
  );
};

export default LoadMore;
