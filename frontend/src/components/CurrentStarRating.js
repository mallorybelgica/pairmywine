import React from "react";

const CurrentStar = ({ marked, starId }) => {
  return (
    <span data-star-id={starId} className="star" role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

const CurrentStarRating = ({ wineRating }) => {
  return (
    <div>
      {Array.from({ length: 5 }, (v, i) => (
        <CurrentStar
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={wineRating ? wineRating >= i + 1 : wineRating >= i + 1}
        />
      ))}
    </div>
  );
};

export default CurrentStarRating;
