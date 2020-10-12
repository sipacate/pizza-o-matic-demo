import React from 'react';
import 'hammerjs';
import { toRatingsSplitter, toCompanyRatings } from '../tools/dataSplitter';

import { CompanyRatings } from './CompanyRatings';
import { TableView } from './TableView';
import { ChartView } from './ChartView';

export const Panel = (props) => {

  const { ratings: [_, ...ratings], selectedRatingsId, isChartView, setChartView } = props;

  const localRatings = ratings.find((rating) => rating._id === selectedRatingsId);
  const region = localRatings ? localRatings.name : "All Regions";

  const ratingsSplitter = toRatingsSplitter(ratings);
  const companyRatings = toCompanyRatings(ratings);

  const regionOrStoreMeans = ratingsSplitter(region);

  const SeriesView = isChartView ? ChartView : TableView;

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
          <img
            src="download.svg"
            alt="download"
            onClick={() => {}}
          />
        </span>
      </div>
      <SeriesView
        ratings={ratings}
        region={region}
        means={regionOrStoreMeans}
      />
    </>
  );
};

Panel.defaultProps = {
  ratings: [],
  selectedRatingsId: "All Regions",
  isChartView: true,
  setChartView: () => {}
};
