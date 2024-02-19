const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mfhtdapp:baIf7iycE1VIKL6F@cluster0.5gch7hc.mongodb.net/bank",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connect to mongo datbase");
  })
  .catch((e) => {
    console.log(e);
  });
