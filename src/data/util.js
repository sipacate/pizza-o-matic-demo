
export const toRatingsAvgs = (ratings = []) => {
    const { length: ratingsCount } = ratings;
    const ratingsSums = ratings.reduce((prevSums, { values }) => {
      Object.entries(values).forEach(([ratingType, rating]) => {
        const prevVal = prevSums[ratingType] ?? 0;
        prevSums[ratingType] = prevVal + rating;
      });
      return prevSums;
    }, {});
    const ratingAvgs = Object.entries(ratingsSums).reduce(
      (prevAvgs, [ratingType, ratingSum]) => {
        prevAvgs[ratingType] = ratingSum / ratingsCount;
        return prevAvgs;
      },
      {}
    );
    return ratingAvgs;
  };

  export const toRestaurantsRatingsList = (restaurants = []) => {
    return restaurants.map(({ ratings, ...restaurantProps }) => {
      const ratingAvgs = toRatingsAvgs(ratings);
      return {
        ...restaurantProps,
        ...ratingAvgs,
      };
    });
  };

  export const toRegionsRatingsList = (regions = []) => {
    return regions.map(({ restaurants, ...regionProps }) => {
      const ratingsAvgs = toRatingsAvgs(
        restaurants.flatMap(({ ratings }) => ratings)
      );
      return {
        ...regionProps,
        ...ratingsAvgs,
      };
    });
  };

  export const toAllRatingsAvgs = (regions = []) => {
    const ratings = regions.flatMap(({ restaurants }) =>
      restaurants.flatMap(({ ratings }) => ratings)
    );
    const ratingsAvgs = toRatingsAvgs(ratings);
    return ratingsAvgs;
  };