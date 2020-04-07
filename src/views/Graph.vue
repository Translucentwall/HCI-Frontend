<template>
  <div id='svgContainer'>
    <div class="every">
      <div class="svg" id="forceDirected"></div>
      <div class="option">
        <div class="option_name">{{changeType}}: <a class="center_name" :href="type<4?'/entity/'+this.$route.params.type+'/'+id: null">{{graphVO.centerName}}</a></div>
        <div v-if="type<4">
          <input type="checkbox" v-model="showTotal">Show Total Graph
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import * as d3 from 'd3'
    import {getGraph, getMoreGraph} from "../api/api";
    import {Loading} from "element-ui";

    export default {
        data () {
            return {
                id: 0,
                type: 0,
                typeDic: {"author":1, 'affiliation':2, 'issue':3, 'term': 4, 'paper':5},
                graphVO: {},
                moreGraphVO: {},
                moreGraphReady: false,
                showTotal: false
            }
        },
        mounted () {
            this.id=this.$route.params.id;
            this.type=this.typeDic[this.$route.params.type];
            if(this.id===undefined || this.type===undefined){
                window.location.href = '/home';
            }
            let loadingInstance = Loading.service({ fullscreen: true, text:'loading...'});
            getGraph(this.id,this.type)
                .then(res=>{
                    this.graphVO = res;
                    loadingInstance.close();
                    if(this.showTotal&&this.type<4){
                        getMoreGraph(this.id,this.type)
                            .then(res=>{
                                this.moreGraphVO = res;
                                this.moreGraphReady = true;
                                let nodes = this.graphVO.nodes.concat(this.moreGraphVO.nodes);
                                let links = this.graphVO.links.concat(this.moreGraphVO.links);
                                this.forceDirected (nodes, links, 1);
                            });
                    }else{
                        let nodes = this.graphVO.nodes;
                        let links = this.graphVO.links;
                        this.forceDirected (nodes, links, 1);
                        if(this.type<4){
                            getMoreGraph(this.id, this.type)
                                .then(res=>{
                                    this.moreGraphVO = res;
                                    this.moreGraphReady = true;
                                });
                        }
                    }
                });
        },
        watch: {
            showTotal: function () {
                if(this.showTotal&&!this.moreGraphReady&&this.type<4){
                    this.$notify.info({
                        title: 'info',
                        message: 'Total graph is preparing!',
                        duration: 0,
                        showClose: false
                    });
                }else{
                    if(this.showTotal&&this.type<4){
                        this.$notify.closeAll();
                        let svg = document.getElementById('forceDirected');
                        let children = svg.childNodes;
                        children.forEach(function (child) {
                            svg.removeChild(child);
                        });
                        let nodes = this.graphVO.nodes.concat(this.moreGraphVO.nodes);
                        let links = this.graphVO.links.concat(this.moreGraphVO.links);
                        this.forceDirected (nodes, links, 2);
                    }else{
                        this.$notify.closeAll();
                        let svg = document.getElementById('forceDirected');
                        let children = svg.childNodes;
                        children.forEach(function (child) {
                            svg.removeChild(child);
                        });
                        let nodes = this.graphVO.nodes;
                        let links = this.graphVO.links;
                        this.forceDirected (nodes, links, 1);
                    }
                }
            },
            moreGraphReady: function () {
                this.$notify.closeAll();
                let that = this;
                this.$notify.success({
                    title: 'success',
                    message: 'Total graph is ready!',
                    duration:1500,
                    onClose: function () {
                        if(that.showTotal){
                            let svg = document.getElementById('forceDirected');
                            let children = svg.childNodes;
                            children.forEach(function (child) {
                                svg.removeChild(child);
                            });
                            let nodes = that.graphVO.nodes.concat(that.moreGraphVO.nodes);
                            let links = that.graphVO.links.concat(that.moreGraphVO.links);
                            that.forceDirected (nodes, links, 2);
                        }
                    }
                });
            }
        },
        computed: {
            changeType: function () {
                let type = this.$route.params.type;
                return type.substring(0,1).toUpperCase() + type.substring(1);
            }
        },
        methods: {
            forceDirected (nodes, links, type) {
                console.log(nodes.length);
                let maxHot = Math.max.apply(Math,links.map(item => { return item.value }));
                let width = document.getElementById('svgContainer').offsetWidth;
                let height = nodes.length<200?800:nodes.length<400?1200:1600;
                // let padding = {
                //     left: 30,
                //     right: 30,
                //     top: 20,
                //     bottom: 20
                // };
                let centerId = Number(this.id);
                let centerType = Number(this.type);
                let svg = d3.select('#forceDirected')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);
                // 通过布局来转换数据，然后进行绘制
                let simulation = d3.forceSimulation()
                    .nodes(nodes)
                    .force('link', d3.forceLink(links).distance(nodes.length<200?200:75).id(d=>d.id))
                    .force('charge', d3.forceManyBody())
                    .force('center', d3.forceCenter(width / 2, height / 2));

                // 添加连线
                svg.selectAll('line')
                    .data(links)
                    .enter()
                    .append('line')
                    .attr("stroke", "#cccccc")
                    .attr('stroke-width', function (d) {
                        if(d.value < 0){
                            return 1;
                        }else{
                            return 1 + d.value/15;
                        }
                    })
                    .attr('stroke-dasharray', function (d) {
                        if(d.source.entityType===4 || d.target.entityType===4 && d.value>=60){
                            return ''+ (1+maxHot/15)+',5';
                        }else if(d.source.entityType===4 || d.target.entityType===4){
                            return '5,5'
                        }else{
                            return ''
                        }
                    });
                // 添加描述
                svg.selectAll('text')
                    .data(nodes)
                    .enter()
                    .append('text')
                    .style('font-size', '10px')
                    .style('fill', '#000000')
                    .style('left', '10px')
                    .attr('dx', 10)
                    .attr('dy', 10)
                    .text(function (d) {
                        if(nodes.length<200){
                            if(d.entityName.length<=20){
                                return d.entityName;
                            }else{
                                return d.entityName.substr(0,20)+'...';
                            }
                        }else{
                            if(d.entityName.length<=10){
                                return d.entityName;
                            }else{
                                return d.entityName.substr(0,10)+'...';
                            }
                        }

                    });
                // 添加节点
                svg.selectAll('circle')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr('r', function (d) {
                        if(d.entityId===centerId&&d.entityType===centerType&&nodes.length<200){
                            return 10;
                        }else if(d.entityId===centerId&&d.entityType===centerType){
                            return 6;
                        }else if(nodes.length<200){
                            return 6;
                        }else{
                            return 4;
                        }
                    })
                    .attr('stroke', '#000000')
                    .attr('stroke-width', 2)
                    .style('cursor', 'pointer')
                    .style('fill', function (d) {
                        if(d.entityId===centerId&&d.entityType===centerType){
                            return 'rgb(106,0,95)';
                        }
                        else if(d.entityType===1 ){
                            return 'rgb(214, 39, 40)';
                        }else if(d.entityType===2 ){
                            return 'rgb(255, 127, 14)';
                        }else if(d.entityType===3 ){
                            return 'rgb(214,214,8)';
                        }else if(d.entityType===4 ){
                            return 'rgb(44, 160, 44)';
                        }else if(d.entityType===5 ){
                            return 'rgb(31, 119, 180)';
                        }else{
                            return 'rgb(0,0,0)';
                        }
                    })
                    .attr('class', function (d) {
                        if(d.entityType===1){
                            return 'author';
                        }else if(d.entityType===2){
                            return 'affiliation';
                        }else if(d.entityType===3){
                            return 'issue';
                        }else if(d.entityType===4){
                            return 'term';
                        }else if(d.entityType===5){
                            return 'paper';
                        }else{
                            return ''
                        }
                    })
                    .on('click',function (d) {
                        let typeDic2 = {1:"author", 2:'affiliation', 3:'issue', 4:'term', 5:'paper'};
                        if(d.entityType<5){
                            window.location.href='/graph/' + typeDic2[d.entityType] + '/'+ d.entityId;
                        }else{
                            window.location.href='/paper/' + d.entityId;
                        }
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
                    )
                    .on('mouseover', function (d) {
                        svg.selectAll('line')
                            .style('stroke-width', function(link) {
                                if (link.source === d || link.target === d) {
                                    return 2;
                                }
                            })
                            .style('stroke', function(link) {
                                if (link.source === d || link.target === d) {
                                    return '#000000';
                                }
                            })
                    })
                    .on('mouseout', function (d) {
                        svg.selectAll('line')
                            .style('stroke-width', function(link) {
                                if (link.source === d || link.target === d) {
                                    if(link.value < 0){
                                        return 1;
                                    }else{
                                        return 1 + link.value/15;
                                    }
                                }
                            })
                            .style('stroke', function(link) {
                                if (link.source === d || link.target === d) {
                                    return '#cccccc'
                                }
                            })
                    })
                    .append('title')
                    .text(d=>d.entityName);
                //数据重绘
                simulation.on('tick', function () {
                    svg.selectAll('circle')
                        .attr('cx', function (d) { return d.x })
                        .attr('cy', function (d) { return d.y });
                    svg.selectAll('text')
                        .attr('x', function (d) { return d.x })
                        .attr('y', function (d) { return d.y });
                    svg.selectAll('line')
                        .attr('x1', function (d) { return d.source.x })
                        .attr('y1', function (d) { return d.source.y })
                        .attr('x2', function (d) { return d.target.x })
                        .attr('y2', function (d) { return d.target.y });
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
  #forceDirected{
    width: 100%;
  }
  .every{
    /*margin:15px;*/
    float: left;
    position: relative;
  }
  .svg{
    /*border: 1px solid #cccccc;*/
  }
  .option{
    position: absolute;
    top: 0;
    left: 20px;
    text-align: left;
    min-width: 160px;
  }
  .option_name{
    margin-left: 0.5ex;
  }
  .center_name{
    color: #000000;
  }
  .center_name:hover{
    color: #409eff;
  }
  .author{
    color: rgb(214, 39, 40);
  }
  .affiliation{
    color: rgb(255, 127, 14);
  }
  .issue{
    color: rgb(214, 214, 8);
  }
  .term{
    color: rgb(44, 160, 44);
  }
  .paper{
    color: rgb(31, 119, 180);
  }
</style>
