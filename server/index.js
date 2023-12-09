const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();
const PORT = 5000;
const URL =
  "mongodb+srv://kc_meradji:1234@cluster0.qsuip1a.mongodb.net/ChatShop";

app.use(express.json());
app.use(cors());
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To ChatShop server !!");
});

mongoose
  .connect(URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/shops", shopRoutes);
app.use("/products", productRoutes);
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
