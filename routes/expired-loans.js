"use strict";

var data = require("../lib/data.js");

var expiredLoans = function (req, res) {
  try {
    var staff = data.getStaff(req.userId);

    if (!staff) {
      res.status(401).json({ error: "User missing" });
    }

    var loans = data.getExpiredLoans(staff);

    res.status(200).json({ loans: loans });
  } catch (error) {
    res.status(500).json({ error: "Fetching loans failed" });
  }
};

module.exports = expiredLoans;
