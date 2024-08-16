const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
let corsOption = {
  origin: "https://olxclonee.vercel.app",
  methods: "GET,POST,PATCH,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOption));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/users"));
app.use("/api/items", require("./routes/items"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
