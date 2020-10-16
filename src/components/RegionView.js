import React from 'react';
import { toRestaurantsRatingsList } from '../data/util';
import ChartView from './ChartView';
import TableView from './TableView';

const RegionView = ({ regions, regionId, exporterRef, isChartView }) => {
  const data = toRestaurantsRatingsList(
    regions.find((rating) => rating.id === regionId)?.restaurants
  );

  const View = isChartView ? ChartView : TableView;

  return <View exporterRef={exporterRef} name="Restaurant" data={data} />;
};

export default RegionView;
