<template>
  <div class="card">
    <div class="card-tool-bar-wrap">
      <div class="card-tool-bar">
        <div class="tool-export" @click="copyBibtex(simplePaperVO.id)">
          <span>BibTeX<i class="iconfont icon-yinyong" style="color: #245; font-size: initial"/></span>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="title-wrap">
        <a class="title" :href="'/paper/'+simplePaperVO.id" v-html="simplePaperVO.title"></a>
      </div>
      <div class="author-affiliation-wrap"
           v-if="simplePaperVO.author_simpleAffiliationVOS&&simplePaperVO.author_simpleAffiliationVOS[0]&&simplePaperVO.author_simpleAffiliationVOS[0].author!==''">
        <div v-for="(item,index) in simplePaperVO.author_simpleAffiliationVOS" class="author-affiliation">
          <a class="author" :href="'/entity/author/'+item.authorId" v-html="item.author"></a>
          <span v-if="index<simplePaperVO.author_simpleAffiliationVOS.length-1">;</span>
        </div>
      </div>
      <div class="publication-wrap" v-if="simplePaperVO.publicationTitle">
        <span>发表于 </span>
        <a class="publication" :href="'/entity/issue/'+simplePaperVO.conferenceId"
           v-html="simplePaperVO.publicationTitle">
          <!--          <span v-html="simplePaperVO.publicationTitle"></span>-->
        </a>
      </div>
      <div class="keyword-wrap" v-if="simplePaperVO.keywords&&simplePaperVO.keywords[0]">
        <span v-for="(word,index) in simplePaperVO.keywords" v-if="index < 5">
          <a class="keyword" v-html="word"></a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {getPaper} from "../api/api";

