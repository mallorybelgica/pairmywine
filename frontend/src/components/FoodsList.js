import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveFoods, receiveFoodsError } from "../actions";
import Loading from "./Loading";

const FoodsList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.foodsListReducer.status);
  const currentFoods = useSelector((state) => ({
    ...state.foodsListReducer.currentFoods,
  }));

  useEffect(() => {
    fetch("/foods")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveFoods(json.foods));
      })
      .catch((error) => {
        dispatch(receiveFoodsError(error));
      });
  }, []);

  if (status === "loading") {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <ul>
      {currentFoods &&
        Object.values(currentFoods).map((food) => {
          return (
            <li key={food.type} id={food._id}>
              {food.type}
            </li>
          );
        })}
    </ul>
  );
};

export default FoodsList;
