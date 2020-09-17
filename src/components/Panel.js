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
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import 'hammerjs';
import { toRatingsSplitter, toCompanyRatings, toChartCategories, toGridData } from '../tools/dataSplitter';

const toFormattedCategory = category => {
  const upperCaseCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return upperCaseCategory.split('_').join(' ');
};

const TableView = ({ ratings, region, means }) => {
  const chartCategories = toChartCategories(ratings);
  const locality = region === 'All Regions' ? 'region' : 'restaurant';

  const heading = <Column field={locality} title={locality} key={`first-col-${locality}`} />;
  const columns = chartCategories.map(category => {
    const key = `table-column-${category}`
    return <Column field={category} title={category} key={key} />;
  });

  const headedColumns = [heading, columns];

  const gridData = toGridData(locality, means);

  return (
    <Grid data={gridData}>
      {headedColumns}
    </Grid>
  );
};

const toDownloadData = ({ ratings, region, means }) => {
  const locality = region === "All Regions" ? "region" : "restaurant";
  const downloadHeadings = [locality, ...toChartCategories(ratings)].join(',');
  const gridData = toGridData(locality, means);
  const rows = gridData.map(rowData => Object.values(rowData).join(','));
  const downloadBody = `${rows.join('\n')}\n`;
  return `${downloadHeadings}\n${downloadBody}`;
};

const ChartView = ({ ratings, region, means }) => {
  const chartCategories = toChartCategories(ratings);
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

export const Panel = ({ ratings: [_, ...ratings], selectedRatingsId, isChartView, setChartView }) => {

  const localRatings = ratings.find((rating) => rating._id === selectedRatingsId);
  const region = localRatings ? localRatings.name : "All Regions";

  const ratingsSplitter = toRatingsSplitter(ratings);
  const companyRatings = toCompanyRatings(ratings);

  const regionOrStoreMeans = ratingsSplitter(region);

  const SeriesView = isChartView ? ChartView : TableView;

  const onDownload = () => {
    const downloadData = toDownloadData({
      ratings,
      region,
      means: regionOrStoreMeans,
    });
    const dataURI = "data:text/csv;base64," + encodeBase64(downloadData);
    saveAs(dataURI, "pizza_data.csv");
  };

  return (
    <>
      <div className="ratings-header">
        <h2>Company Ratings</h2>
        <CompanyRatings ratings={companyRatings} />
        <span className="buttons-span">
          <img
            src="chart-bar.svg"
            alt="chart view"
            className={isChartView ? "active" : "inactive"}
            onClick={() => setChartView(true)}
          />
          <img
            src="table.svg"
            alt="cell view"
            className={isChartView ? "inactive" : "active"}
            onClick={() => setChartView(false)}
          />
          <img src="download.svg" alt="download" onClick={onDownload} />
        </span>
      </div>
      <SeriesView
        ratings={ratings}
        region={region}
        means={regionOrStoreMeans}
      />
    </>
  );
}

Panel.defaultProps = {
  ratings: [],
  selectedRatingsId: "All Regions",
  isChartView: true,
  setChartView: () => {}
};
