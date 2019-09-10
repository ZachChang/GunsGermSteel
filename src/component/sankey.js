import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
require('highcharts/highcharts-more.js')(ReactHighcharts.Highcharts);
require('highcharts/modules/sankey.js')(ReactHighcharts.Highcharts);
require('highcharts/modules/exporting.js')(ReactHighcharts.Highcharts);

class Sankey extends Component {
  render() {
    const sankeyVal = 5;
    const sankeyData = [
      ['Many suitable wild species', 'Many domesticated plant and animal species', sankeyVal],
      ['Ease of species spreading', 'Many domesticated plant and animal species', sankeyVal],
      ['Many suitable wild species', 'hores', sankeyVal],
      ['Many domesticated plant and animal species', 'Food surpluses, food storage', sankeyVal],
      ['Many domesticated plant and animal species', 'Epidemic diseases', sankeyVal],
      ['Food surpluses, food storage', 'Large, dense, sedentary, stratified societies', sankeyVal],
      ['Large, dense, sedentary, stratified societies', 'Epidemic diseases', 1],
      ['Large, dense, sedentary, stratified societies', 'Political organization, writing', sankeyVal],
      ['Large, dense, sedentary, stratified societies', 'Technology', sankeyVal],
      ['Technology', 'Large, dense, sedentary, stratified societies', 1],
      ['Technology', 'Oceangoing ship', sankeyVal],
      ['Technology', 'Guns, steel swords', sankeyVal],
    ];
    const options = () => ({
      credits: {
        enabled: false
      },
      chart: {
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 100,
        backgroundColor: 'rgba(0,0,0,0)',
        width: 600
      },
      plotOptions: {
        sankey: {
          tooltip: {
            enabled: false
          },
          enableMouseTracking: false,
          dataLabels: {
              enabled: false
          }
        }
      },
      title: {
        text: null
      },
      exporting: {
        enabled: false
      },
      series: [{
          clip: false,
          keys: ['from', 'to', 'weight'],
          data: sankeyData,
          type: 'sankey',
          name: null
      }]
    });
    return (
      <div className='sankey-container'>
        <div className='sankey-text-1'>Many suitable wild species</div>
        <div className='sankey-text-2'>Ease of species spreading</div>
        <div className='sankey-text-3'>Many domesticated plant and animal species</div>
        <div className='sankey-text-4'>hores</div>
        <div className='sankey-text-5'>Food surpluses, food storage</div>
        <div className='sankey-text-6'>Epidemic diseases</div>
        <div className='sankey-text-7'>Large, dense, sedentary, stratified societies</div>
        <div className='sankey-text-8'>Political organization, writing</div>
        <div className='sankey-text-9'>Technology</div>
        <div className='sankey-text-10'>Oceangoing ship</div>
        <div className='sankey-text-11'>Guns, steel swords</div>
        <ReactHighcharts ref="chart" config={options()}></ReactHighcharts>
      </div>
    );
  }
}

export default Sankey;
