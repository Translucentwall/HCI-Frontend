<template>
  <div class="hot-graph">
<!--    <span class="year">{{year}}</span>-->
    <span title="热度变化曲线">
      <svg width="155" height="43">
        <defs>
          <linearGradient :id="'gradient-' + id" x1="0" x2="0" y1="1" y2="0">
              <stop offset="10%" stop-color="#9be9a8"></stop>
              <stop offset="33%" stop-color="#40c463"></stop>
              <stop offset="66%" stop-color="#30a14e"></stop>
              <stop offset="90%" stop-color="#216e39"></stop>
          </linearGradient>
          <mask :id="'sparkline-' + id" x="0" y="0" width="155" height="28" >
            <polyline transform="translate(11, 28) scale(1,-1)"
                      :points="points" fill="transparent" stroke="#8cc665" stroke-width="2">
            </polyline>
          </mask>
        </defs>

        <g>
          <rect x="11" y="0" width="155" height="30"
                :style="'stroke: none; fill: url(#gradient-' + id + '); mask: url(#sparkline-' + id +')'"></rect>
          <text x="0" y="38" fill="#aaa" font-size="12px">{{year}}</text>
        </g>
      </svg>
    </span>
  </div>
</template>

<script>
    export default {
        name: "HotGraph",
        data(){
            return{
                year: 2000,
                points: '',
            }
        },
        props: {
            data: {
                type: String,
                default: ''
            },
            id: {
                type: String,
                default: '101'
            }
        },
        mounted() {
            this.changeData();
        },
        methods: {
            changeData: function () {
                this.year = this.data.split(' ')[0];
                let dataStr = this.data.slice(5).split(' ');
                let dataInt = [];
                dataStr.forEach(function (data) {
                    dataInt.push(+data);
                })
                if(dataInt.length === 1){
                    dataInt.unshift(0);
                    dataInt.push(0);
                    this.year -= 1;
                }
                let max = Math.max(...dataInt);
                let min = Math.min(...dataInt);
                let points = ''
                for(let i = 0, j = 0; i < 150, j<dataInt.length; i += 150/(dataInt.length-1), j += 1){
                    if(min === 0){
                        points = points + i + ',' + (dataInt[j]*(12/max) + 1) + ' ';
                    }else{
                        points = points + i + ',' + (dataInt[j]*(12/max)) + ' ';
                    }

                }
                this.points = points;
            }
        }
    }
</script>

<style scoped>
  .hot-graph{
    min-width: 190px;
    text-align: left;
  }
  .year{
    color: #aaaaaa;
    font-size: 12px;
  }
</style>
