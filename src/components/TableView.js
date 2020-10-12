import React from "react";
import "hammerjs";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { toChartCategories, toGridData } from "../utils/dataSplitter";

export const TableView = ({ ratings, region, means }) => {
  const chartCategories = toChartCategories(ratings);
  const locality = region === "All Regions" ? "region" : "restaurant";

  const heading = (
    <Column field={locality} title={locality} key={`first-col-${locality}`} />
  );
  const columns = chartCategories.map((category) => {
    const key = `table-column-${category}`;
    return <Column field={category} title={category} key={key} />;
  });

  const headedColumns = [heading, columns];
  const gridData = toGridData(locality, means);
  return <Grid data={gridData}>{headedColumns}</Grid>;
};