// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const bcrypt = require("bcrypt");


const taskRoutes = require("./Router/taskRouter"); 
const user = require("./Router/User"); 

const app = express();


const { User } = require("./models");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my-super-secret-key-54862547158632541257",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "User",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const User = await User.findOne({
          where: { email },
        });

        if (!User) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, User.password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid password" }, User);
        } else {
          return done(null, User);
        }
      } catch (error) {
        return done(null, false, {
          message: "Account does not exists for this mail",
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, { id: user.id, type: user.constructor.name });
});

passport.deserializeUser((obj, done) => {
  console.log("Deserializing user:", obj);
  const { id, type } = obj;

  User.findByPk(id)
    .then((user) => {
      console.log("Deserialized User:", user);
      done(null, user);
    })
    .catch((err) => {
      console.error("Failed to deserialize User:", err);
      done(err);
    });
});



app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api", user); 


app.get("/", (req, res) => {
  res.send("Welcome to the To-Do App API");
});


module.exports = app;
