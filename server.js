require("dotenv").config();
var express = require("express");
var session = require("express-session");
var path = require("path");

var passport = require("./config/passport");

var app = express();

var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(path.join(__dirname, "app/public/")));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
// Routes
require("./app/routes/html-routes.js")(app);
require("./app/routes/login-api-routes.js")(app);
require("./app/routes/bulls-api-routes.js")(app);
require("./app/routes/league-api-routes.js")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
