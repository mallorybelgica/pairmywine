const router = require("express").Router();

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  getFoods,
  getGrapes,
  getGrape,
  getUserCellar,
  userSignUp,
  userLogin,
  deleteUser,
  editUserInfo,
  getPairing,
  getRecommendedGrapes,
  getUserCellarWine,
  deleteCellarWine,
  addNewCellarWine,
  updateCellarWine,
  getWineGroups,
} = require("./handlers");

router
  .get("/foods", getFoods)
  .get("/grapes", getGrapes)
  .get("/grape/:_id", getGrape)
  .get("/cellar/:email", getUserCellar)
  .get("/cellar/wine/:_id", getUserCellarWine)
  .post("/cellar/wine", upload.single("file"), addNewCellarWine)
  .patch("/cellar/wine/:_id", upload.single("file"), updateCellarWine)
  .delete("/cellar/wine/:_id", deleteCellarWine)
  .post("/user/signup", userSignUp)
  .post("/user/login", userLogin)
  .delete("/user/:email", deleteUser)
  .patch("/user/edit", editUserInfo)
  .post("/recommendation", getPairing)
  .post("/recommendation/grapes", getRecommendedGrapes)
  .get("/wines/groups", getWineGroups);

module.exports = router;
