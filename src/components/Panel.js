import React, { useState } from 'react';
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartLegend,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from '@progress/kendo-react-charts';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import 'hammerjs';
import { toRatingsSplitter, toCompanyRatings, toChartCategories, toGridData } from '../tools/dataSplitter';

import ratings from '../data/pizza-store-data.json';

const ratingsSplitter = toRatingsSplitter(ratings);
const chartCategories = toChartCategories(ratings);
const companyRatings = toCompanyRatings(ratings);

const toFormattedCategory = category => {
  const upperCaseCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return upperCaseCategory.split('_').join(' ');
};

const toTableSeries = region => {
  const locality = region === 'All Regions' ? 'Region' : 'Restaurant';
  const seedElement = <Column field={locality} title={locality} key={`first-col-${locality}`} />;
  
  return means => {
    const columns = chartCategories.reduce((acc, category) => {
      const key = `table-column-${category}`
      return [...acc, <Column field={category} title={category} key={key} />];
    }, [seedElement]);

    const gridData = toGridData(locality, means);

    return (
      <Grid data={gridData}>
        {columns}
      </Grid>
    );
  };
};

const toChartSeries = region => {
  return means => {
    const seriesItems = means.map(({ name, ratings }) => {
      const spaceStripper = x => x.split(' ').join('-');
      const key = `${spaceStripper(region)}-${spaceStripper(name)}`;
      const chartData = Object.values(ratings);
      return <ChartSeriesItem type="column" data={chartData} key={key} />;
    });
    return (
      <Chart>
        <ChartTitle text={region} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={chartCategories} />
        </ChartCategoryAxis>
        <ChartLegend position="bottom" orientation="horizontal" />
          <ChartSeries>
            {seriesItems}
          </ChartSeries>
      </Chart>
    );
  };
};

const CompanyRatings = ({ ratings }) => {

  const ratingCategories = Object.keys(ratings);

  const ratingsElements = ratingCategories.map((category) => {
    const score = ratings[category];
    return (<li className="flex-item" key={score}>
      {toFormattedCategory(category)}: {score.toFixed(1)}
    </li>);
  });

  return (
    <ul className="flex-container">
      {ratingsElements}
    </ul>
  );
};

export const Panel = ({ region }) => {

  const [ chartView, setChartView ] = useState(true);

  const regionOrStoreMeans = ratingsSplitter(region);

  const chartSeries = toChartSeries(region)(regionOrStoreMeans);
  const tableSeries = toTableSeries(region)(regionOrStoreMeans);

  return (
    <>
      <div className="ratings-header">
        <h2>Company Ratings</h2>
        <CompanyRatings ratings={companyRatings}/>
        <span className="buttons-span">
          <img 
            src="chart-bar.svg" 
            alt="chart view"
            className={chartView ? "active" : "inactive"}
            onClick={() => setChartView(true)}
          />
          <img 
            src="table.svg" 
            alt="cell view"
            className={chartView ? "inactive" : "active"}
            onClick={() => setChartView(false)}
          />
          <img 
            src="download.svg" 
            alt="download"
          />
        </span>
      </div>

      {chartView && (<>{chartSeries}</>)}
      {!chartView && (<>{tableSeries}</>)}

    </>
  )
}
