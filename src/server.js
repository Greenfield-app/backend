const express = require("express");
const knex = require("./knex");
const cors = require("cors");
const { hashHelper, vertify } = require("../passwordHelper/helper");
const app = express();
const PORT = process.env.PORT;
const origins = [
  "https://frontend-gd1y.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://localhost:3000",
];
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
  const recordDate = Date.now();
  const newRecord = { userId, foodId, recordDate };
  //query insert into record

  res.setHeader("Content-Type", "application/json");
  const recordInfo = {
    userId: userId,
    foodId: foodId,
    description: "Good",
    recordDate: TIMESTAMP,
  };
  res.json(recordInfo).status(204);
});

app.post("/api/signup", async (req, res) => {
  const regInfo = req.body;
  try {
    const plainPassword = regInfo.password;
    const hashedPwd = await hashHelper(plainPassword);
    const userInfo = {
      userName: regInfo.userName,
      creationDate: Date.now(),
      hashed: hashedPwd,
    };
    //TODO:await insert to knex, DB not finished
    const returnInfo = {
      id: 4,
      userName: userInfo.userName,
    };
    res.setHeader("Content-Type", "application/json");
    res.json(returnInfo).status(204);
  } catch (error) {
    res.send({ error: error, message: "Invalid user info" }).status(403);
  }
});

app.post("/api/signin", async (req, res) => {
  const signInInfo = req.body;
  //userName, password, id
  //query userId's hash in Knex
  const exampleHash =
    "$2a$10$DPdNcdn5C63Yyk1GgCU.iOSi5.jmutn2xx3oDEheohcRtP5Lbbwje";
  const compared = await vertify(signInInfo.password, exampleHash);
  if (compared === true) {
    const returnInfo = {
      id: 4,
      userName: "Anna",
    };
    res.json(returnInfo).status(204);
  } else {
    res.status(401).send({ message: "SignIN Failed" });
  }
  console.log(compared);
});

app.listen(PORT, () => {
  console.log("listen to PORT:", PORT);
});
