<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/hero.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Website of Heroes</h1>
      <router-link to="/">Home</router-link>
      <span class="invisiblemenu">spaces</span>
      <router-link to="/admin" >Admin</router-link>
      <span class="invisiblemenu">spaces</span>
      <router-link to="/weapons">Weapons</router-link>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <p>
      <router-link to="/admin">Admin</router-link>
      <span class="invisible" >thisistocreatespacebetweentherouterlinkandlabatthebottom</span>
      <a href="https://github.com/PaetonM/Creative4">Paeton and Braden Creative 4</a>
    </p>
  </div>
</div>
</template>

<style>
#app {
    margin-bottom: 75px;
}

html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 2px 10px 10px;
  /*padding: 10px 100px 0px 100px;original padding*/
  background-color: #5BDEFF;
  color: #1C454F;
}

img {
  height: 100px;
  width: 100px;
  padding-right: 30px;
  padding-top: 5px;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  background: #e3e3e3;
  font-size: 12px;
  position: fixed;
  width: 100%;
  border: solid 3px;
  bottom: 0px;
  text-align: center;
  height: 75px;
  line-height: 75px;
  color: black;
  bottom: 0px;
}

.invisible {
  color: #e3e3e3;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

.invisiblemenu {
  color: #5BDEFF;
}
</style>
