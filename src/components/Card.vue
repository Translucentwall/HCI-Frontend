<template>
  <div class="card">
    <div class="title-wrap">
      <router-link class="router-link" to="/paper">
        <span class="title">{{title}}</span>
      </router-link>
    </div>
    <div class="author-affiliation-wrap">
      <div v-for="i in author.length" class="author-affiliation">
        <span class="author">{{author[i-1]}},</span>
        <span class="publisher">{{publisher[i-1]}};</span>
      </div>
    </div>
    <div class="publication-wrap">
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
            type: Array,
            default: () => {}
        },
        publisher: {
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
    }
}
</script>

<style scoped>
  .card{
    background-color: white;
    margin: 10px 50px;
    box-shadow: 0 1px 0 #aaaaaa;
    text-align: left;
    padding: 0 20px 5px 20px;
  }
  .title{
    color: #069;
    /*border-bottom: 1px solid #409eff;*/
    font-size: 24px;
  }
  .author-affiliation-wrap{
    display: flex;
  }
  .author-affiliation{
    margin-right: 10px;
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
