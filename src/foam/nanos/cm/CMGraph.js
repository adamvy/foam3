/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.cm',
  name: 'CMGraph',
  extends: 'foam.u2.View',
  documentation: `
    The view model that renders result of a CM to the graph.
  `,

  css: `
    ^warming {
      display: grid;
      place-items: center;
      height: 100%;
    }
  `,

  requires: [
    'foam.graphics.Box',
    'org.chartjs.Line2'
  ],

  imports: [
    'cmDAO'
  ],

  properties: [
    {
      class: 'String',
      name: 'cmId',
      required: true,
      documentation:`
        Reference to the CM by Id.
      `
    },
    {
      class: 'String',
      name: 'type',
      documentation: 'type of graph.'
    },
    {
      name: 'canvas',
      factory: function() {
        return this.Box.create();
      }
    },
    {
      class: 'Map',
      name: 'chartJsConfig'
    }
  ],
  methods: [
    async function render() {
      var self = this;

      let cm = await self.cmDAO.find(self.cmId);
      if ( !cm ) {
        self.addClass(self.myClass('warming'))
          .start('h2')
            .add(`🚫 Can not load CM with id: \`${self.cmId}\``)
          .end();
        return;
      }
      
      let data = await self.buildCharDataSet(cm)
      let plot = await self.generatePlot(data)

      self.addClass(self.myClass('canvas-container'))
        .start('div')
          .add(plot)
        .end();

      //1. show error message if CM not found.
    },

    async function buildCharDataSet(cm) {
      // let labels = {};
      // let datasets = {};
      // let results = cm.rawResults;

      // for ( const c of results ) {
        
      // }
      return {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      }
    },
    async function generatePlot(data) {
      return this.Line2.create({
        data,
        options: {
          legend: {
            display: false,
          },
        }
      })
    }
  ]
})