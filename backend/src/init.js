// your db.js
const {User} = require("./models/db");

(async () => {

  const user = await User.create({
    firstName: " Test",
    lastName: "USer",
    email: "test@example.com",
    passwordHash: "hashed_pw"
  });

  console.log("User created:", user);
  process.exit();
})();