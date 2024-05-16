const express = require('express');
const userRoutes = require("./routes/userRoute")
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", userRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
