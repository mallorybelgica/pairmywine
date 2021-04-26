"use strict";
const { MongoClient } = require("mongodb");
const assert = require("assert");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ObjectId = require("mongodb").ObjectID;

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const getFoods = async (req, res) => {
  try {
    const dbName = "pairmywine_app";
    await client.connect();
    const db = client.db(dbName);
    console.log("connected");
    const foodCollection = await db.collection("foods").find().toArray();

    const foods = {};

    foodCollection.map((food) => {
      foods[food._id] = {
        type: food.type,
        family: food.family,
        perfectPairing: food.perfectPairing,
        pairing: food.pairing,
      };
    });
    res.status(200).json({ status: 200, foods: foods });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getGrapes = async (req, res) => {
  try {
    const dbName = "pairmywine_app";
    await client.connect();
    const db = client.db(dbName);
    console.log("connected");
    const grapesCollection = await db.collection("grapes").find().toArray();

    const grapes = {};

    grapesCollection.map((grape) => {
      grapes[grape._id] = {
        groupId: grape.groupId,
        name: grape.name,
        flavors: grape.flavors,
        description: grape.description,
        regions: grape.regions,
        sweetness: grape.sweetness,
        body: grape.body,
        tannins: grape.tannins,
        acidity: grape.acidity,
      };
    });

    res.status(200).json({ status: 200, grapes: grapes });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getGrape = async (req, res) => {
  const dbName = "pairmywine_app";
  const _id = req.params._id.toUpperCase();
  await client.connect();
  const db = client.db(dbName);
  console.log("connected");

  db.collection("grapes").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res
          .status(404)
          .json({ status: 404, _id, message: "Food does not exist." });
  });
};

const getRecommendedGrapes = async (req, res) => {
  try {
    const dbName = "pairmywine_app";
    const { singleGrapes } = req.body;
    await client.connect();
    const db = client.db(dbName);
    console.log("connected");

    const grapes = await db
      .collection("grapes")
      .find({
        _id: {
          $in: singleGrapes,
        },
      })
      .toArray();

    res.status(200).json({ status: 200, data: grapes });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, data: "Recommended grapes not available." });
  }
};

const getUserCellar = async (req, res) => {
  try {
    const dbName = "pairmywine_app";
    const email = req.params.email;

    await client.connect();

    const db = client.db(dbName);
    console.log("connected");

    const userCellar = await db
      .collection("userWines")
      .find({ email })
      .toArray();

    res.status(200).json({
      status: 200,
      data: userCellar,
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, _id, data: "Recommendation not available." });
  }
};

const getUserCellarWine = async (req, res) => {
  const dbName = "pairmywine_app";
  const _id = req.params._id;

  await client.connect();

  const db = client.db(dbName);
  console.log("connected");

  await db.collection("userWines").find().toArray();

  db.collection("userWines").findOne({ _id: ObjectId(_id) }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res
          .status(404)
          .json({ status: 404, _id, message: "Wine is not available." });
  });
};

