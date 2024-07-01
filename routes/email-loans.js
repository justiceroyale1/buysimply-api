"use strict";

var data = require("../lib/data.js");

var emailLoans = function (req, res) {
  try {
    var staff = data.getStaff(req.userId);

    if (!staff) {
      res.status(401).json({ error: "User missing" });
    }

    var { userEmail } = req.params;
    var loans = [];

    if (userEmail) {
      loans = data.getEmailLoans(staff, userEmail);
      res.status(200).json({ loans: loans });
    }
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: "Fetching loans failed" });
  }
};

module.exports = emailLoans;
