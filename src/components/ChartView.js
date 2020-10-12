import React from 'react';
import "hammerjs";
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartLegend,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import { toChartCategories } from "../utils/dataSplitter";

export const ChartView = ({ ratings, region, means }) => {
  const chartCategories = toChartCategories(ratings);
  const seriesItems = means.map(({ name, ratings }) => {
    const spaceStripper = (x) => x.split(" ").join("-");
    const key = `${spaceStripper(region)}-${spaceStripper(name)}`;
    const chartData = Object.values(ratings);
    return <ChartSeriesItem type="column" data={chartData} key={key} />;
  });
  const title = region === 'All Regions' ? 'Average Region Ratings by Category' : `Ratings for ${region} Region Stores`;
  const yAxisTitle = region === 'All Regions' ? 'Average Rating for Region' : 'Store Rating';
  return (
    <Chart>
      <ChartTitle text={title} />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={chartCategories} />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem title={{ text: yAxisTitle }} min={0} max={5} />
      </ChartValueAxis>
      <ChartLegend position="bottom" orientation="horizontal" />
      <ChartSeries>{seriesItems}</ChartSeries>
    </Chart>
  );
};