const addNewCellarWine = async (req, res) => {
  try {
    const dbName = "pairmywine_app";

    const file = req.file;
    const wineData = req.body;

    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;
    const imageLink = s3FileURL + `/${file.originalname}`;

    const s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: "file.mimetype",
      ACL: "public-read",
    };

    s3bucket.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log({ data });
    });

    wineData.image = s3FileURL + `/${file.originalname}`;

    await client.connect();

    const db = client.db(dbName);
    console.log("connected");

    db.collection("userWines").insertOne(wineData);
    res.status(201).json({ status: 201, message: "Wine successfully added" });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const deleteCellarWine = async (req, res) => {
  try {
    const dbName = "pairmywine_app";
    const _id = req.params._id;

    await client.connect();

    const db = client.db(dbName);
    console.log("connected");

    const result = await db
      .collection("userWines")
      .deleteOne({ _id: ObjectId(_id) });
    assert.equal(1, result.deletedCount);

    res.status(201).json({ status: 204, message: "Wine successfully deleted" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const updateCellarWine = async (req, res) => {
  try {
    const dbName = "pairmywine_app";
    const _id = req.params._id;
    const file = req.file;
    const wineData = req.body;
    const newValues = { $set: req.body };

    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;
    const imageLink = s3FileURL + `/${file.originalname}`;

    const s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: "file.mimetype",
      ACL: "public-read",
    };

    s3bucket.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log({ data });
    });

    wineData.image = s3FileURL + `/${file.originalname}`;

    await client.connect();
    const db = client.db(dbName);
    console.log("connected");

    const results = await db
      .collection("userWines")
      .updateOne({ _id: ObjectId(_id) }, newValues);
    assert.equal(1, results.matchedCount);
    assert.equal(1, results.modifiedCount);

    res.status(204).json({ status: 204, message: results });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getPairing = async (req, res) => {
  const dbName = "pairmywine_app";

  const { firstOption, secondOption, thirdOption, fourthOption } = req.body;

  const options = Object.values(req.body).map((item) => item);

  await client.connect();
  const db = client.db(dbName);
  console.log("connected");

  const foods = await db
    .collection("foods")
    .find({
      _id: {
        $in: options,
      },
    })
    .toArray();

  const perfectPairs = foods.map((food) => food.perfectPairing);

  const recommendation = perfectPairs.reduce((previous, current) =>
    previous.filter((grape) => current.includes(grape))
  );

  if (recommendation.length > 0) {
    res.status(200).json({ status: 200, data: recommendation });
  } else {
    const pairings = foods.flatMap((food) => food.pairing);

    const count = {};

    await pairings.forEach((grape) =>
      count[grape] ? count[grape]++ : (count[grape] = 1)
    );

    const groupPairings = await Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .filter((curr, index, arr) => curr[1] === arr[0][1])
      .map((curr) => curr[0]);

    const wineGroups = await db
      .collection("wineGroups")
      .find({
        _id: {
          $in: groupPairings,
        },
      })
      .toArray();

    const randomWines = Object.values(wineGroups).map((wineGroup) => {
      return wineGroup.typeId[
        Math.floor(Math.random() * wineGroup.typeId.length)
      ];
    });

    res.status(200).json({
      status: 200,
      data: { wineGroups: wineGroups, wines: randomWines },
    });
  }
};

const userSignUp = async (req, res) => {
  const dbName = "pairmywine_app";
  const { firstName, lastName, birthDate, email, password } = req.body;

  const securePwd = bcrypt.hashSync(password, 10);

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    birthDate: birthDate,
    email: email,
    pwd: securePwd,
  };

  await client.connect();

  const db = client.db(dbName);
  console.log("connected");

  db.collection("users").findOne({ email }, (err, result) => {
    if (result) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "User already exists.",
      });
    } else if (!firstName || !lastName || !birthDate || !email || !password) {
      res.status(400).json({
        status: 400,
        data: result,
        message:
          "Missing information! Please fill out all fields before submitting.",
      });
    } else {
      db.collection("users").insertOne(newUser);
      res.status(201).json({ status: 201, data: newUser });
    }
  });
};

const userLogin = async (req, res) => {
  const dbName = "pairmywine_app";

  const { email, password } = req.body;

  await client.connect();

  const db = client.db(dbName);
  console.log("connected");

  await db.collection("users").findOne({ email }, (err, result) => {
    if (!result) {
      res.status(401).json({
        status: 401,
        message: "Email or password does not match our records.",
      });
    } else if (bcrypt.compareSync(password, result.pwd)) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(401).json({
        status: 401,
        message: "Email or password does not match our records.",
      });
    }
  });
};

const editUserInfo = async (req, res) => {
  try {
    const dbName = "pairmywine_app";
    const {
      firstName,
      lastName,
      birthDate,
      email,
      password,
      currentEmail,
    } = req.body;
    const securePwd = bcrypt.hashSync(password, 10);

    const newValues = {
      $set: {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        email: email,
        pwd: securePwd,
      },
    };

    const newEmail = { $set: { email: email } };

    await client.connect();

    const db = client.db(dbName);
    console.log("connected");

    const results = await db
      .collection("users")
      .updateOne({ email: currentEmail }, newValues);
    assert.equal(1, results.matchedCount);
    assert.equal(1, results.modifiedCount);

    const wineResults = await db
      .collection("userWines")
      .updateOne({ email: currentEmail }, newEmail);
    assert.equal(1, results.matchedCount);
    assert.equal(1, results.modifiedCount);

    await db.collection("users").findOne({ email }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, email, data: result })
        : res
            .status(404)
            .json({ status: 404, email, data: "User does not exist." });
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const dbName = "pairmywine_app";
    const email = req.params.email;

    await client.connect();

    const db = client.db(dbName);
    console.log("connected");

    const result = await db.collection("users").deleteOne({ email });
    assert.equal(1, result.deletedCount);

    res.status(201).json({ status: 204, message: "User successfully deleted" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getWineGroups = async (req, res) => {
  const dbName = "pairmywine_app";
  await client.connect();
  const db = client.db(dbName);
  console.log("connected");
  const wineGroups = await db.collection("wineGroups").find().toArray();
  res.status(200).json({ status: 200, data: wineGroups });
};

module.exports = {
  getFoods,
  getGrapes,
  getGrape,
  getUserCellar,
  getUserCellarWine,
  addNewCellarWine,
  userSignUp,
  userLogin,
  editUserInfo,
  deleteUser,
  getPairing,
  getRecommendedGrapes,
  deleteCellarWine,
  updateCellarWine,
  getWineGroups,
};
