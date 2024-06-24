const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (req.body.email === decoded.email) {

      req.session.tokenLife = req.session.tokenLife || { email: req.body.email,uses: 0 }
      req.session.tokenLife.uses += 1;

      if (req.session.tokenLife.uses <= 3) {
        next()
      } else {
        res.status(401).json({ error: "Token exceeded maximum usage" });
      }
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
