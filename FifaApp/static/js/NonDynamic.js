Highcharts.chart('container', {
  chart: {
    type: 'packedbubble',
    height: '40%'
  },
  title: {
    text: 'Top World Wide Players. (Select the bubbles for details)'
  },
  tooltip: {
    useHTML: true,
    pointFormat: '<b>{point.name}:</b> {point.value}'
  },
  plotOptions: {
    packedbubble: {
      minSize: '20%',
      maxSize: '150%',
      zMin: 0,
      zMax: 1000,
      layoutAlgorithm: {
        gravitationalConstant: 0.05,
        splitSeries: true,
        seriesInteraction: false,
        dragBetweenSeries: true,
        parentNodeLimit: true
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        filter: {
          property: 'y',
          operator: '>',
          value: 250
        },
        style: {
          color: 'black',
          textOutline: 'none',
          fontWeight: 'normal'
        }
      }
    }
  },


  series: [{
      name: 'Most Valuable Players (Thousand Eruos)', // Coffee series
      data: [{
          // name property is used for the datalabel
          // value property is used for the volume of the bubble
          value: 565,
          name: 'L. Messi(Argentina)'
      }, {
          value: 455,
          name: 'L. Suárez(Uruguay)'
      }, {
          value: 420,
          name: 'L. Modrić(Croatia)'
      }, {
          value: 405,
          name: 'Cristiano Ronaldo(Portugal)'
      },
      {
          value: 380,
          name: 'Sergio Ramos(Spain)'
      }
  ]
  }, {
      name: 'Most Accurate Players (scale 1-100)', // Coffee series
      data: [{value:94, name:'L. Messi(Argentina)'},
      {value:93, name:'S. Giovinco(Italy)'},
      {value:92, name:'M. Pjanić(Bosnia Herzegovina)'},
      {value:91, name:'E. Bardhi(FYR Macedonia)'},
      {value:90, name:'H. Çalhanoğlu(Turkey)'}
      
  ]
  }, {
      name: 'Best Performers (scale 1-100)', // Coffee series
      data: [
          {value:94, name:'Cristiano Ronaldo(Portugal)'},
          {value:94, name:'L. Messi(Argentina)'},
          {value:92, name:'Neymar Jr(Brazil)'},
          {value:91, name:'Sergio Ramos(Spain)'},
          {value:91, name:'L. Modrić(Croatia)'}
          
  ]
  },
  {
      name: 'Fastest Players (scale 1-100)', // Coffee series
      data: [
          {value:97, name:'Douglas Costa(Brazil)'},
          {value:96, name:'K. Mbappé(France)'},
          {value:95, name:'S. Mané(Senegal)'},
          {value:95, name:'R. Sterling(England)'},
          {value:95, name:'K. Coman(France)'}

          
  ]
  }



]
});