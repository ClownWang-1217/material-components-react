

/**
 * 获取年月日按照('YYYY-MM-DD')显示
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @returns {string}
 */
export function getDateFormat(year, month, day) {
  var pad = function pad(n) {
    return n < 10 ? '0' + n : n;
  };
  var dateStr = year + '年' + pad(month + 1) + '月' + pad(day);
  return dateStr;
}

/**
 * 获取某年某月的总天数
 * @param {number} year 
 * @param {number} month 
 * @returns {number}
 */
export function getDayCount(year = new Date().getFullYear(), month = (new Date().getMonth() + 1)) {
  return new Date(year, month, 0).getDate();
}

/**
 * 根据年月日获取星期几
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @returns {number}
 */
export function getOneDay(year, month, day) {
  var date = new Date();
  date.setFullYear(year, month, day);
  var week = date.getDay()
   if (week === 0) {
     return 7;
   }
  return week;
}
