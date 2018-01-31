const moment = require('moment');

var createdAt = moment().valueOf();
var date = moment(createdAt);
console.log(date.format('YYYY MMM Do dddd'));