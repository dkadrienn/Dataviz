import {data, atlag} from './adatok.js'

var diak;
var megye;


var chart = Highcharts.chart('container',{
    chart:{
        type: 'column',
    },
    title: {
        text: diak + ' kódú diák átlagai',
        align: 'center'
    },
    plotOptions: {
        series: {
            grouping: false,
            borderWidth: 0
        },
    },
    legend: {
        enabled: false
    },
    tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },
    xAxis: {
        type: 'categotry',
        max: 3,
        categories: ['Román', 'Matematika', 'Anyanyelv', 'Össz. átlag'],
        labels:{
            userHTML: true,
            animatie: true
        }
    },
    yAxis: {
        title: {
            text: 'atlagok'
        },
        showFirstLabel: false
    },
    series:[{
        name: 'Megyei atlag',
        color: 'rgb(158, 159, 163)',
        pointPlacement: -0.2,
        linkedTo: 'main',
        data: atlag[megye]
    }, {
        name: 'Egyéni atlag',
        id: 'main',
        dataLabels: [{
            enabled: true,
            inside: true,
            style: {
                fontSize: '16px'
            }
        }],
        data: data[diak]
    }]
})

try{
    kezdes = 1
}
catch{
    chart.setTitle({text: 'Diák keresése'})
}

document.getElementById('button').onclick = function(){
    diak = document.getElementById('name').value;
    megye = document.getElementById('name').value.substr(0,2)
    chart.series[0].update({data: atlag[megye]}, false)
    chart.series[1].update({data: data[diak]}, false)
    chart.redraw()

    try{
        for (const [key, value] of Object.entries(data[diak])) {
            if (value[1] > atlag[megye][key][1]){
                chart.series[1].data[key].update({
                    color: 'rgb(89,230,107)'
                })
            }
            else{
                chart.series[1].data[key].update({
                    color: 'rgb(255,60,60)'
                })
            }
        }
        chart.setTitle({text: diak + ' kódú diák átlagai'})
    }
    catch{
        chart.setTitle({text: diak + ' azonostítójú diák nem létezik'})
    }
    
}