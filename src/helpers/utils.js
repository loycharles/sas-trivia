/**
 * Clear string to generate slug
 * @param  {String} string The original string
 * @return {String}        The generated slug
 */
export const createSlugFromString = (string) => {
  return string
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Sort a array of objects by 'name' property
 * @param  {Array} items The original array of objects to sort
 * @return {Array}       The sorted array of objects
 */
export const sortItemsByName = (items) => {
  return items.sort((a, b) => (a.name > b.name ? 1 : -1));
};

/**
 * Shuffle a array of objects
 * @param  {Array} items The original array of objects to shuffle
 * @return {Array}       The shuffle array of objects
 */
export const shuffleItems = (items) => {
  let i = [...items];
  var currentIndex = i.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = i[currentIndex];
    i[currentIndex] = i[randomIndex];
    i[randomIndex] = temporaryValue;
  }

  return i;
};
