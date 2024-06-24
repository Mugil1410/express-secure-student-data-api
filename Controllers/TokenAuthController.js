const CreditCard = require("../Models/CreditCard");
const jwt = require("jsonwebtoken");

const GetToken = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.send("Email is invalid");
    return;
  }
  try {
    const token = jwt.sign({ email }, process.env.TOKEN_KEY, {expiresIn: "1h"});
    res.json({ Token: token, "Expries in": "60min" });
  } catch (error) {
    res.send(error.message);
  }
}

const getdata = async (req, res) => {
  try {
    const data = await CreditCard.find();
    if (data.length === 0) {
      res.status(404).send({ message: "No data found" });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { GetToken, getdata };
