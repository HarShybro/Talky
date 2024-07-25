require("dotenv").config();
const express = require("express");
const Connect = require("./lib/connect");

Connect(process.env.MONGO_URL);

const UserRouter = require("./routes/userRouter");

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hello World");
});

app.use("/users", UserRouter);

app.listen(PORT, () => {
  console.log("Server started at", PORT);
});
