var chart = new Highcharts.chart('container', {
    chart: {
        renderTo: 'container',
        margin: 100,
        type: 'area',
        animation: false,
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 30,
            depth: 300,
            height: 1000,
            viewDistance: 5,
            fitToPlot: false,
            frame: {
                bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                side: { size: 1, color: 'rgba(0,0,0,0.06)' }
            }
        }
    },
    title: {
        text: "Székelyföldi átlagok és országos átlag"
    },
    yAxis: {
        min: 5, max : 7,
        tickInterval: 0.3,
        title: {
            text: 'Height Above Sea Level',
        },
        labels: {
            format: '{value:,.3f}'
        },
        gridLineDashStyle: 'Dash'
    },
    xAxis: {
        categories: ['2015','2016','2017','2019','2020'],
        visible: true
    },
    plotOptions: {
        area: {
            depth: 100,
            marker: {
                enabled: false
            },
            states: {
                inactive: {
                    enabled: false
                }
            }
        }
    },
    legend:{
        
    },
    series: [
    {   name: "Harghita megyei átlag",
        lineColor: 'rgb(120,160,180)',
        color: 'rgb(140,180,200)',
        data: [
            ['2015', 6.307],
            ['2016', 5.888],
            ['2017', 6.018],
            ['2019', 6.904],
            ['2020', 6.31]
        ]
    },
    {   name: "Kovászna megyei átlag",
        ineColor: 'rgb(200, 190, 140)',
        color: 'rgb(200, 190, 140)',
        data: [
            ['2015', 6.787],
            ['2016', 6.364],
            ['2017', 6.209],
            ['2019', 5.889],
            ['2020', 6.27]
        ]
    }, 
    {   name: "Maros megyei átlag",
        lineColor: '#0a0908',
        color: '#22333b',
        data: [
            ['2015', 6.71],
            ['2016', 6.28],
            ['2017', 6.593],
            ['2019', 6.091],
            ['2020', 6.378]
        ]
    },
    {
        name: "Országos átlag",
        lineColor: 'rgb(180,90,50)',
        color: 'rgb(200,110,50)',
        data: [
            ['2015', 6.817],
            ['2016', 6.547],
            ['2017', 6.764],
            ['2019', 6.378],
            ['2020', 6.732]
        ]
    }]
});

// Add mouse and touch events for rotation
(function (H) {
    function dragStart(eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.chartX,
            posY = eStart.chartY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            sensitivity = 5,  // lower is more sensitive
            handlers = [];

        function drag(e) {
            // Get e.chartX and e.chartY
            e = chart.pointer.normalize(e);

            chart.update({
                chart: {
                    options3d: {
                        alpha: alpha + (e.chartY - posY) / sensitivity,
                        beta: beta + (posX - e.chartX) / sensitivity
                    }
                }
            }, undefined, undefined, false);
        }

        function unbindAll() {
            handlers.forEach(function (unbind) {
                if (unbind) {
                    unbind();
                }
            });
            handlers.length = 0;
        }

        handlers.push(H.addEvent(document, 'mousemove', drag));
        handlers.push(H.addEvent(document, 'touchmove', drag));


        handlers.push(H.addEvent(document, 'mouseup', unbindAll));
        handlers.push(H.addEvent(document, 'touchend', unbindAll));
    }
    H.addEvent(chart.container, 'mousedown', dragStart);
    H.addEvent(chart.container, 'touchstart', dragStart);
}(Highcharts));