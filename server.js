const express = require("express");
const connectDb = require("./DB/db");
const app = express();

connectDb();
// init MiddleWare
app.use(express.json({ extended: false }));
app.use("/api/user", require("./Api/User"));
app.use("/api/profile", require("./Api/Profile"));
app.use("/api/post", require("./Api/Post"));
app.use("/api/auth", require("./Api/Auth"));

app.get("/", (req, res) => res.send("API Running"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started in port ${PORT}`));
