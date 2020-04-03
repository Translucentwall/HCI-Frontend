<template>
  <div id='svgContainer'>
    <div class="every">
      <div class="svg" id="forceDirected"></div>
      <div class="option">力导向图探究</div>
    </div>
  </div>
</template>
<script>
    import * as d3 from 'd3'
    import {getGraph} from "../api/analogApi";
    export default {
        data () {
            return {
                id: 0,
                type: 0,
                typeDic: {"author":1, 'affiliation':2, 'issue':3, 'term': 4, 'paper':5},
                graphVO: {},
                moreGraphVO: {}
            }
        },
        mounted () {
            this.id=this.$route.params.id;
            this.type=this.typeDic[this.$route.params.type];
            if(this.id===undefined || this.type===undefined){
                window.location.href = '/home';
            }
            console.log(this.type);
            this.graphVO = getGraph();
            this.forceDirected ();
        },
        methods: {
            forceDirected () {
                let width = 1400;
                let height = 600;
                let padding = {
                    left: 30,
                    right: 30,
                    top: 20,
                    bottom: 20
                };
                let nodes = this.graphVO.nodes;
                let links = this.graphVO.links;
                let svg = d3.select('#forceDirected')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);
                // 通过布局来转换数据，然后进行绘制
                let simulation = d3.forceSimulation()
                    .nodes(nodes)
                    .force('link', d3.forceLink(links).distance(100).id(d=>d.id))
                    .force('charge', d3.forceManyBody())
                    .force('center', d3.forceCenter((width - padding.left - padding.right) / 2, (height - padding.top - padding.bottom) / 2));
                let color = d3.scaleOrdinal(d3.schemeCategory10);

                // 添加连线
                svg.selectAll('line')
                    .data(links)
                    .enter()
                    .append('line')
                    .style('stroke', '#ccc')
                    .style('stroke-width', 2);
                // 添加节点
                svg.selectAll('circle')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr('r', 10)
                    .style('border','1px solid #ffffff')
                    .style('fill', function (d, i) {
                        return color(d.entityType);
                    })
                    // 添加圆圈的拖拽事件，同时他会触发simulation的tick事件，重新布局该区域
                    .call(d3.drag()
                        .on('start', function (d) {
                            if (!d3.event.active) {
                                simulation.alphaTarget(0.8).restart() // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
                            }
                            d.fx = d.x;
                            d.fy = d.y;
                        })
                        .on('drag', function (d) {
                            d.fx = d3.event.x;
                            d.fy = d3.event.y;
                        })
                        .on('end', function (d) {
                            if (!d3.event.active) {
                                simulation.alphaTarget(0);
                            }
                            d.fx = null;
                            d.fy = null;
                        })
                    );
                // 添加描述
                svg.selectAll('text')
                    .data(nodes)
                    .enter()
                    .append('text')
                    .style('font-size', '12px')
                    .style('fill', '#000')
                    .style('left', '10px')
                    .attr('dx', 10)
                    .attr('dy', 0)
                    .text(function (d) {
                        if(d.entityName.length<=10){
                            return d.entityName;
                        }else{
                            return d.entityName.substr(0,10)+'...';
                        }
                    });
                // // 添加relation
                // svg.selectAll('.relation')
                //     .data(links)
                //     .enter()
                //     .append('text')
                //     .style('fill', 'red')
                //     .style('font-size', '11px')
                //     .attr('class', 'relation')
                //     .attr('dx', 0)
                //     .attr('dy', 0)
                //     .text(function (d) { return d.relation });
                //数据重绘
                simulation.on('tick', function () {
                    svg.selectAll('circle')
                        .attr('cx', function (d) { return d.x })
                        .attr('cy', function (d) { return d.y })
                    svg.selectAll('text')
                        .attr('x', function (d) { return d.x })
                        .attr('y', function (d) { return d.y })
                    svg.selectAll('line')
                        .attr('x1', function (d) { return d.source.x })
                        .attr('y1', function (d) { return d.source.y })
                        .attr('x2', function (d) { return d.target.x })
                        .attr('y2', function (d) { return d.target.y })
                    svg.selectAll('.relation')
                        .attr('x', function (d) { return (d.source.x + d.target.x) / 2 })
                        .attr('y', function (d) { return (d.source.y + d.target.y) / 2 })
                })
            }
        }
    }
</script>
<style>
  #svgContainer{
    width: 100%;
    height: 100%;
  }
  .every{
    margin:15px;
    float: left;
    position: relative;
  }
  .button{
    float: right;
    margin-right: 20px;
    font-size: 14px;
    cursor: pointer;
    padding: 2px 8px;
    border:1px solid #ccc;
    background: yellowgreen;
    border-radius: 4px;}
  .button:hover{
    background: violet;
  }
  .svg{
    border: 1px solid #cccccc;
  }
  .option{
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
