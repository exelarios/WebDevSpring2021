const express = require("express");
const mongoose = require("mongoose");
const app = express();

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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}\nhttp://localhost:${port}`));