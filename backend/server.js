require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const multer = require("multer");
const upload = multer();

const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const items = require("./routes/api/items");
const posts = require("./routes/api/posts");
const comments = require("./routes/api/comments");

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error: "));

app.get("/docs", (req, res) => {
    res.send("Hello CSSPI");
});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(upload.any());

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/items", items);
app.use("/api/posts", posts);
app.use("/api/comments", comments);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}\nhttp://localhost:${port}`));