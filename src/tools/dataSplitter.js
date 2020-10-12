const pluck = (...keys) => (data) => {
  return keys.reduce((subData, key) => {
    return subData === undefined ? subData : subData[key];
  }, data);
};
const unique = xs => xs.reduce((prevXs, x) => {
  return prevXs.includes(x) ? [...prevXs] : [...prevXs, x];
}, []);
const sum = xs => xs.reduce((acc, curr) => acc + curr, 0);
const mean = xs => sum(xs) / xs.length;
const compose = (a,b) => x => a(b(x));

const duplicates = list => {
  return list.reduce((acc, name, ix, src) => {
    const prevNames = src.slice(0, ix);
    const isDuplicate = prevNames.includes(name);
    return isDuplicate ? [...acc, name] : acc;
  }, []);
};

const toCategoricalMeans = (categories, xs) => {
  return categories.reduce((categoricalMeans, category) => {
    const pluckParsed = compose(Number, pluck(category));
    const categoryRatings = xs.map(pluckParsed);
    return {
      ...categoricalMeans,
      [category]: mean(categoryRatings)
    };
  }, {});
};

const toRestaurantsByRegion = ratings => {
  const regionNames = ratings.map(pluck('name'));
  return regionNames.reduce((acc,regionName) => {
    const [ restaurants ] = ratings.filter(({ name }) => name === regionName);
    return [
      ...acc,
      { 
        name: regionName, 
        restaurants: pluck('restaurants')(restaurants)
      }
    ];
  }, []);
};

const toRatingsByRegion = restaurants => {
  return restaurants.map(({ name, restaurants } ) => {
    const restaurantRatings = restaurants.map(pluck('ratings')).flat();
    const restaurantValues = restaurantRatings.map(pluck('values'));
    return { name, ratings: restaurantValues };
  });
};

const toMeanRatings = (ratings, localizedRatings) => {
  const ratingCategories = toChartCategories(ratings);
  const regionMeans = localizedRatings.map(({ name, ratings }) => {
    const categoricalMeans = toCategoricalMeans(ratingCategories, ratings);
    return { name, ratings: categoricalMeans };
  });
  return regionMeans;
};

const toRatingsByRestaurant = (restaurants) => {
  return restaurants.map(({ name, ratings}) => {
    const allRatings = ratings.map(pluck('values'));
    return { name, ratings: allRatings };
  });
};

const allRegionsSplitter = (ratings) => {

  const regionRestaurants = toRestaurantsByRegion(ratings);
  const regionRatings = toRatingsByRegion(regionRestaurants);
  const regionMeans = toMeanRatings(ratings, regionRatings);

  return regionMeans;
};

const toUnifiedDuplicateStore = (ratings) => {
  const ratingCategories = toChartCategories(ratings);
  return duplicateStore => {
    const [{ name }] = duplicateStore
    const ratings = duplicateStore.map(pluck('ratings'));
    const means = toCategoricalMeans(ratingCategories, ratings);
    return {
      name,
      ratings: means
    };
  };
};

const toMergedDuplicateRestaurants = (means, ratings) => {
  const restaurantNames = means.map(pluck('name'));

  const duplicateNames = duplicates(restaurantNames);
  const duplicateStores = duplicateNames.map(name => {
    const matchedStores = means.filter(store => {
      return store.name === name;
    });
    return matchedStores;
  });

  const unifiedStores = duplicateStores.map(toUnifiedDuplicateStore(ratings));

  const uniqueRestaurantNames = unique(restaurantNames);

  const nonDuplicateMeans = uniqueRestaurantNames.map(restaurantName => {
    const replacement = unifiedStores.find(({ name }) => name === restaurantName);
    const original = means.find(({ name }) => name === restaurantName);
    return replacement || original;
  });

  return nonDuplicateMeans;
};

const regionSplitter = (ratings) => (region) => {

  const [{ restaurants }] = ratings.filter(({ name }) => region === name);
  const restaurantRatings = toRatingsByRestaurant(restaurants);
  const restaurantMeans = toMeanRatings(ratings, restaurantRatings);

  const nonDuplicateMeans = toMergedDuplicateRestaurants(restaurantMeans, ratings);
  
  return nonDuplicateMeans;
};

export const toRatingsSplitter = (ratings) => (region) => {
  if (region === 'All Regions') return allRegionsSplitter(ratings);
  return regionSplitter(ratings)(region);
};

export const toCompanyRatings = (ratings) => {

  const ratingCategories = toChartCategories(ratings);
  const regionMeans = allRegionsSplitter(ratings);
  const regionRatings = regionMeans.map(pluck('ratings'));
  const categoricalMeans = toCategoricalMeans(ratingCategories, regionRatings);

  return categoricalMeans;
};

export const toChartCategories = (ratings) => {

  const regionRestaurants = toRestaurantsByRegion(ratings);
  const regionRatings = toRatingsByRegion(regionRestaurants);
  const allRatings = regionRatings.map(pluck('ratings')).flat();
  const allRatingCategories = allRatings.map(Object.keys).flat();

  return unique(allRatingCategories);
};

export const toGridData = (locality, means) => {
  return means.map(({ name, ratings }) => {
    const roundedRatings = Object.keys(ratings).reduce((rounded, category) => {
      return {
        ...rounded,
        [category]: ratings[category].toFixed(2)
      };
    }, { [locality]: name });
    return roundedRatings;
  });
};