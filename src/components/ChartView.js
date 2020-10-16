import React from 'react';
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartLegend,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from '@progress/kendo-react-charts';

const ChartView = ({ name, data }) => {
  const seriesItems = data.map(({ name, id, ...ratingsProps }) => {
    const ratings = Object.values(ratingsProps);
    return <ChartSeriesItem type="column" data={ratings} key={id} />;
  });
  return (
    <Chart>
      <ChartTitle text={name} />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          categories={[
            'Customer',
            'Staff Satisfaction',
            'Sales',
            'Cleanliness',
          ]}
        />
      </ChartCategoryAxis>
      <ChartLegend position="bottom" orientation="horizontal" />
      <ChartSeries>{seriesItems}</ChartSeries>
    </Chart>
  );
};

export default ChartView;
