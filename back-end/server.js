const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  attack: String,
  defense: String,
  special: String,
  weapon: String,
  path: String,
});



// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  attack: String,
  defense: String,
  path: String,
});

const Weapon = mongoose.model('Weapon', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    attack: req.body.attack,
    defense: req.body.defense,
    special: req.body.special,
    weapon: req.body.weapon,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/weapons', async (req, res) => {
  const weapon = new Weapon({
    title: req.body.wtitle,
    description: req.body.wdescription,
    attack: req.body.wattack,
    defense: req.body.wdefense,
    path: req.body.path,
  });
  try {
    await weapon.save();
    res.send(weapon);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete Ordinary Object
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit Title
app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
    _id: req.params.id,
    });
    item.title = req.body.title
    item.description = req.body.description
    item.attack = req.body.attack
    item.defense = req.body.defense
    item.special = req.body.special
    item.weapon = req.body.weapon
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
