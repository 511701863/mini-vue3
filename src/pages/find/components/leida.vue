option = {
  radar: {
    axisName:{
      fontSize:'40px',
      fontWeight:600,
      color:'black'
    },
    indicator: [
      { name: '空间', max: 10 },
      { name: '驾驶感受', max: 10 },
      { name: '外观 ', max: 10 },
      { name: '内饰 ', max: 10 },
      { name: '服务', max: 10 },
      { name: '油耗', max: 10 }
    ],
    shape:'circle',
    splitNumber:0,
    splitArea:{
      areaStyle:{
        color:'rgba(0, 0, 0, 0.04)'
      }
    },

  },
  series: [
    {
      name: '123',
      type: 'radar',
      data: [
        {
          value: [5, 5.5, 6, 4, 6, 8],
          name: 'Allocated Budget'
        }
      ],
      color:'#DFA248',
      areaStyle:{
        color:'rgba(223, 162, 72, 0.3)'
      }
    }
  ]
};
