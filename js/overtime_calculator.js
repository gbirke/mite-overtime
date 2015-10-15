var moment = require('moment');

function OvertimeCalculator() {}

OvertimeCalculator.prototype.getOvertime = function( timeData, minutesPerDay ) {
    var overtime = {
        total: 0,
        weeks: {}
    }, week, day;
    for( week in timeData.weeks ) {
        for( day in timeData.weeks[week].days ) {
            overtime.total += timeData.weeks[week].days[day].total - minutesPerDay;
        }
    }
    return overtime;

}



module.exports = OvertimeCalculator;
