const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Cluster66410:inanpw6102019@cluster66410.xd7ic8y.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "reactdata",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});

const Products = require("./dataSchema");

app.get("/", async (req, resp) => {
  const query = {};
  const allProducts = await Products.find(query);
  console.log(allProducts);
  resp.send(allProducts);
});

app.get("/:id", async (req, resp) => {
  const prodId = Number(req.params.id);
  const query = { id: prodId };
  const oneProduct = await Products.findOne(query);
  console.log(oneProduct);
  resp.send(oneProduct);
});

app.post("/insert", async (req, res) => {
  const p_objectId = req.body._id;
  const p_id = req.body.id;
  const ptitle = req.body.title;
  const pprice = req.body.price;
  const pdescription = req.body.description;
  const pcategory = req.body.category;
  const pimage = req.body.image;
  const prate = req.body.rating.rate;
  const pcount = req.body.rating.count;

  const formData = new Products({
    _id: new mongodb.ObjectId(),
    id: p_id,
    title: ptitle,
    price: pprice,
    description: pdescription,
    category: pcategory,
    image: pimage,
    rating: { rate: prate, count: pcount }
  });

  try {
    // await formData.save();
    await Products.create(formData);
    const messageResponse = { message: `Product added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new product:" + err);
  }
});

app.put("/update", async (req, res) => {
  try {
    const p_objectId = req.body._id;
    const p_id = req.body.id;
    const ptitle = req.body.title;
    const pprice = req.body.price;
    const pdescription = req.body.description;
    const pcategory = req.body.category;
    const pimage = req.body.image;
    const prate = req.body.rating.rate;
    const pcount = req.body.rating.count;

    await Products.updateOne(
      { 
        _id: p_objectId
      },
      {
        $set: {
          id: p_id,
          title: ptitle,
          price: pprice,
          description: pdescription,
          category: pcategory,
          image: pimage,
          rating: { rate: prate, count: pcount }
        }
      }
    );
    const messageResponse = { message: `Product added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new product:" + err);
  }
});

app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { id: req.body.id };
    await Products.deleteOne(query);
    const messageResponse = {
      message: `Product deleted`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting :" + req.body.id + " " + err);
  }
});
