export const searchPaper = (text, mode, pageNumber, sortMode) => {
  if(text === '1'){
    return [
      {
        id: 2,
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        affiliation: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        id: 3,
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang; H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        affiliation: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      }]
  }else{
    return [
      {
        id: 1,
        title: 'Statistical Errors in Software Engineering Experiments: A Preliminary Literature Review',
        author: ['R. P. Reyes Ch.',' O. Dieste',' E. R. Fonseca C.',' N. Juristo'],
        affiliation: ['IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2018 IEEE/ACM 40th International Conference on Software Engineering (ICSE)',
        keywords: ['Literature review', 'Survey', 'Prevalence', 'Statistical errors']
      },
      {
        id: 2,
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        affiliation: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        id: 3,
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang',' H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        affiliation: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      },
      {
        id: 2,
        title: '3rd FME Workshop on Formal Methods in Software Engineering (FormaliSE 2015)',
        author: ['S. Gnesi',' N. Plat'],
        affiliation: ['IEEE', 'IEEE'],
        publication: '2015 IEEE/ACM 37th IEEE International Conference on Software Engineering',
        keywords: ['Formal methods', 'Software engineering']
      },
      {
        id: 3,
        title: 'A Novel Neural Source Code Representation Based on Abstract Syntax Tree',
        author: ['J. Zhang',' X. Wang; H. Zhang',' H. Sun',' K. Wang',' X. Liu'],
        affiliation: ['IEEE', 'IEEE', 'IEEE', 'IEEE', 'IEEE'],
        publication: '2019 IEEE/ACM 41st International Conference on Software Engineering (ICSE)',
        keywords: ['Abstract Syntax Tree',' source code representation',' neural network',' code classification',' code clone detection']
      }]
  }

};

export const getRank = (mode, pageNumber, descend, startYear, endYear) => {
  if(descend){
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
  }else{
    return {
      totalPage: 12,
      rankList: [
        {
          name: '小虎',
          value: 129
        },
        {
          name: '小明',
          value: 130
        },
        {
          name: '小龙',
          value: 145
        },
        {
          name: '小狗',
          value: 155
        },
        {
          name: '小狗',
          value: 160
        },
        {
          name: '小狗',
          value: 167
        },
        {
          name: '小狗',
          value: 169
        },
        {
          name: '小狗',
          value: 170
        },
        {
          name: '小狗',
          value: 198
        },
        {
          name: '小狗',
          value: 200
        }
      ]
    }
  }
};

export const getGraph = (id, type)=>{
  return{
    centerId: 1,
    nodes: [
      {id:1, name: '王长贵', type:1},
      {id:1, name: '王大拿', type:2},
      {id:1, name: '谢小梅', type:3},
      {id:2, name: '谢广坤', type:1},
      {id:2, name: '刘能', type:2},
      {id:3, name: '赵四', type:1},
      {id:4, name: '刘大脑袋', type:1},
      {id:2, name: '赵玉田', type:3},
      {id:5, name: '刘英', type:1},
      {id:3, name: '王老七', type:3},
      {id:6, name: '王小蒙', type:1},
      {id:7, name: '谢大脚', type:1},
      {id:8, name: '谢永强', type:1}
    ],
    links: [
      {source: 0, target: 1, relation: '两口子'},
      {source: 0, target: 2, relation: '曾爱慕'},
      {source: 0, target: 3, relation: '亲戚'},
      {source: 0, target: 4, relation: '曾爱慕'},
      {source: 2, target: 7, relation: '上下属'},
      {source: 4, target: 5, relation: '死对头'},
      {source: 4, target: 10, relation: '亲家'},
      {source: 5, target: 9, relation: '父女'},
      {source: 5, target: 6, relation: '亲家'},
      {source: 10, target: 11, relation: '妇女'},
      {source: 11, target: 12, relation: '两口子'},
      {source: 4, target: 12, relation: '父子'},
      {source: 8, target: 9, relation: '两口子'}
    ]
  }
};

export const getPaper = (id) =>{
  return{
    id: id,
    title: 'Statistical Errors in Software Engineering Experiments: A Preliminary Literature Review',
    author_affiliation: [{
        author: 'R. P. Reyes Ch.',
        affiliation: 'Univ. Politec. de Madrid, Madrid, Spain'
      },
      {
        author: 'O. Dieste',
        affiliation: 'Univ. Politec. de Madrid, Madrid, Spain'
      },
      {
        author: 'E. R. Fonseca C.',
        affiliation: 'NA'
      },
      {
        author: 'N. Juristo',
        affiliation: 'Univ. Politec. de Madrid, Madrid, Spain'
      }],
    publication: '2018 IEEE/ACM 40th International Conference on Software Engineering (ICSE)',
    year: 2018,
    startPage: 1195,
    endPage: 1206,
    summary: 'Background: Statistical concepts and techniques are often applied incorrectly, even in mature disciplines such as medicine or psychology. Surprisingly, there are very few works that study statistical problems in software engineering (SE). Aim: Assess the existence of statistical errors in SE experiments. Method: Compile the most common statistical errors in experimental disciplines. Survey experiments published in ICSE to assess whether errors occur in high quality SE publications. Results: The same errors as identified in others disciplines were found in ICSE experiments, where 30 of the reviewed papers included several error types such as: a) missing statistical hypotheses, b) missing sample size calculation, c) failure to assess statistical test assumptions, and d) uncorrected multiple testing. This rather large error rate is greater for research papers where experiments are confined to the validation section. The origin of the errors can be traced back to: a) researchers not having sufficient statistical training, and b) a profusion of exploratory research. Conclusions: This paper provides preliminary evidence that SE research suffers from the same statistical problems as other experimental disciplines. However, the SE community appears to be unaware of any shortcomings in its experiments, whereas other disciplines work hard to avoid these threats. Further research is necessary to find the underlying causes and set up corrective measures, but there are some potentially effective actions and are a priori easy to implement: a) improve the statistical training of SE researchers, and b) enforce quality assessment and reporting guidelines in SE publications.',
    DOI: '10.1145/3180155.3180161',
    PDFLink: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=8453201',
    authorKeywords: ['Literature review', 'Survey', 'Prevalence', 'Statistical errors'],
    IEEETerms: ['Software engineering', 'Bibliographies', 'Training', 'Guidelines', 'Error analysis', 'Back'],
    controlledTerms: ['psychology', 'research and development', 'software engineering', 'statistical testing'],
    nonControlledTerms: ['software engineering experiments', 'SE experiments', 'high quality SE publications', 'ICSE experiments', 'statistical hypotheses', 'statistical test assumptions', 'SE community', 'SE researchers', 'quality assessment', 'statistical errors', 'statistical training', 'SE research'],
    citationCount: 1,
    referenceCount: 75,
    publisher: 'IEEE',
    identifier: 'IEEE Conferences'
  }
};

export const getAcademicEntity = (id, type)=>{
  return{
    type: 1,
    id: 1111,
    name: 'nju',
    refsum:1000,
    authors:
      [{type: 1, id:0, name:'A'},
      {type: 1, id:1, name:'B'},
      {type: 1, id:2, name:'C'},
      {type: 1, id:3, name:'D'}]
    ,
    affilications:
      [{type:2,id:0,name:'Univ. Politec. de Madrid, Madrid, Spain'},
      {type:2,id:1,name:'IEEE'},
      {type:2,id:2,name:'ABC'},
      {type:2,id:3,name:'DEF'}]
    ,
    conferences:
      [{type:3,id:0,name:'C1'},
      {type:3,id:1,name:'C2'},
      {type:3,id:2,name:'C3'}
      ]
    ,
    terms:['t1','t2','t3','t4'],
    significantPapers:[
      { id:0,
        title:'p1',
        author_simpleAffiliationVOS:[{author:'A0',affilication:'ABC'},{author:'B0',affilication: 'ABC'}],
        publicationTitle:'p1.1',
        publicationYear:'2019-2-3',
        keywords:['t1','t2','t3']
      },
      { id:1,
        title:'p2',
        author_simpleAffiliationVOS:[{author:'A1',affilication:'ABC'},{author:'B1',affilication: 'ABC'}],
        publicationTitle:'p1.2',
        publicationYear:'2019-1-1',
        keywords:['t1','t2','t3']
      },
      { id:2,
        title:'p3',
        author_simpleAffiliationVOS:[{author:'A2',affilication:'ABC'},{author:'B2',affilication: 'ABC'}],
        publicationTitle:'p1.3',
        publicationYear:'2019-1-3',
        keywords:['t1','t2','t3']
      },
      { id:3,
        title:'p4',
        author_simpleAffiliationVOS:[{author:'A3',affilication:'ABC'},{author:'B3',affilication: 'ABC'}],
        publicationTitle:'p1.4',
        publicationYear:'2019-1-4',
        keywords:['t1','t2','t3']
      }
    ]
  }
};
