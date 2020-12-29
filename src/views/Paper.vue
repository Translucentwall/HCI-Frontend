<template>
  <div>
    <div class="body_top">
      <div class="system-name-wrap">
        <span @click="goHome">OASIS</span>      </div>
    </div>
    <div class="body_bottom">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="'/entity/issue/'+paperVO.conferenceId">
          <span>{{ paperVO.publicationTitle }}</span></el-breadcrumb-item>
        <el-breadcrumb-item>{{ paperVO.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="body_bottom_body">
        <div class="citation_wrap">
          <div class="title-left">
            <span class="title">{{ paperVO.title }}</span>
            <div class="title-button">
              <i class="iconfont icon-yinyong bibtex" @click="copyBibtex(paperVO.id)">复制BibTeX</i>
              <a v-if="paperVO.pdflink" class="iconfont icon-pdf pdf" :href="paperVO.pdflink" target="_blank">PDF</a>
              <a :href="'http://doi.org/' + paperVO.doi" class="el-icon-paperclip doi" target="_blank"
                 v-if="paperVO.doi && paperVO.doi!==''">来源</a>
            </div>
          </div>
          <div class="reference citation_box">
            <div class="citation_title">引用数</div>
            <div class="citation_count">{{ paperVO.referenceCount }}</div>
          </div>
          <div class="citation citation_box">
            <div class="citation_title">被引用数</div>
            <div class="citation_count">{{ paperVO.citationCount }}</div>
          </div>
        </div>
        <div class="information">
          <el-collapse class="no-line" v-model="activeCollapse" @change="handleChange">
            <el-collapse-item title="摘要" name="1" class="block">
              <div class="abstract">
                <div class="summary font-medium" v-if="paperVO.summary">
                  {{ paperVO.summary }}
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="作者" name="2" class="block"
                              v-if="paperVO.author_affiliationVOS&&paperVO.author_affiliationVOS[0]">
              <div class="author_affiliation no-line" v-for="item in paperVO.author_affiliationVOS" v-if="item.author">
                <a class="author" :href="'/entity/author/'+item.authorId">{{ item.author }}</a>
                <a class="affiliation" :href="'/entity/affiliation/'+item.affiliation.id"
                   v-if="item.affiliation.name !== 'NA'">{{ item.affiliation.name }}</a>
              </div>
            </el-collapse-item>
            <el-collapse-item title="研究方向" name="3" class="block"
                              v-if="(paperVO.authorKeywords&&paperVO.authorKeywords[0])||(paperVO.ieeeterms&&paperVO.ieeeterms[0])||(paperVO.controlledTerms&&paperVO.controlledTerms[0])||(paperVO.nonControlledTerms&&paperVO.nonControlledTerms[0])">
              <div class="author_keywords keywords" v-if="paperVO.authorKeywords&&paperVO.authorKeywords[0]">
                <div class="subtitle">作者关键词</div>
                <div class="keyword_wrap">
                  <span v-for="keyword in paperVO.authorKeywords" class="keyword"
                        @click="search(keyword)">{{ keyword }}</span>
                </div>
              </div>
              <div class="IEEE_keywords keywords" v-if="paperVO.ieeeterms&&paperVO.ieeeterms[0]">
                <div class="subtitle">IEEE关键词</div>
                <div class="keyword_wrap">
                  <span v-for="keyword in paperVO.ieeeterms" class="keyword"
                        @click="search(keyword)">{{ keyword }}</span>
                </div>
              </div>
              <div class="controlled_terms keywords" v-if="paperVO.controlledTerms&&paperVO.controlledTerms[0]">
                <div class="subtitle">INSPEC: 受控索引</div>
                <div class="keyword_wrap">
                  <span v-for="keyword in paperVO.controlledTerms" class="keyword"
                        @click="search(keyword)">{{ keyword }}</span>
                </div>
              </div>
              <div class="non_controlled_terms keywords"
                   v-if="paperVO.nonControlledTerms&&paperVO.nonControlledTerms[0]">
                <div class="subtitle">INSPEC: 非受控索引</div>
                <div class="keyword_wrap">
                  <span v-for="keyword in paperVO.nonControlledTerms" class="keyword"
                        @click="search(keyword)">{{ keyword }}</span>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="更多信息" name="4" class="block"
                              v-if="paperVO.publicationTitle||paperVO.publisher||paperVO.pdflink">
              <div class="publication font-medium" v-if="paperVO.publicationTitle">
                <span class="subtitle">刊物:</span>
                <a class="issue" :href="'/entity/issue/'+paperVO.conferenceId">{{ paperVO.publicationTitle }},
                  {{ paperVO.publicationYear }}</a>
              </div>
              <div class="pages font-medium" v-if="paperVO.startPage&&paperVO.endPage">
                <span class="subtitle">页码: </span>{{ paperVO.startPage }} - {{ paperVO.endPage }}
              </div>
              <div class="publisher font-medium" v-if="paperVO.publisher">
                <span class="subtitle">出版商: </span>{{ paperVO.publisher }}
              </div>
              <div class="DOI font-medium" v-if="paperVO.doi">
                <span class="subtitle">DOI: </span>{{ paperVO.doi }}
              </div>
              <!--              <div class="PDFLink font-medium" v-if="paperVO.pdflink">-->
              <!--                <span class="subtitle">PDF链接: </span><a :href="'https://ieeexplore.ieee.org'+paperVO.pdflink">https://ieeexplore.ieee.org{{paperVO.pdflink}}</a>-->
              <!--              </div>-->
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPaper} from "../api/api";
import {encodeBibTexComponent} from "../components/Card";

export default {
  name: "Paper",
  data() {
    return {
      id: 0,
      paperVO: {},
      activeCollapse: ['1', '2', '3', '4']
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id === undefined) {

    } else {
      getPaper(this.id)
        .then(res => {
          if (res.success) {
            this.paperVO = res.content;
            if (this.paperVO.pdflink && this.paperVO.pdflink !== "") {
              let flag = this.paperVO.pdflink.indexOf("https");
              if (flag === -1) {
                this.paperVO.pdflink = "https://ieeexplore.ieee.org" + this.paperVO.pdflink;
              }
            }
            // if(this.paperVO.doi){
            //   this.paperVO.doi="http://doi.org/"+this.paperVO.doi;
            // }
            window.scrollTo(0, 0);
          } else {
            this.$alert('Fail to get paper，please search again', 'Tips', {
              type: 'error',
              confirmButtonText: 'confirm',
              showClose: false
            }).then(() => {
              window.location.href = '/home';
            })
          }
        })
        .catch(() => {
          this.$alert('Fail to get paper，please search again', 'Tips', {
            type: 'error',
            confirmButtonText: 'confirm',
            showClose: false
          }).then(() => {
            window.location.href = '/home';
          })
        })
      ;
    }
  },
  methods: {
    goHome: function(){
      window.location.href = '/home';
    },
    handleChange: function (val) {
      console.log(val);
    },
    search: function (item) {
      let pattern = /<b><span style="color: #b04c50; ">/;
      if (pattern.test(item)) {
        let contentTmp = item.replace(/<b><span style="color: #b04c50; ">/g, '');
        item = contentTmp.replace(/<\/span><\/b>/g, '');
      }
      window.location.href = '/search/Keyword/' + item;
    },
    searchItem: function (item) {
      let pattern = /<b><span style="color: #b04c50; ">/;
      if (pattern.test(item)) {
        let contentTmp = item.replace(/<b><span style="color: #b04c50; ">/g, '');
        item = contentTmp.replace(/<\/span><\/b>/g, '');
      }
      window.location.href = '/search/Keyword/' + item;
    },
    copyBibtex: function (paperID) {
      let paper;
      getPaper(paperID).then(
        res => {
          if (res.success) {
            paper = res.content;
            if (paper === undefined || !paper) {
              this.$notify.warning({
                title: '',
                message: `复制BibTex引用异常，请稍后再试`
              })
              return
            }
            const hasJournal = paper.publicationTitle && paper.publicationTitle !== ''
            const firstAuthor = paper.author_affiliationVOS[0].author;
            const titleWords = paper.title ? paper.title.split(/\s/) : []
            const abbvTitle = [titleWords.shift(), titleWords.shift(), titleWords.shift()]
              .filter(str => !!str)
              .map((str, i) => (i > 0 ? str.substr(0, 1).toUpperCase() : str))
              .join('')
            const idParts = [paper.publicationYear.toString(), abbvTitle]
            if (firstAuthor) {
              idParts.unshift(firstAuthor.replace(/\s+/g, ''))
            }
            const id = idParts
              .map(str => str.replace(/\W/g, ''))
              .join('')
              .substr(0, 45)
            const authors = paper.author_affiliationVOS.map(aa => aa.author).join(' and ')
            const journal = hasJournal
              ? `journal={${encodeBibTexComponent(paper.publicationTitle)}}`
              : undefined
            const year = paper.publicationYear ? `year={${paper.publicationYear}}` : undefined
            const startPage = paper.startPage
            const endPage = paper.endPage
            const pages = startPage && endPage ? `pages={${startPage} \- ${endPage}}` : undefined
            const doi = paper.doi && paper.doi !== '' ? `doi={${paper.doi}}` : undefined
            const fields = [
              `title={${encodeBibTexComponent(paper.title)}}`,
              `author={${encodeBibTexComponent(authors)}}`,
              journal,
              year,
              pages,
              doi
            ].filter(f => !!f)

            const fieldsStr = fields.reduce((str, field) => `${str},\n  ${field || ''}`, '') + '\n'
            const bibtex = `@article{${encodeBibTexComponent(id)}${fieldsStr}}`
            this.writeClipboard(bibtex, 'BibTeX', this)
          }
        }
      ).catch(() => {
      })
    },
    writeClipboard: function (text, format, _this) {
      navigator.clipboard.writeText(text).then(
        function () {
          _this.$notify.info({
            title: '',
            message: `已复制${format}引用到剪贴板`,
            position: "top-left"
          })
        },
        function () {
          _this.$notify.warning({
            title: '',
            message: `复制${format}引用异常，请稍后再试`,
            position: "top-left"
          })
        }
      )
    }
  }
}
</script>

<style scoped>
.body_top {
  width: 100%;
  background-image: url("../assets/teal_cube_background.jpg");
  background-color: #024349;
  background-repeat: no-repeat;
}

.system-name-wrap {
  position: relative;
  width: max-content;
  left: 50px;
  font-family: 'Arial Rounded MT Bold', sans-serif;
  font-size: 40px;
  color: #ffffff;
  cursor: pointer;
}

.body_bottom {
  margin: 20px 50px;
}

.body_bottom_body {
  margin: 20px 10% 80px 10%;
  box-shadow: 6px 6px 20px 4px #e4e8ef;
  padding-top: 40px;
}

.title-left {
  flex: auto;
  display: flex;
  flex-direction: column;
}

.title-button {
  text-align: left;
  padding: 2% 4% 0 4%;
}

.title {
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  padding: 0 4%;
}

.bibtex, .doi {
  color: #224455;
  margin-right: 2%;
  cursor: pointer;
  text-decoration: none;
}

.bibtex:hover, .doi:hover {
  color: #006666;
  text-decoration: underline;
}

.pdf {
  color: #B04C50;
  text-decoration: none;
  margin-right: 2%;
}

.pdf:hover {
  color: #ff6347;
  text-decoration: underline;
}

.citation_wrap {
  display: flex;
  justify-content: space-between;
  margin: 10px 50px 0 0;
}

.citation_box {
  width: 70px;
  height: 100%;
  background-color: #245;
  color: #ffffff;
  margin: 0 0 0 10px;
  padding: 4px 0;
  border-radius: 3px;
  float: right;
  box-sizing: border-box;
  flex-shrink: 0;
}

.citation_title {
  font-size: 0.75rem;
  font-weight: bold;
}

.citation_count {
  font-size: 1.5rem;
}

.information {
  margin: 0 50px 0 5%;
  padding: 20px 0;
}

.abstract {
  /*margin-right: 24px;*/
}

.issue {
  text-decoration: none;
  color: #245;
}

.issue:hover {
  color: #066;
  text-decoration: underline;
}

.author_affiliation {
  display: block;
  margin-right: 24px;
  border-bottom: 1px solid #ebeef5;
  padding: 16px 0 0 0;
}

.author {
  line-height: 20px;
  font-size: 20px;
  color: #245;
  text-decoration: none;
}

.author:hover {
  color: #066;
  text-decoration: underline;
}

.affiliation {
  font-size: 14px;
  margin-left: 16px;
  color: #245;
  text-decoration: none;
}

.affiliation:hover {
  color: #066;
  text-decoration: underline;
}

.keywords {
  margin-right: 24px;
  /*border-bottom: 1px solid #ebeef5;*/
  padding: 6px 0;
}

.keyword_wrap {
  display: block;
  text-align: left;
}

.keyword {
  margin-right: 14px;
  color: #245;
  font-size: 15px;
  cursor: pointer;
}

.keyword:hover {
  color: #066;
  text-decoration: underline;
}

.block {
  text-align: left;
}

.font-medium {
  font-size: 15px;
}

.subtitle {
  font-weight: bold;
  font-size: 20px;
}

.no-line {
  border: none;
}
</style>
