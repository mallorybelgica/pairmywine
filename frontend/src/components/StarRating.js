import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveRating } from "../actions";

const Star = ({ marked, starId }) => {
  return (
    <span data-star-id={starId} className="star" role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

const StarRating = ({ value }) => {
  const dispatch = useDispatch();
  const rating = useSelector((state) => ({
    ...state.starRatingReducer.rating,
  }));
  const [selection, setSelection] = useState(value);

  const hoverOver = (event) => {
    let val = 0;
    if (event && event.target && event.target.getAttribute("data-star-id"))
      val = event.target.getAttribute("data-star-id");
    setSelection(val);
  };
  return (
    <div
      onClick={(e) =>
        dispatch(receiveRating(e.target.getAttribute("data-star-id")))
      }
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
};

export default StarRating;
