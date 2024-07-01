"use strict";

const routes = {};

routes.login = require("./login");

routes.logout = require("./logout");
routes.loans = require("./loans");
routes.emailLoans = require("./email-loans");
routes.expiredLoans = require("./expired-loans");
routes.deleteLoan = require("./delete-loan");

module.exports = routes;
