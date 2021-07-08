import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements:{
        point:  {
            radius: 0,
        },
    },
    maintainAspectRadio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem , data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes:[
            {
             type:"time",
             time: {
                format: "MM/DD/YY",
                tooltipFormat:"ll",
            },
        },
    ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
            ticks:{
                callback: function(value, index, values){
                    return numeral(value).format("0a");
                },
            },
            },
        ],
    },
}

function LineGraph({casesType = "cases"}) {
    const [data, setData] = useState({});
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    const buildChartData = (data, casesType= "cases") => {
        let chartData = [];
        let lastDataPoint;
    
        for(let date in data.cases){
            if(lastDataPoint){
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint, //to calculate newcases we use old cases - current cases
                };
                chartData.push(newDataPoint);
            }
                lastDataPoint = data[casesType][date];
        };
        return chartData;
    };

    useEffect(() =>{
        const fetchData = async () => { 
         await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data=> {
            console.log(data);
            const chartData = buildChartData(data, "cases");
            setData(chartData);
        })
    }
    fetchData();
    }, [casesType]);

    return (
        <div>
            <h4>New Cases</h4>
            {data?.length > 0 && (
                  <Line 
                  options={options}
                  data={{
                      datasets: [{
                            backgroundColor: '#e56a6b',
                          data: data,
                      }],
                  }} /> )}
        </div>
    )
};

export default LineGraph;
