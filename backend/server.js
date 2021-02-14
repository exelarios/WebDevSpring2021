const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const items = require("./routes/api/items");
require("dotenv").config();

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error: "));

app.get("/docs", (req, res) => {
    res.send("Hello CSSPI");
});

app.use(bodyParser.json()); // Required in order to read  incoming request bodies in a middleware.
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/items", items);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}\nhttp://localhost:${port}`));