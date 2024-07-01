"use strict";

const data = require("../lib/data");

const logout = function (req, res) {
  try {
    const token = req.header("Authorization");

    if (token) {
      var expiredToken = data.getExpiredToken(token);

      if (!expiredToken) {
        var expiredTokens = data.getExpiredTokens();
        
        expiredTokens.push({
          token: token,
        });
        
        data.create("expired-tokens", expiredTokens);
      }
    }

    res.status(200).json({ message: "Logged out!" });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = logout;
