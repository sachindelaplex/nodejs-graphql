const bcrypt = require("bcryptjs");
const User = require("../../Models/user");
const jwt = require("jsonwebtoken");
module.exports = {
  users: async () => {
    const users = User.find();
    try {
      return users.map(user => {
        return { ...user._doc };
      });
    } catch (err) {
      throw err;
    }
  },

  createUser: async args => {
    console.log(args)
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User is already exists.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();
      result.password = null;
      return { ...result._doc };
    } catch (err) {
      console.log("errr")
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      "123456789",
      { expiresIn: "1h" }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  }
};
