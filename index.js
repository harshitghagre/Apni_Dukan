import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import bodyParser from "body-parser";
// import path from "path";
import {
  customerLogin,
  customerSignup,
  getAllShopkeeper,
  getCustomer,
  login,
  signup,
} from "./controls/Controls.js";

const app = express();
app.use(express.json());
app.use(cors());

const mongo = "mongodb://127.0.0.1:27017/AAA";
const atlas =
  "mongodb+srv://harshalhonde17:harshal%40123@cluster0.b0mwyen.mongodb.net/Blogs?retryWrites=true&w=majority";
mongoose
  .connect(atlas)
  .then(() => app.listen(5500))
  .then(() => console.log("connected database at 5500"))
  .catch((error) => console.log(`${error}is error`));

  const carouselItemSchema = new mongoose.Schema({
    schemeName: String,
    startDate: String,
    endDate: String,
  });
  
  const CarouselItem = mongoose.model("CarouselItem", carouselItemSchema);


  app.get("/api/carousel", async (req, res) => {
    try {
      const carouselItems = await CarouselItem.find();
      res.json(carouselItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
  app.post("/api/carousel", async (req, res) => {
    try {
      const { schemeName, startDate, endDate } = req.body;
      const newCarouselItem = new CarouselItem({ schemeName, startDate, endDate });
      await newCarouselItem.save();
      res.status(201).json(newCarouselItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
  app.delete("/api/carousel/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await CarouselItem.findByIdAndDelete(id);
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  });



app.get("/", getAllShopkeeper);
app.post("/signup", signup);
app.post("/login", login);
app.post("/cussignup", customerSignup);
app.post("/cuslogin", customerLogin);
app.get("/getcus", getCustomer);
