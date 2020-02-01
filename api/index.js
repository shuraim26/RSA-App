const express = require("express");
const NodeRSA = require("node-rsa");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

require("./models/Key");

const Key = mongoose.model("keys");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://test:test12345@cluster0-q5hsg.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("Error in connecting with DB"));

const port = 8000;

app.get("/", (req, res) => res.send("test"));

app.post("/add-key", (req, res) => {
  merchantId = req.body.merchantId;
  key = req.body.key;

  const newKey = {
    merchantId,
    key
  };

  new Key(newKey).save().then(key => console.log(key));

  res.json({ status: "Added key", merchantId: merchantId, key: key });
});

app.post("/encrypt", (req, res) => {
  merchantId = req.body.merchantId;
  string = req.body.string;

  Key.findOne({ merchantId }).then(key => {
    if (!key) res.json({ error: "Key doesn't exist for this merchant ID" });
    else {
      const Key = new NodeRSA(key.key);

      const encrypted = Key.encrypt(string, "base64");
      res.json({ encryptedString: encrypted });
    }
  });
});

app.post("/decrypt", (req, res) => {
  merchantId = req.body.merchantId;
  string = req.body.string;

  Key.findOne({ merchantId }).then(key => {
    if (!key) res.json({ error: "Key doesn't exist for this merchant ID" });
    else {
      const Key = new NodeRSA(key.key);

      try {
        const decrypted = Key.decrypt(string, "utf8");
        res.json({ decryptedString: decrypted });
      } catch (error) {
        res.json({ decryptedString: "Unable to decrypt" });
      }
    }
  });
});

app.get("/get-keys", (req, res) => {
  Key.find().then(keys => res.json(keys));
});

app.delete("/delete/:merchantId", (req, res) => {
  // merchantId = req.body.merchantId;
  merchantId = req.params.merchantId;
  Key.deleteOne({ merchantId }).then(() => res.json({ status: "Deleted" }));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
