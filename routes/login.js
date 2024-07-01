"use strict";

var jwt = require("jsonwebtoken");
var config = require("../config");
var data = require("../lib/data");

var login = function (req, res) {
  try {
    var { email, password } = req.body;
    var staff = data.loginStaff(email, password);

    if (!staff) {
      res.status(401).json({ error: "Authentication failed" });
    }

    var token = jwt.sign({ userId: staff.id, role: staff.role }, config.secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = login;
