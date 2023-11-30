import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());

const CONNECTIONURL =
  "mongodb+srv://nikhileswarreddypochimireddy:344GXwHaFI76Qxx3@cluster0.wk0co8o.mongodb.net/MemoriesDB";

mongoose
  .connect(CONNECTIONURL, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Success");
  })
  .catch((error) => console.log(error.message, "error"));

const PostSchema = mongoose.Schema({
  title: String,
  description: String,
});

const Memories = new mongoose.model("Memories", PostSchema);

app.post("/addPost", (req, res) => {
  const { title, description } = req.body;
  const new_post = new Memories({
    title,
    description,
  });
  new_post.save().then(
    Memories.find({}).then(function (list) {
      res.status(200).send(list);
    })
  );
});
app.get("/getPosts", (req, res) => {
  Memories.find({}).then(function (list) {
    res.status(200).send(list);
  });
});
app.post("/delete", (req, res) => {
  const { id } = req.body;
  Memories.deleteOne({ _id: id }).then(
    Memories.find({}).then(function (list) {
      res.status(200).send(list);
    })
  );
});

app.listen(5000, () => {
  console.log("Backend at Port 5000");
});
