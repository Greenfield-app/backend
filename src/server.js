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

// limit cors to the domains which are allowed to query endpoints.
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

app.get("/api", async (req, res) => {
  const psw = await hashHelper("password");
  console.log(psw);
  res.send({ message: "connected" }).status(200);
});

app.listen(PORT, () => {
  console.log("listen to PORT:", PORT);
});
