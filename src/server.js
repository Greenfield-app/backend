const express = require("express");
// const knex = require("./knex");
const cors = require("cors");
const { hashHelper, vertify } = require("../passwordHelper/helper");
const record = require("../queryBuilder/record");
const user = require("../queryBuilder/user");

const app = express();
const PORT = process.env.PORT;
const origins = [
  "https://frontend-gd1y.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://localhost:3000",
];
//TODO: express session,
const TIMESTAMP = "1738739879000";
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
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "connected" }).status(200);
});

app.get("/api/foods", async (req, res) => {
  const foodList = [
    [
      { id: 1, foodname: "ramen", description: "Ramen near me" },
      { id: 2, foodname: "yakiniku", description: "Yakiniku in Sinjuku" },
      { id: 3, foodname: "italian", description: "Highly recommended by ..." },
    ],
  ];
  res.setHeader("Content-Type", "application/json");
  res.json(foodList).status(200);
});

app.get("/api/users", async (req, res) => {
  const userList = [
    { id: 1, userName: "Anne" },
    { id: 2, userName: "Sum" },
  ];
  res.setHeader("Content-Type", "application/json");
  res.json(userList).status(200);
});

app.get("/api/user/:id", async (req, res) => {
  const user = { id: 1, userName: "Anne" };
  res.setHeader("Content-Type", "application/json");

  res.json(user).status(200);
});

app.get("/api/food/:id", async (req, res) => {
  const id = req.params.id;
  //query
  const food = { id: 1, foodName: "ramen", description: "Ramen near me" };
  res.setHeader("Content-Type", "application/json");
  res.json(food).status(200);
});

app.post("/api/new-food", async (req, res) => {
  const newFood = req.body;
  const foodInfo = {
    id: 5,
    foodName: newFood.name,
    description: newFood.description,
  };
  //TODO: insert into db
  res.setHeader("Content-Type", "application/json");
  res.json(foodInfo).status(204);
});

app.patch("/api/change/description", async (req, res) => {
  const newChange = res.body;
  const changeFoodInfo = {
    id: newChange.id,
    description: newChange.description,
  };
  const returnInfo = {};
  res.send(returnInfo).status(204);
});

//TODO
app.patch("/api/change/food-name", async (req, res) => {
  const newChange = res.body;
  const changeFoodInfo = {
    id: newChange.id,
    foodName: newChange.foodName,
  };
  const returnInfo = {};
  res.send(returnInfo).status(204);
});
//TODO
app.patch("/api/change/user-name", async (req, res) => {
  const newChange = res.body;
  const changeFoodInfo = {
    id: newChange.id,
    userName: newChange.userName,
  };
  const returnInfo = {};
  res.send(returnInfo).status(204);
});
//TODO
app.post("/api/record/:userid/:foodid", async (req, res) => {
  const userId = req.params.userid;
  const foodId = req.params.foodid;
  //query insert into record
  const returnInfo = await record.newRecord(userId, foodId);
  console.log(returnInfo);
  res.setHeader("Content-Type", "application/json");

  res.json(returnInfo).status(200);
});

app.post("/api/signup", async (req, res) => {
  const regInfo = req.body;
  try {
    const plainPassword = regInfo.password;
    const hashedPwd = await hashHelper(plainPassword);
    console.log(hashedPwd);
    const userInfo = await user.newUser(regInfo.userName, hashedPwd);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(403).send({ error: error, message: "Invalid user info" });
  }
});

app.patch("/api/signin", async (req, res) => {
  const signInInfo = req.body;
  try {
    const originPassword = await user.getPasswod(signInInfo.userId);
    const compared = await vertify(
      signInInfo.password,
      originPassword.password_hashed
    );
    if (compared === true) {
      console.log("RESULT", compared); //work
      const userInfo = await user.recordSignIn(signInInfo.userId);
      res.status(200).json(userInfo);
      return;
    } else {
      res.status(401).json({
        message: "Incorrect Password or ID",
      });
    }
  } catch (error) {
    res.status(401).json({ message: "SignIn Failed", error: erro.message });
  }
});

app.listen(PORT, () => {
  console.log("listen to PORT:", PORT);
});
