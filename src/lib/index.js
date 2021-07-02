export const getAvgRating = (ratings) =>
  ratings.reduce((total, { numStars }) => {
    let ret = total;
    ret += numStars;
    return ret;
  }, 0) / ratings.length;
