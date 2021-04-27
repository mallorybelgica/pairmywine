import React from "react";

const FoodInputOptions = ({ foods }) => {
  return (
    <>
      {Object.entries(foods)
        .filter((food) => food[1].family !== "Preparation")
        .map((food) => {
          return (
            <option key={food[0]} value={food[0]} id={food[0]}>
              {food[1].type}
            </option>
          );
        })}
    </>
  );
};

export default FoodInputOptions;
