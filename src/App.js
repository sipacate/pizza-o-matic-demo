import React from 'react';
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartLegend,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";
import './App.css';

function App() {
  return (
    <>
      <Chart>
        <ChartTitle text={"Test Chart Title"} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={["category1", "category2", "category3"]}
          />
        </ChartCategoryAxis>
        <ChartLegend position="bottom" orientation="horizontal" />
        <ChartSeries>
          <ChartSeriesItem
            type="column"
            data={[1, 1, 1]}
          />
          <ChartSeriesItem
            type="column"
            data={[2, 2, 2]}
          />
          <ChartSeriesItem
            type="column"
            data={[3, 3, 3]}
          />
        </ChartSeries>
      </Chart>
    </>
  );
}

export default App;