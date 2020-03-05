<template>
  <div>
    <div class="body_top">
      <div class="top_img">
        <img src="../assets/background-medium.jpg" alt="This is a background pic."/>
      </div>
    </div>
    <div class="body_bottom">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>{{paperVO.identifier}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{paperVO.publication}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="body_bottom_body">
        <div class="title">
          <span>{{paperVO.title}}</span>
        </div>
        <div class="citation_wrap" v-if="paperVO.referenceCount > 0 || paperVO.citationCount > 0">
          <div class="reference citation_box" v-if="paperVO.referenceCount > 0">
            <div class="citation_title">Reference</div>
            <div class="citation_count">{{paperVO.referenceCount}}</div>
          </div>
          <div class="citation citation_box" v-if="paperVO.citationCount > 0">
            <div class="citation_title">Citation</div>
            <div class="citation_count">{{paperVO.citationCount}}</div>
          </div>
        </div>
        <div class="information">
          <el-collapse v-model="activeCollapse" @change="handleChange">
            <el-collapse-item title="Abstract" name="1" class="block">
              <div class="abstract">
                <div class="summary font-medium" v-if="paperVO.summary">
                  <div class="subtitle">Summary:</div>
                  {{paperVO.summary}}
                </div>
                <div class="publication font-medium" v-if="paperVO.publicationTitle">
                  <div class="subtitle">Publication:</div>{{paperVO.ordno}} {{paperVO.publicationTitle}}, P{{paperVO.startPage}} - P{{paperVO.endPage}}, {{paperVO.publicationYear}}
                </div>
                <div class="publisher font-medium" v-if="paperVO.publisher">
                  <span class="subtitle">Publisher: </span>{{paperVO.publisher}}
                </div>
                <div class="DOI font-medium" v-if="paperVO.doi">
                  <span class="subtitle">DOI: </span>{{paperVO.doi}}
                </div>
                <div class="PDFLink font-medium" v-if="paperVO.pdflink">
                  <span class="subtitle">PDF Link: </span><a :href="paperVO.pdflink">{{paperVO.pdflink}}</a>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="Authors" name="2" class="block" v-if="paperVO.author_affiliationVOS&&paperVO.author_affiliationVOS[0]">
              <div class="author_affiliation" v-for="item in paperVO.author_affiliationVOS" v-if="item.author">
                <span class="author" @click="search('Author', item.author)">{{item.author}}</span>
                <span class="affiliation" v-if="item.affiliation.name !== 'NA'">{{item.affiliation.name}}</span>
              </div>
            </el-collapse-item>
            <el-collapse-item title="Keywords" name="3" class="block" v-if="paperVO.authorKeywords||paperVO.IEEETerms||paperVO.controlledTerms||paperVO.nonControlledTerms">
              <div class="author_keywords keywords" v-if="paperVO.authorKeywords&&paperVO.authorKeywords[0]">
                <div class="subtitle">Author Keywords</div>
                <div class="keyword_wrap">
                  <span v-for="keyword in paperVO.authorKeywords" class="keyword" @click="search('Keyword', keyword)">{{keyword}}</span>
                </div>
              </div>
              <div class="IEEE_keywords keywords" v-if="paperVO.ieeeterms&&paperVO.ieeeterms[0]">
                <div class="subtitle">IEEE Keywords</div>
                <div class="keyword_wrap">
                  <span v-for="keyword in paperVO.ieeeterms" class="keyword" @click="search('Keyword', keyword)">{{keyword}}</span>
                </div>
              </div>
              <div class="controlled_terms keywords" v-if="paperVO.controlledTerms&&paperVO.controlledTerms[0]">
                <div class="subtitle">INSPEC: Controlled Indexing</div>
                <div class="keyword_wrap">
                  <span v-for="keyword in paperVO.controlledTerms" class="keyword" @click="search('Keyword', keyword)">{{keyword}}</span>
                </div>
              </div>
              <div class="non_controlled_terms keywords" v-if="paperVO.nonControlledTerms&&paperVO.nonControlledTerms[0]">
                <div class="subtitle">INSPEC: Non-Controlled Indexing</div>
                <div class="keyword_wrap">
                  <span v-for="keyword in paperVO.nonControlledTerms" class="keyword" @click="search('Keyword', keyword)">{{keyword}}</span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import {getPaper} from "../api/api";

    export default {
        name: "Paper",
        data(){
            return{
                id: 0,
                paperVO: {},
                activeCollapse: ['1', '2', '3']
            }
        },
        mounted() {
            let mode = window.location.href.split('id=');
            if (mode.length > 1 && mode[1] !== '') {
                this.id = Number(mode[1]);
            }else{
                this.$router.push('/home');
            }
            getPaper(this.id).then(res => {
                if(res.success){
                    this.paperVO = res.content;
                    window.scrollTo(0,0);
                }else{

                }
            });
        },
        methods: {
            handleChange: function(val) {
                console.log(val);
            },
            search: function (mode, content) {
                sessionStorage.setItem('searchMode', mode);
                sessionStorage.setItem('searchContent', content);
                this.$router.push('/home');
            }
        }
    }
</script>

<style scoped>
  img{
    width:100%
  }
  .body_bottom{
    margin: 20px 50px;
  }
  .body_bottom_body{
    margin: 20px 10% 80px 10%;
    box-shadow: 6px 6px 20px 4px #e4e8ef;
    padding-top: 40px;
  }
  .title{
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    padding: 0 4%;
  }
  .citation_wrap{
    height: 60px;
    margin: 0 50px;
  }
  .citation_box{
    width: 80px;
    height: 50px;
    background-color: #b04c50;
    color: #ffffff;
    margin: 0 10px;
    padding: 10px 0;
    border-radius: 3px;
    float: right;
  }
  .citation_title{
    font-size: 14px;
    font-weight: bold;
  }
  .citation_count{
    font-size: 28px;
  }
  .information{
    margin: 0 5%;
    padding: 20px 0;
  }
  .abstract{
    margin-right: 24px;
  }
  .author_affiliation{
    display: block;
    margin-right: 24px;
    border-bottom: 1px solid #ebeef5;
    padding: 16px 0 0 0;
  }
  .author{
    line-height: 20px;
    font-size: 20px;
    color: #069;
  }
  .author:hover{
    color: #409eff;
  }
  .affiliation{
    font-size: 14px;
    margin-left: 16px;
  }
  .keywords{
    margin-right: 24px;
    border-bottom: 1px solid #ebeef5;
    padding: 6px 0;
  }
  .keyword_wrap{
    display: block;
    text-align: left;
  }
  .keyword{
    margin-right: 14px;
    color: #069;
    font-size: 15px;
  }
  .keyword:hover{
    color: #409eff;
  }
  .block{
    text-align: left;
  }
  .font-medium{
    font-size: 15px;
  }
  .subtitle{
    font-weight: bold;
    font-size: 20px;
   }
  a:visited{
    color: #069;
  }
</style>
