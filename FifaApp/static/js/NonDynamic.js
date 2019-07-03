Highcharts.chart('container', {
    chart: {
      type: 'packedbubble',
      height: '40%'
    },
    title: {
      text: 'Only nine countries have ever won the World Cup. (Select the bubbles for details)'
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} times'
    },
    plotOptions: {
      packedbubble: {
        minSize: '20%',
        maxSize: '500%',
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
      name: 'Winners',
      data: [{
        name: 'Germany',
        value: 1
      }, {
        name: 'Spain',
        value: 1
      },
      {
        name: "England",
        value: 1
      },
      {
        name: "Argentina",
        value: 2
      },
      {
        name: "France",
        value: 2
      },
      {
        name: "Uruguay",
        value: 2
      },
      {
        name: "West Germany",
        value: 3
      },
      {
        name: "Italy",
        value: 4
      },
      {
        name: "Brazil",
        value: 5
      }
      ]
    }, {
      name: 'Runner-Ups',
      data: [{
        name: "Germany",
        value: 1
      },
      {
        name: "France",
        value: 1
      },
      {
        name: "Sweden",
        value: 1
      },
      {
        name: "Croatia",
        value: 1
      },
      {
        name: "Brazil",
        value: 2
      },
      {
        name: "Hungary",
        value: 2
      },
      {
        name: "Czech Republic",
        value: 2
      },
      {
        name: "Italy",
        value: 2
      },
      {
        name: "Argentina",
        value: 3
      },
      {
        name: "Netherlands",
        value: 3
      },
      {
        name: "West Germany",
        value: 3
      
      }]
    }]
  });
  