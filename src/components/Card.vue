<template>
  <div class="card">
    <div class="title-wrap">
      <router-link class="router-link" to="/paper">
        <span class="title">{{title}}</span>
      </router-link>
    </div>
    <div class="multiple-wrap">
      <span class="author">{{author}}</span>
      <span class="publisher">{{publisher}}</span>
      <span class="publication">{{publication}}</span>
    </div>
    <div class="keyword-wrap">
      <span v-for="word in keywords">
        <span class="keyword">{{word}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        title: {
            type: String,
            default: 'null'
        },
        author: {
            type: String,
            default: 'null'
        },
        publisher: {
            type: String,
            default: 'null'
        },
        publication: {
            type: String,
            default: 'null'
        },
        keywords: {
            type: Array,
            default: () => {}
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
    padding-left: 10px;
  }
  .router-link{
    text-decoration: none;
  }
  .router-link:hover{
    color: black;
    text-decoration: black;
  }
  .title{
    color: #069;
    /*border-bottom: 1px solid #409eff;*/
    font-size: 24px;
  }
  .author{

  }
  .publisher{

  }
  .publication{

  }
  .keyword{
    margin-right: 20px;
    color: #409eff;
  }
  /*span{*/
  /*  overflow: hidden;*/
  /*  text-overflow: ellipsis;*/
  /*  white-space: nowrap;*/
  /*}*/
</style>
