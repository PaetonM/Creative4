<template>
<div class="admin">
  <h1>The Creator Page!</h1>
  <div class="createhero">
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a Hero</h2>
    </div>
    <p class="twentyfive">This is the section where you add your favorite heroes. Each hero can have a name, description, attack stat, defense stat, special, and a photo.</p>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Name"><p></p>
        <input v-model="description" placeholder="Hero Description"><p></p>
        <input v-model="attack" placeholder="Attack Stat"><p></p>
        <input v-model="defense" placeholder="Defense Stat"><p></p>
        <input v-model="special" placeholder="Special">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
        <h3>{{addItem.description}}</h3>
        <h3>{{addItem.attack}}</h3>
        <h3>{{addItem.defense}}</h3>
        <h3>{{addItem.special}}</h3>
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete a Hero</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search Heroes">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title" placeholder="Name">
        <p></p>
        <img :src="findItem.path" />
        <p></p>
        <input v-model="findItem.description" placeholder="Description">
        <p></p>
        <input v-model="findItem.attack" placeholder="Attack Stat">
        <p></p>
        <input v-model="findItem.defense" placeholder="Defense Stat">
        <p></p>
        <input v-model="findItem.special" placeholder="Special">
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit Hero Info</button>
      </div>
    </div>
  </div>
  <div class="createweapon">
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a Weapon</h2>
    </div>
    <p class="twentyfive">This is the section where you create a weapon that a hero can use. A weapon can have a name, description, attack stat, and defense stat</p>
    <div class="add">
      <div class="form">
        <input v-model="wtitle" placeholder="Weapon Name"><p></p>
        <input v-model="wdescription" placeholder="Weapon Description"><p></p>
        <input v-model="wattack" placeholder="Attack Stat"><p></p>
        <input v-model="wdefense" placeholder="Defense Stat"><p></p>
        <p></p>
        <input type="file" name="photo" @change="fileChanged2">
        <button @click="uploadtwo">Upload</button>
      </div>
      <div class="uploadtwo" v-if="addItemtwo">
        <h2>{{addItemtwo.title}}</h2>
        <img :src="addItemtwo.path" />
        <h3>{{addItemtwo.description}}</h3>
        <h3>{{addItemtwo.attack}}</h3>
        <h3>{{addItemtwo.defense}}</h3>
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete a Weapon</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitletwo" placeholder="Search Weapons">
        <div class="suggestions" v-if="suggestionstwo.length > 0">
          <div class="suggestion" v-for="s in suggestionstwo" :key="s.id" @click="selectWeapon(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findWeapon">
        <input v-model="findWeapon.title" placeholder="Name">
        <p></p>
        <img :src="findWeapon.path" />
        <p></p>
        <input v-model="findWeapon.description" placeholder="Description">
        <p></p>
        <input v-model="findWeapon.attack" placeholder="Attack Stat">
        <p></p>
        <input v-model="findWeapon.defense" placeholder="Defense Stat">
      </div>
      <div class="actions" v-if="findWeapon">
        <button @click="deleteWeapon(findWeapon)">Delete</button>
        <button @click="editWeapon(findWeapon)">Edit Weapon Info</button>
      </div>
    </div>
  </div>
</div>
</template>

<script scoped>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      wtitle: "",
      description: "",
      wdescription: "",
      attack: "",
      wattack: "",
      defense: "",
      wdefense: "",
      special: "",
      file: null,
      addItem: null,
      addItemtwo: null,
      items: [],
      weapons: [],
      findTitle: "",
      findTitletwo: "",
    findItem: null,
    findWeapon: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    },
    suggestionstwo() {
      let weapons = this.weapons.filter(weapon => weapon.title.toLowerCase().startsWith(this.findTitletwo.toLowerCase()));
      return weapons.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getItems();
    this.getWeapons();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    fileChanged2(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          description: this.description,
          attack: this.attack,
          defense: this.defense,
          special: this.special,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadtwo() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/wphotos', formData);
        let r2 = await axios.post('/api/weapons', {
          wtitle: this.wtitle,
          wdescription: this.wdescription,
          wattack: this.wattack,
          wdefense: this.wdefense,
          wpath: r1.data.path
        });
        this.addItemtwo = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getWeapons() {
      try {
        let response = await axios.get("/api/weapons");
        this.weapons = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    selectWeapon(weapon) {
      this.findTitletwo = "";
      this.findWeapon = weapon;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteWeapon(weapon) {
      try {
        await axios.delete("/api/weapons/" + weapon._id);
        this.findWeapon = null;
        this.getWeapons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          attack: this.findItem.attack,
          defense: this.findItem.defense,
          special: this.findItem.special,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editWeapon(weapon) {
      try {
        await axios.put("/api/weapons/" + weapon._id, {
          wtitle: this.findWeapon.title,
          wdescription: this.findWeapon.description,
          wattack: this.findWeapon.attack,
          wdefense: this.findWeapon.defense,
        });
        this.findWeapon = null;
        this.getWeapons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
var password = prompt("Please Enter Password","password");

while (password != "CS260") {
  password = window.prompt("Please Enter The Correct Password","password");
}
alert("Successfully Logged In");
</script>

<style scoped>
.twentyfive {
  width: 50%;
}

.createhero {
  width: 40%;
  float: left;
  margin-bottom: 95px;
}

.createweapon {
  width: 50%;
  float: right;
  margin-bottom: 95px;
}
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

@media only screen and (max-width: 1024px) {
  .createhero {
    width: 40%;
    float: none;
    margin-bottom: 95px;
  }

  .createweapon {
    width: 50%;
    float: none;
    margin-bottom: 95px;
  }
}
</style>
