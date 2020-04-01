<template>
  <div>
    <div>这里是关系图</div>
    <br/>
    <svg width="960" height="600"></svg>
  </div>
</template>

<script>
    import * as d3 from 'd3';
    import {getGraph} from "../api/analogApi";
    export default {
        name: "Graph",
        data(){
            return{
                graphVO: {},
                moreGraphVO: {}
            }
        },
        mounted() {
            //todo 获取graphVO并展示
            this.graphVO = getGraph(1,2);

        },
        methods: {
            renderGraph: function () {
                let svg = d3.select("svg"),
                    width = +svg.attr("width"),
                    height = +svg.attr("height");
                let color = d3.scaleOrdinal(d3.schemeCategory20);

            }
        }
    }
</script>

<style scoped>

</style>
