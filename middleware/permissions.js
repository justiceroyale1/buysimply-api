function canDeleteLoan(req, res, next) {
  if (req.role === "superAdmin") {
    next();
  } else {
    res.status(403).json({ error: "You can not perform this operation!" });
  }
}

module.exports = canDeleteLoan;
