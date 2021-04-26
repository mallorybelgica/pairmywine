//User Login Actions
export const receiveUserInfo = (userDetails) => ({
  type: "RECEIVE_USER_INFO",
  userDetails,
});

export const userLoginError = (error) => ({
  type: "USER_LOGIN_ERROR",
  error,
});

export const userLogout = () => ({
  type: "USER_LOGOUT",
});

//Food List Actions
export const receiveFoods = (currentFoods) => ({
  type: "RECEIVE_FOODS",
  currentFoods,
});

export const receiveFoodsError = (error) => ({
  type: "RECEIVE_ERROR_FOODS",
  error,
});

//Grapes List Actions
export const receiveGrapes = (currentGrapes) => ({
  type: "RECEIVE_GRAPES",
  currentGrapes,
});

export const receiveGrapesError = (error) => ({
  type: "RECEIVE_ERROR_GRAPES",
  error,
});

//Grapes Groups Actions
export const receiveGroups = (currentGroups) => ({
  type: "RECEIVE_GROUPS",
  currentGroups,
});

export const receiveGroupsError = (error) => ({
  type: "RECEIVE_ERROR_GROUPS",
  error,
});

//Grape Details Actions
export const receiveGrapeDetails = (grapeDetails) => ({
  type: "RECEIVE_GRAPE_DETAILS",
  grapeDetails,
});

export const receiveGrapeDetailsError = (error) => ({
  type: "RECEIVE_ERROR_GRAPE_DETAILS",
  error,
});

//Wine Pairing Actions
export const receiveWinePairing = (recommendedWines) => ({
  type: "RECEIVE_WINE_PAIRING_RECOMMENDATION",
  recommendedWines,
});

export const receiveWinePairingError = (error) => ({
  type: "RECEIVE_WINE_PAIRING_ERROR",
  error,
});

//Wine Cellar Actions
export const receiveCellarDetails = (cellarDetails) => ({
  type: "RECEIVE_CELLAR_DETAILS",
  cellarDetails,
});

export const receiveCellarDetailsError = (error) => ({
  type: "RECEIVE_ERROR_CELLAR_DETAILS",
  error,
});

//Wine Cellar Details Actions
export const receiveWineDetails = (wineDetails) => ({
  type: "RECEIVE_WINE_DETAILS",
  wineDetails,
});

export const receiveWineDetailsError = (error) => ({
  type: "RECEIVE_ERROR_WINE_DETAILS",
  error,
});

//Rating Actions
export const receiveRating = (rating) => ({
  type: "RECEIVE_RATING",
  rating,
});

export const receiveRatingError = (error) => ({
  type: "RECEIVE_RATING_ERROR ",
  error,
});
