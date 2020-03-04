<template>
  <div class="card">
    <div class="title-wrap">
      <router-link class="router-link" :to="to">
        <span class="title">{{title}}</span>
      </router-link>
    </div>
    <div class="author-affiliation-wrap">
      <div v-for="i in author.length" class="author-affiliation" v-if="i < 4">
        <span class="author" @click="searchItem(author[i-1], '3')">{{author[i-1]}},</span>
        <span class="affiliation" @click="searchItem(affiliation[i-1], '4')">{{affiliation[i-1]}};</span>
      </div>
      <div v-if="author.length > 3">...</div>
    </div>
    <div class="publication-wrap">
      <span class="publication" @click="searchItem(publication, '5')">{{publication}}</span>
    </div>
    <div class="keyword-wrap">
      <span v-for="(word,index) in keywords" v-if="index < 5">
        <span class="keyword" @click="searchItem(word, '6')">{{word}}</span>
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
            default: 'null'
        },
        id: {
            type: Number,
            default: 0
        },
        author: {
            type: Array,
            default: () => {}
        },
        affiliation: {
            type: Array,
            default: () => {}
        },
        publication: {
            type: String,
            default: 'null'
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
            console.log('a');
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
  }
  .author-affiliation-wrap{
    display: flex;
    padding: 0 12px;
  }
  .author-affiliation{
    margin-right: 10px;
  }
  .author:hover{
    color: #409eff;
  }
  .affiliation:hover{
    color: #409eff;
  }
  .publication-wrap{
    padding: 0 12px;
  }
  .publication:hover{
    color: #409eff;
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
  }
</style>
