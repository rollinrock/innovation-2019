<template>
  <div id="app">
    <header>
      <h4>{{title}}</h4>
    </header>
    <body>
      <div class="container">
        <div class="row">
          <div class="district-explorer-container col-4">
            <district-explorer></district-explorer>
          </div>
          <div class="search-map-container col-8">
            <search-map></search-map>
          </div>
        </div>
      </div>
    </body>
    <footer>
      <p> &copy;中国联通金华分公司 联系邮箱：<a href="mailto:caoj30@chinaunicom.cn">caoj30@chinaunicom.cn</a></p>
    </footer>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import SearchMap from './components/SearchMap.vue';
import DistrictExplorer from './components/DistrictExplorer.vue';

export default {
  name: 'app',
  data: function() {
    return {
      title: '中国联通创新2019'
    }
  },
  components: {
    SearchMap, DistrictExplorer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

header, footer {
  height: 100px;
}

div {
  /* border: 1px solid gray; */
}

.search-map-container {
  height: 600px;
}

.h600 {
  height: 600px;
}

</style>
