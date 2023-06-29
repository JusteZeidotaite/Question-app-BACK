const uniqid = require("uniqid");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ response: "Bad data" });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      return res
        .status(200)
        .json({ response: "You logged in", jwt: token, userId: user.id });
    } else {
      return res.status(401).json({ response: "Bad data" });
    }
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};

module.exports.REGISTER = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
      name: req.body.name,
      password: hash,
      email: req.body.email,
      id: uniqid(),
      askedQuestionsIds: [],
    });

    await user.save();

    res.status(200).json({ response: "User was saved successfully" });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "User was not saved, please try later" });
  }
};