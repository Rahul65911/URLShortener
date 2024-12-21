const express = require("express");
const path = require("path");

const { connect } = require("./connection");

const router = require("./routes/url");
const staticRouter = require("./routes/staticRoute");

connect("mongodb+srv://student:student@cluster0.bgpax.mongodb.net/shortURL?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(`Error while connecting ${err}`));

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded());

app.use("/", staticRouter);
app.use("/url", router);

app.listen(PORT, () => console.log("Server Started!!!"));