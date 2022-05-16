const prisma = require("./db/db");
const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");

app.use(cors());
const jwt = require("jsonwebtoken");

app.use(express.json());

// const posts = [
//   {
//     username: "Kyle",
//     title: "Post 1",
//   },
//   {
//     username: "Jim",
//     title: "Post 2",
//   },
// ];

// const user_1 = {
//   username: "Hassan",
//   password: "Hassan",
//   userType: "Student",
// };
//addData(user_1)
// app.get("/posts", authenticateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.name));
// });

app.post("/login", async (req, res) => {
  try {
    // const req = JSON.parse(req);
    // console.log(request);
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    console.log("username: ", username, "  password: ", password);
    if (!username || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const userJson = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (!userJson) {
      res.status(400);
      throw new Error("Inavlid username");
    }

    if (
      userJson &&
      username != userJson.username &&
      password != userJson.password
    ) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    // JWT Tokenization
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACESS_TOKEN_SECRET);

    res.json({
      accessToken: accessToken,
      userType: userJson.userType,
      username: userJson.username.toUpperCase(),
    });
  } catch (err) {
    console.log(err);
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
app.listen(4000);
