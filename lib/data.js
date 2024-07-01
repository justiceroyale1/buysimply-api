var fs = require("fs");
var path = require("path");

var lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, "/../data");

lib.create = function (file, data) {
  var path = lib.baseDir + "/" + file + ".json";

  // If file exists; write to it, else open a new file and
  // insert an empty array.
  if (fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify(data));
  } else {
    var fileDescriptor = fs.openSync(path, "w");
    var stringData = JSON.stringify(data);

    fs.writeFileSync(fileDescriptor, stringData);
  }
};

lib.read = function (file) {
  var path = lib.baseDir + "/" + file + ".json";

  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  }

  return [];
};

lib.loginStaff = function (email, password) {
  var staffs = lib.read("staffs");

  return staffs.find(
    (element) => element.email === email && element.password === password
  );
};

lib.getStaff = function (id) {
  var staffs = lib.read("staffs");

  return staffs.find((element) => element.id === id);
};

lib.getExpiredTokens = function () {
  return lib.read("expired-tokens");
};

lib.getExpiredToken = function (token) {
  var tokens = lib.getExpiredTokens();

  if (tokens.length == 0) {
    return undefined;
  }

  return tokens.find((element) => element.token === token);
};

lib.getLoans = function (staff, status = "") {
  var loans = lib.read("loans");

  if (status !== "") {
    loans = loans.filter((element) => element.status === status);
  }

  if (loans.length > 0) {
    switch (staff.role) {
      case "admin":
      case "superAdmin":
        return loans;

      default:
        return loans.map((element) => {
          var { totalLoan, ...rest } = element.applicant;

          element.applicant = rest;

          return element;
        });
    }
  }

  return [];
};

lib.getEmailLoans = function (staff, email) {
  var loans = lib.getLoans(staff);

  return loans.filter((element) => element.applicant.email === email);
};

lib.getExpiredLoans = function (staff, email) {
  var loans = lib.getLoans(staff);

  return loans.filter(
    (element) => Date.parse(new Date()) > Date.parse(element.maturityDate)
  );
};

lib.getDeleteLoan = function (staff, loanId) {
  var loans = lib.getLoans(staff);

  var loanIndex = loans.findIndex((element) => element.id === loanId);

  loans.splice(loanIndex, 1);

  lib.create("loans", loans);
};

// Export the module
module.exports = lib;
