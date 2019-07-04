'use strict';

function timeDifference(date1, date2) {
  const diff = date1.getTime() - date2.getTime();
  // return difference in seconds
  return diff / 1000;
}

module.exports = timeDifference;
