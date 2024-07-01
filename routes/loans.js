"use strict";

var data = require("../lib/data.js");

var loans = function (req, res) {
  try {
    var staff = data.getStaff(req.userId);

    if (!staff) {
      res.status(401).json({ error: "User missing" });
    }

    var { status } = req.query;
    var loans = [];

    if (status) {
      loans = data.getLoans(staff, status);
    } else {
      loans = data.getLoans(staff, status);
    }

    res.status(200).json({ loans: loans });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: "Fetching loans failed" });
  }
};

module.exports = loans;
