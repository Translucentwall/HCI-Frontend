<template>
  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+SC:100,300,400,500,700,900">
    <router-view/>
  </div>
</template>

<script>
import TopBar from "./components/TopBar";
export default {
  name: 'App',
    components: {TopBar}
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*font-family: "lucida grande", "lucida ans unicodes", lucida, Helvetica, "Helvetica Sans GB",*/
  /*"Microsoft YaHei", Noto Sans SC, sans-serif;*/
  font-family: Noto Sans SC, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  /*background-color: #e8ecef;*/
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
body{
  margin: 0;
}
</style>
