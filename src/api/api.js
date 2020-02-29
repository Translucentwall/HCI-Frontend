
export const searchPaper = (text, mode, pageNumber, sortMode) => {
  if(text === '1'){
    return [
      {
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        publisher: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang; H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        publisher: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      }]
  }else{
    return [
      {
        title: 'Statistical Errors in Software Engineering Experiments: A Preliminary Literature Review',
        author: ['R. P. Reyes Ch.',' O. Dieste',' E. R. Fonseca C.',' N. Juristo'],
        publisher: ['IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2018 IEEE/ACM 40th International Conference on Software Engineering (ICSE)',
        keywords: ['Literature review', 'Survey', 'Prevalence', 'Statistical errors']
      },
      {
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        publisher: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang; H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        publisher: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      },
      {
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        publisher: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang; H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        publisher: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      }]
  }

};

export const getRank = (mode, pageNumber, descend, startYear, endYear) => {
  return {
    pageNumber: 1,
    rankList: [
      {
        name: '小虎',
        value: 1
      },
      {
        name: '小明',
        value: 2
      },
      {
        name: '小龙',
        value: 3
      },
      {
        name: '小狗',
        value: 4
      }
    ]
  }
};

