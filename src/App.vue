<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">登入</router-link> |
      <router-link to="/home">注册</router-link> -->
    </div>
   <router-view/>
  </div>
</template>

<style lang="less">
	body{
		margin: 0; padding: 0;
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
	text-decoration: none;
  }
}
</style>
