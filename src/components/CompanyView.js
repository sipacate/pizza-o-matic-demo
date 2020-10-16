import React from 'react';
import { toRegionsRatingsList } from '../data/util';
import ChartView from "./ChartView";
import TableView from "./TableView";

const CompanyView = ({ regions, exporterRef, isChartView }) => {
    const data = toRegionsRatingsList(regions);

    const View = isChartView ? ChartView : TableView

    return (
      <View exporterRef={exporterRef} name="Region" data={data} />
    );
  };

  export default CompanyView;