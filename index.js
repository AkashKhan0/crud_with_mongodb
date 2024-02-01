const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

// connect with mongoDb database
mongoose
  .connect("mongodb://localhost:27017/crudoperation")
  .then(() => {
    console.log("connected to the MongoDB");
    app.listen(PORT, () => console.log("Server is running successfully"));
  })
  .catch((err) => console.log(err));

// data schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

// read data
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ message: true, data: data });
});

// create data
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({
    success: true,
    message: "Data saved successfully 🙂",
    data: data,
  });
});

// update data
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);
  const data = await userModel.updateOne({ _id: _id }, rest);
  res.send({
    success: true,
    message: "Data updated successfully",
    data: data,
  });
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({
    success: true,
    message: " Want to Delete your data! Are you sure?",
    data: data,
  });
});
