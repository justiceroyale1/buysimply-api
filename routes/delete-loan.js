"use strict";

var data = require("../lib/data.js");

var deleteLoan = function (req, res) {
  try {
    var staff = data.getStaff(req.userId);

    if (!staff) {
      res.status(401).json({ error: "User missing" });
    }

    var { loanId } = req.params;

    if (loanId) {
      data.getDeleteLoan(staff, loanId);
      res.status(200).json({ message: "Loan deleted!" });
    }
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: `Deleting loan with id ${loanId} failed` });
  }
};

module.exports = deleteLoan;
