const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
process.env.TZ = "Asia/Dhaka";
console.log(process.env.TZ);

const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://secretDiary:JTsVK49C0gItLnhj@cluster0.lie6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("diary");
    const notesCollection = database.collection("notes");

    // notes get method
    app.get("/notes", async (req, res) => {
      const cursor = notesCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // notes post method
    app.post("/notes", async (req, res) => {
      const body = req.body;
      const result = await notesCollection.insertOne(body);
      console.log(result);
      res.send(result);
    });
  } finally {
    //   finally
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server added successfully!");
});

app.listen(port, () => {
  console.log("server is running on port:", port);
});
