const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
const userAuth = require("./routes/userAuth.js");
const listAuth = require("./routes/listAuth.js");

require("./config/dbConfig");
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());

app.use("/api/auth", userAuth);
app.use("/api/todo", listAuth)

app.listen(process.env.PORT, () => {
    console.log(`server is running on PORT ${process.env.PORT}`)
})