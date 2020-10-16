import React from 'react';
import { toAllRatingsAvgs } from '../data/util';

const CompanyRatings = ({ regions }) => {
  const companyRatings = toAllRatingsAvgs(regions);
  return (
    <div>
      <span className="rating-item">
        Customer: {companyRatings?.customer?.toFixed(1) ?? ''}
      </span>
      <span className="rating-item">
        Staff Satisfaction: {companyRatings?.staff_satisfaction?.toFixed(1) ?? ''}
      </span>
      <span className="rating-item">
        Sales: {companyRatings?.sales?.toFixed(1) ?? ''}
      </span>
      <span className="rating-item">
        Cleanliness: {companyRatings?.cleanliness?.toFixed(1) ?? ''}
      </span>
    </div>
  );
};

export default CompanyRatings;
