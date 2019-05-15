<template>
    <div class="explorer-container">
        <div id="explorer">

        </div>
    </div>
</template>

<script>
// import { AMapManager } from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';

export default {
    name: 'district-explorer',
    props: {
        height: Number,
    },
    data(){
        return {
            amap: null,
            defaultAdcode: 330000, //行政区划-浙江省
        }
    },
    beforeCreate(){
        
    },
    amounted(){
        lazyAMapApiLoaderInstance.load().then(() => {
            // your code ...
            this.amap = new AMap.Map('explorer', {
                zoom: 10,
                center: [120.208508,30.235268] //杭州
            });

            AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {
                //启动页面
                initExplorer(DistrictExplorer);
            });
        });

        function initExplorer(DistrictExplorer){

            let explorer = new DistrictExplorer({map: this.amap});
            explorer.loadAreaNode(this.defaultAdcode, function(error, areaNode) {
                if (error) alert('绘制失败');
                renderAreaNode(explorer, areaNode);
            });

        }
        
        function renderAreaNode(districtExplorer, areaNode){
            districtExplorer.clearFeaturePolygons();
            var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"];

            //绘制子级区划
            districtExplorer.renderSubFeatures(areaNode, function(feature, i) {

                var fillColor = colors[i % colors.length];
                var strokeColor = colors[colors.length - 1 - i % colors.length];

                return {
                    cursor: 'default',
                    bubble: true,
                    strokeColor: strokeColor, //线颜色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 1, //线宽
                    fillColor: fillColor, //填充色
                    fillOpacity: 0.35, //填充透明度
                };
            });

            //绘制父级区划，仅用黑色描边
            districtExplorer.renderParentFeature(areaNode, {
                cursor: 'default',
                bubble: true,
                strokeColor: 'black', //线颜色
                fillColor: null,
                strokeWeight: 3, //线宽
            });

            //更新地图视野以适合区划面
            this.amap.setFitView(districtExplorer.getAllFeaturePolygons());
        }
        
    },
    methods: {
        
        
    }

}
</script>

<style scoped>
.explorer-container {
    border: 1px solid gray;
    height: 500px;
}

</style>

