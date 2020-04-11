<template>
<div>
  <div class="addweapon">
    <h1>The Weapons Page</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Pick a Hero to add a weapon down below</h2>
    </div>
    <!--div class="add">
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
    </div-->
    <div class="heading">
      <!--div class="circle">2</div>
      <h2>Add weapon</h2-->
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title" placeholder="Name">
        <p></p>
        <input v-model="findItem.weapon" placeholder="New Weapon">
        <p></p>
        <img :src="findItem.path" />
        <p></p>
        <!--input v-model="findItem.description">
        <p></p>
        <input v-model="findItem.attack">
        <p></p>
        <input v-model="findItem.defense">
        <p></p>
        <input v-model="findItem.special"-->
      </div>
      <div class="actions" v-if="findItem">
        <!--button @click="deleteItem(findItem)">Delete</button-->
        <button @click="editItem(findItem)">Add weapon</button>
      </div>
    </div>
  </div>
  <div class="displayweapons">
    <div class="home">
      <section class="image-gallery">
        <div class="image" v-for="weapon in weapons" :key="weapon.id">
          <h1><span>Name: </span>{{weapon.title}}</h1>
          <img :src="weapon.path" />
          <h3><span>Description: </span>{{weapon.description}}</h3>
          <h3><span>Attack: </span>{{weapon.attack}}</h3>
          <h3><span>Defense: </span>{{weapon.defense}}</h3>

        </div>
      </section>
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
      description: "",
      attack: "",
      defense: "",
      special: "",
      weapon: "",
      file: null,
      addItem: null,
      weapons: [],
      items: [],
      findTitle: "",
    findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
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
          weapon: this.weapon,
          path: r1.data.path
        });
        this.addItem = r2.data;
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
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
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
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          attack: this.findItem.attack,
          defense: this.findItem.defense,
          special: this.findItem.special,
          weapon: this.findItem.weapon,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editWeapon(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          attack: this.findItem.attack,
          defense: this.findItem.defense,
          special: this.findItem.special,
          weapon: this.findItem.weapon,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.displayweapons {
  width: 50%;
  height: 2000px;
  float: right;
}


.addweapon {
  width: 40%;
  float: left;
  position: fixed;
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
  margin-right: 5px;
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

.image-gallery {
  column-gap: 1.5em;
  font-family: 'marvel';
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  margin: auto;
}
</style>
