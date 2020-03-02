import axios from 'axios';
// import Cookies from 'js-cookie'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:1111'
  : 'http://localhost:3142';

export const searchPaper = (text, mode, pageNumber, sortMode) => {
  if(text === '1'){
    return [
      {
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        affiliation: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang; H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        affiliation: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      }]
  }else{
    return [
      {
        title: 'Statistical Errors in Software Engineering Experiments: A Preliminary Literature Review',
        author: ['R. P. Reyes Ch.',' O. Dieste',' E. R. Fonseca C.',' N. Juristo'],
        affiliation: ['IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2018 IEEE/ACM 40th International Conference on Software Engineering (ICSE)',
        keywords: ['Literature review', 'Survey', 'Prevalence', 'Statistical errors']
      },
      {
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        affiliation: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang; H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        affiliation: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      },
      {
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        affiliation: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang; H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        affiliation: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      }]
  }

};

export const getRank = (mode, pageNumber, descend, startYear, endYear) => {
  return {
    totalPage: 12,
    rankList: [
      {
        name: '小虎',
        value: 200
      },
      {
        name: '小明',
        value: 198
      },
      {
        name: '小龙',
        value: 170
      },
      {
        name: '小狗',
        value: 169
      },
      {
        name: '小狗',
        value: 167
      },
      {
        name: '小狗',
        value: 160
      },
      {
        name: '小狗',
        value: 155
      },
      {
        name: '小狗',
        value: 145
      },
      {
        name: '小狗',
        value: 130
      },
      {
        name: '小狗',
        value: 129
      }
    ]
  }
};

