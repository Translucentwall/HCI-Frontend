<template>
  <div class="card">
    <div class="title-wrap">
      <router-link class="router-link" :to="to">
        <span class="title" v-html="title"></span>
      </router-link>
    </div>
    <div class="author-affiliation-wrap" v-if="author_simpleAffiliationVOS&&author_simpleAffiliationVOS[0]&&author_simpleAffiliationVOS[0].author!==''">
      <div v-for="(item,index) in author_simpleAffiliationVOS" class="author-affiliation" v-if="index < 3">
        <span class="author" @click="searchItem(item.author, '3')" v-html="item.author"></span>
        <span v-if="item.affiliation&&item.affiliation!=='NA'">,</span>
        <span class="affiliation" @click="searchItem(item.affiliation, '4')" v-if="item.affiliation&&item.affiliation!=='NA'" v-html="item.affiliation.split(',')[0]"></span>
        <span>;</span>
      </div>
      <div v-if="author_simpleAffiliationVOS.length > 3">...</div>
    </div>
    <div class="publication-wrap" v-if="publication">
      <span>publication: </span>
      <span class="publication" @click="searchItem(publication, '5')" v-html="publication"></span>
      <span v-if="year">, </span>
      <span class="year" v-html="year" v-if="year"></span>
    </div>
    <div class="keyword-wrap" v-if="keywords&&keywords[0]">
      <span v-for="(word,index) in keywords" v-if="index < 5">
        <span class="keyword" @click="searchItem(word, '6')" v-html="word"></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Card',
    data(){
        return{
            to: ''
        }
    },
    mounted(){
        this.to = '/paper?id=' + this.id;
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        id: {
            type: Number,
            default: 0
        },
        author_simpleAffiliationVOS: {
            type: Array,
            default: () => {}
        },
        publication: {
            type: String,
            default: ''
        },
        year: {
            type: String,
            default: ''
        },
        keywords: {
            type: Array,
            default: () => {}
        }
    },
    methods: {
        searchItem: function (item, mode) {
            sessionStorage.setItem('searchContent', item);
            switch (mode) {
                case '1': {
                    sessionStorage.setItem('searchMode', 'All');
                    break;
                }
                case '2': {
                    sessionStorage.setItem('searchMode', 'Title');
                    break;
                }
                case '3': {
                    sessionStorage.setItem('searchMode', 'Author');
                    break;
                }
                case '4': {
                    sessionStorage.setItem('searchMode', 'Affiliation');
                    break;
                }
                case '5': {
                    sessionStorage.setItem('searchMode', 'Publication');
                    break;
                }
                case '6': {
                    sessionStorage.setItem('searchMode', 'Keyword');
                    break;
                }
                default:{
                    sessionStorage.setItem('searchMode', 'All');
                    break;
                }
            }
            this.$emit('search');
        }
    }
}
</script>

<style scoped>
  .card{
    background-color: white;
    margin: 10px 50px;
    box-shadow: 0 1px 0 #aaaaaa;
    text-align: left;
    padding: 0 20px 5px 2px;
  }
  .title{
    color: #069;
    /*border-bottom: 1px solid #409eff;*/
    font-size: 24px;
  }
  .title:hover{
    color: #409eff;
    text-decoration: underline;
  }
  .author-affiliation-wrap{
    /*display: flex;*/
    padding: 0 12px;
  }
  .author-affiliation{
    margin-right: 10px;
  }
  .author:hover{
    color: #409eff;
    text-decoration: underline;
  }
  .affiliation:hover{
    color: #409eff;
    text-decoration: underline;
  }
  .publication-wrap{
    padding: 0 12px;
  }
  .publication:hover{
    color: #409eff;
    text-decoration: underline;
  }
  .keyword-wrap{
    padding: 0 12px;
  }
  .keyword{
    margin-right: 20px;
    color: #069;
  }
  .keyword:hover{
    color: #409eff;
    text-decoration: underline;
  }
</style>
