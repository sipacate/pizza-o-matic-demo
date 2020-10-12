import React from "react";
import "hammerjs";

const toFormattedCategory = (category) => {
  const upperCaseCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  return upperCaseCategory.split("_").join(" ");
};

export const CompanyRatings = ({ ratings }) => {
  const ratingCategories = Object.keys(ratings);

  const ratingsElements = ratingCategories.map((category) => {
    const score = ratings[category];
    return (
      <li className="flex-item" key={score}>
        {toFormattedCategory(category)}: {score.toFixed(1)}
      </li>
    );
  });

  return <ul className="flex-container">{ratingsElements}</ul>;
};
