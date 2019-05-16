<template>
    <div>
        <div class="input-group input-group-sm mb-3 search-box">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
            </div>
            <input id="pickerInput" type="text" class="form-control" placeholder="请输入关键字" aria-label="location" aria-describedby="basic-addon1">
        </div>
        <div class="area-selector">
            <label>区域选择(圆形)</label>
            <div class="input-group">
                <button id="select" class="btn btn-info btn-sm mr-2" @click="drawCircleAtCenter">开始</button>
                <button id="select-done" class="btn btn-warning btn-sm mr-2" @click="doneDrawingCircle">完成</button>
                <button id="select-done" class="btn btn-danger btn-sm" @click="removeCircle">移除</button>
            </div>
        </div>
        <div id="map-container" class="map-container">
            <!-- <el-amap vid="amapVid" :amap-manager="amapManager" class="amap-element" 
                :searchOption="searchOptions" :zoom="14" :plugin="plugins" :center="mapCenter" :events="events"></el-amap> -->
        </div>
    </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap';

export default {
    name: 'search-map',
    props: {
        height: Number
    },
    data() {
        return {
            amap: null,
            circle: null,
            circleEditor: null,
            initialCircleRadius: 800,
            mapCenter: [119.663884,29.071339],
        }
    },
    created() {
        let self = this;
        lazyAMapApiLoaderInstance.load().then(() => {
            let amap = self.amap = new AMap.Map('map-container', {
                zoom: 14,
                zooms: [5, 16],
                center: self.mapCenter,
            });

            AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch','AMap.ToolBar','AMap.Scale' ], () => {
                //地图插件
                amap.addControl(new AMap.ToolBar({position: 'LT'}));
                amap.addControl(new AMap.Scale({position: 'LB'}));


                let autoOpts = {
                    city: '金华市',
                    cityLimit: true,
                    input: 'pickerInput',
                };
                let autoComplete = new AMap.Autocomplete(autoOpts);

                let searchOpts = {
                    map: self.amap,
                };
                let placeSearch = new AMap.PlaceSearch(searchOpts);

                AMap.event.addListener(autoComplete, 'select', evt => {
                    placeSearch.search(evt.poi.name);
                });

            });

            let circle = self.circle = new AMap.Circle({
                map: self.amap,
                center: self.mapCenter,
                radius: self.initialCircleRadius,
                borderWeight: 3,
                strokeColor: "#FF33FF", 
                strokeOpacity: 1,
                strokeWeight: 6,
                strokeOpacity: 0.2,
                fillOpacity: 0.4,
                strokeStyle: 'dashed',
                strokeDasharray: [10, 10], 
                // 线样式还支持 'dashed'
                fillColor: '#1791fc',
                zIndex: 50,
            });

            circle.hide();

            let circleEditor = self.circleEditor = new AMap.CircleEditor(self.amap, circle);
            // circleEditor.on('move', asCircleMove);
            // circleEditor.on('adjust', asCircleAdjust);

        });

        

    }, 
    methods: {
        drawCircleAtCenter() {
            this.circle.show();
            this.circle.setCenter(this.amap.getCenter());
            this.circleEditor.open();
        },
        // asCircleAdjust(evt) {
        //     console.log(evt);
        // },
        // asCircleMove(evt) {
        //     console.log(evt);
        // },
        doneDrawingCircle() {

        },
        removeCircle() {
            this.circleEditor.close();
            this.circle.hide();
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

.area-selector {
    position: absolute;
    bottom: 5px;
    right: 20px;
    z-index: 100;
    width: 150px;
}

.map-container {
    position: relative;
    width: 100%;
    height: 500px;
    border: 1px solid gray;  
}
</style>


