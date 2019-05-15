<template>
    <div>
        <div class="input-group input-group-sm mb-3 search-box">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
            </div>
            <input id="pickerInput" type="text" class="form-control" placeholder="请输入关键字" aria-label="location" aria-describedby="basic-addon1">
        </div>
        <div id="map-container" class="map-container">
            <el-amap vid="amapVid" :amap-manager="amapManager" class="amap-element" 
                :searchOption="searchOptions" :zoom="14" :plugin="plugins" :center="mapCenter" :events="events"></el-amap>
        </div>
    </div>
</template>

<script>
import { AMapManager } from 'vue-amap';

let amapManager = new AMapManager();


export default {
    name: 'search-map',
    props: {
        height: Number
    },
    data() {
        let self = this;
        return {
            mapCenter: [119.663884,29.071339], //金华联通大厦
            events: {
                init(amap) {
                    let centerMarker = new AMap.Marker({
                        position: self.mapCenter
                    })
                    centerMarker.setMap(amap);
                }
            },
            
            amapManager,
            searchOptions: {
                city: '金华'
            },
            plugins: [
                {pName: 'Scale'}, {pName: 'ToolBar'}
            ]
        }
    }
    
}
</script>

<style scoped>
.search-box {
    position: absolute;
    top: 5px;
    right: 20px;
    z-index: 100;
    width: 150px;
}

.map-container {
    position: relative;
    width: 100%;
    height: 500px;
}
</style>


