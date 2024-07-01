"use strict";

var express = require("express");
var config = require("./config");
var routes = require("./routes");
const verifyToken = require('./middleware/auth');
const canDeleteLoan = require('./middleware/permissions');

var app = (module.exports = express());
var port = config.port;

// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.urlencoded({extended: false}));
app.delete("/loans/:loanId/delete", [verifyToken, canDeleteLoan], (req, res) => routes.deleteLoan(req, res));
app.get("/loans/expired", verifyToken, (req, res) => routes.expiredLoans(req, res));
app.get("/loans/:userEmail/get", verifyToken, (req, res) => routes.emailLoans(req, res));
app.get("/loans", verifyToken, (req, res) => routes.loans(req, res));
app.post("/logout", verifyToken, (req, res) => routes.logout(req, res));
app.post("/login", (req, res) => routes.login(req, res));
app.get("/", function (req, res) {
  res.send("Welcome to the api root");
});

app.listen(port);
console.log("Server started on port: " + port);
