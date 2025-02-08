const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { hashHelper, vertify } = require("../passwordHelper/helper");
const record = require("../queryBuilder/record");
const user = require("../queryBuilder/user");
const food = require("../queryBuilder/food");
const app = express();
const PORT = process.env.PORT;
const origins = [
  "https://frontend-gd1y.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://localhost:3000",
];
//TODO: express session,!!!
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed origin"));
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
// app.use(session({}));
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "connected" }).status(200);
});
//return an array contains all foods
app.get("/api/foods", async (req, res) => {
  try {
    const foodList = await food.allFood();
    res.setHeader("Content-Type", "application/json");
    res.json(foodList).status(200);
  } catch (error) {
    res.status(404).send({ error: error, message: "Failed get all food" });
  }
});
//get food by id
app.get("/api/food/:id", async (req, res) => {
  const foodId = req.params.id;
  try {
    const foodInfo = await food.getFoodById(foodId);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(foodInfo);
  } catch (error) {
    res.status(404).send({ error: error, message: "Food not found" });
  }
});

//get all record of a certain user
app.get("/api/records/:userid", async (req, res) => {
  const id = req.params.userid;
  try {
    const allRecords = await record.allRecord(id);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(allRecords);
  } catch (error) {
    res.status(404).send({ error: error, message: "Record not found" });
  }
});

//get last record of a certain user
app.get("/api/last-record/:userid", async (req, res) => {
  const id = req.params.userid;
  try {
    const lastRecord = await record.lastRecord(id);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lastRecord);
  } catch (error) {
    res.status(404).send({ error: error, message: "Record not found" });
  }
});
//add new food and get new food's id
app.post("/api/new-food", async (req, res) => {
  const newFood = req.body;
  try {
    const foodInfo = await food.insertFood(
      newFood.foodName,
      newFood.description
    );
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(foodInfo);
  } catch (error) {
    res.status(403).send({ error: error, message: "Invalid food info" });
  }
});
//add new record and get this record's time, userid, and foodid
app.post("/api/record/:userid/:foodid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const foodId = req.params.foodid;
    const returnInfo = await record.newRecord(userId, foodId);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(returnInfo);
  } catch (error) {
    res.status(403).send({ error: error, message: "Invalid record" });
  }
});

app.post("/api/signup", async (req, res) => {
  const regInfo = req.body;
  try {
    const plainPassword = regInfo.password;
    const email = regInfo.email;
    const hashedPwd = await hashHelper(plainPassword);
    const userInfo = await user.newUser(regInfo.userName, hashedPwd, email);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(userInfo);
  } catch (error) {
    if (error.code === "23505" && error.constraint.includes("email")) {
      res.status(409).send({ error: error, message: "Email already exists" });
      return;
    }
    res.status(400).send({ error: error, message: "Invalid user info" });
  }
});

app.patch("/api/signin", async (req, res) => {
  const signInInfo = req.body;
  try {
    const originPassword = await user.getPasswod(signInInfo.email);
    if (!originPassword) {
      res.status(401).json({ message: "Invalid password or email" });
      return;
    }
    const compared = await vertify(
      signInInfo.password,
      originPassword.password_hashed
    );
    if (compared === true) {
      const userInfo = await user.recordSignIn(signInInfo.email);
      res.status(200).json(userInfo);
      return;
    }
    res.status(401).json({ message: "Invalid password or email" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error ocurred during sign in", error: error });
    return;
  }
});

app.listen(PORT, () => {
  console.log("listen to PORT:", PORT);
});
