const router = require("express").Router();
const User = require("../models/User");

// creating user
router.post("/", async (req, res) => {
  try {
    const { name, email, password, picture } = req.body; //request those details from the user
    console.log(req.body);
    const user = await User.create({ name, email, password, picture }); //take them and create new yser
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if (e.code == 11000) {
      msg = "User already exists";
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg);
  }
});

// login user

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

//edit account settings
router.put("/settings", async (req, res) => {
  try {
    const { userId, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.picture = req.body.picture || user.picture;

    // todo: validate old password with bcrypt

    if (newPassword) {
      user.password = newPassword;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      picture: updatedUser.picture,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
});

module.exports = router;