export default {
  name: 'Card',
  data() {
    return {}
  },
  props: {
    simplePaperVO: {
      type: Object,
      default: {}
    }
  },
  methods: {
    BibTexSpecialChars: function () {
      return [
        ['{', '\\{'],
        ['}', '\\}'],
        ['$', '\\$'],
        ['Ä', '{\\"A}'],
        ['ä', '{\\"a}'],
        ['Ë', '{\\"E}'],
        ['ë', '{\\"e}'],
        ['Ï', '{\\"I}'],
        ['ï', '{\\"i}'],
        ['Ö', '{\\"O}'],
        ['ö', '{\\"o}'],
        ['Ü', '{\\"U}'],
        ['ü', '{\\"u}'],
        ['Ÿ', '{\\"Y}'],
        ['ÿ', '{\\"y}'],
        ['ß', '{\\ss}'],
        ['Ø', '{\\O}'],
        ['ø', '{\\o}'],
        ['Á', "{\\'A}"],
        ['á', "{\\'a}"],
        ['Ć', "{\\'C}"],
        ['ć', "{\\'c}"],
        ['É', "{\\'E}"],
        ['é', "{\\'e}"],
        ['Í', "{\\'I}"],
        ['í', "{\\'i}"],
        ['Ó', "{\\'O}"],
        ['ó', "{\\'o}"],
        ['Ú', "{\\'U}"],
        ['ú', "{\\'u}"],
        ['Ý', "{\\'Y}"],
        ['ý', "{\\'y}"],
        ['À', '{\\`A}'],
        ['à', '{\\`a}'],
        ['È', '{\\`E}'],
        ['è', '{\\`e}'],
        ['Ì', '{\\`I}'],
        ['ì', '{\\`i}'],
        ['Ò', '{\\`O}'],
        ['ò', '{\\`o}'],
        ['Ù', '{\\`U}'],
        ['ù', '{\\`u}'],
        ['Â', '{\\^A}'],
        ['â', '{\\^a}'],
        ['Ê', '{\\^E}'],
        ['ê', '{\\^e}'],
        ['Î', '{\\^I}'],
        ['î', '{\\^i}'],
        ['Ô', '{\\^O}'],
        ['ô', '{\\^o}'],
        ['Û', '{\\^u}'],
        ['û', '{\\^u}'],
        ['Ã', '{\\~A}'],
        ['ã', '{\\~a}'],
        ['Ñ', '{\\~N}'],
        ['ñ', '{\\~n}'],
        ['Õ', '{\\~O}'],
        ['õ', '{\\~o}'],
        ['Æ', '{\\aE}'],
        ['æ', '{\\ae}'],
        ['Œ', '{\\OE}'],
        ['æ', '{\\oe}'],
        ['Č', '{\\vC}'],
        ['č', '{\\vc}'],
        ['Š', '{\\vS}'],
        ['š', '{\\vs}'],
        ['ž', '{\\vz}'],
        ['Å', '{\\AA}'],
        ['å', '{\\aa}'],
      ]
    },
    searchItem: function (item) {
      let pattern = /<b><span style="color: #b04c50; ">/;
      if (pattern.test(item)) {
        let contentTmp = item.replace(/<b><span style="color: #b04c50; ">/g, '');
        item = contentTmp.replace(/<\/span><\/b>/g, '');
      }
      window.location.href = '/search/Keyword/' + item;
    },
    encodeBibTexComponent: function (str) {
      return this.BibTexSpecialChars().reduce((curStr, [character, replacement]) => {
        return curStr.replace(new RegExp(`[${character}]`, 'g'), replacement);
      }, str + '');
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
              ? `journal={${this.encodeBibTexComponent(paper.publicationTitle)}}`
              : undefined
            const year = paper.publicationYear ? `year={${paper.publicationYear}}` : undefined
            const startPage = paper.startPage
            const endPage = paper.endPage
            const pages = startPage && endPage ? `pages={${startPage} \- ${endPage}}` : undefined
            const doi = paper.doi && paper.doi !== '' ? `doi={${paper.doi}}` : undefined
            const fields = [
              `title={${this.encodeBibTexComponent(paper.title)}}`,
              `author={${this.encodeBibTexComponent(authors)}}`,
              journal,
              year,
              pages,
              doi
            ].filter(f => !!f)

            const fieldsStr = fields.reduce((str, field) => `${str},\n  ${field || ''}`, '') + '\n'
            const bibtex = `@article{${this.encodeBibTexComponent(id)}${fieldsStr}}`
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
            position:"top-left"
          })
        },
        function () {
          _this.$notify.warning({
            title: '',
            message: `复制${format}引用异常，请稍后再试`,
            position:"top-left"
          })
        }
      )
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;

  background-color: white;
  margin: 0 0 20px;
  /*box-shadow: 0 1px 0 #aaaaaa;*/
  text-align: left;
  padding: 0 20px 0 0;
}

.card-tool-bar-wrap {
  width: calc(35px + 2rem);
  padding: 3px 0;
  flex-shrink: 0;
}

.card-tool-bar {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: right;
}

.card-tool-bar > div {
  background: transparent;
  padding: 4px 0 3px 0.25rem;
  /*border-bottom: 1px solid #c4c7ce;*/
  border-left: 2px solid #245;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  flex-grow: 1;
  color: transparent;
  font-size: 0.75rem;
}

.card-tool-bar > div:hover {
  background: #c4c7ce;
  color: inherit;
}

.card-content {
  padding-left: 0.75rem;
}

.title {
  /*color: #069;*/
  color: #245;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
}

.title:hover {
  /*color: #409eff;*/
  color: #066;
  text-decoration: underline;
}

.author-affiliation-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 0 12px;
}

.author-affiliation {
  margin-right: 10px;
}

.author {
  color: #245;
  text-decoration: none;
}

.author:hover {
  color: #066;
  text-decoration: underline;
}

.publication-wrap {
  padding: 0 12px;
}

.publication {
  color: #245;
  text-decoration: none;
}

.publication:hover {
  color: #066;
  text-decoration: underline;
}

.keyword-wrap {
  /*cursor: pointer;*/
  padding: 0 12px;
}

.keyword {
  pointer-events: none;
  margin-right: 20px;
  color: #222;
}

.keyword:hover {
  color: #066;
  text-decoration: underline;
}
</style>
<style>
b.search-highlight {
  color: #ff6347;
}
</style>
