var expect = require( 'chai' ).expect,
	WeeklyOvertimeCalculator = require( '../js/weekly_overtime_calculator' );

describe( 'WeeklyOvertimeCalculator', function () {

	describe( '#getOvertime, happy cases', function () {

		var testData = {
			year: 2015,
			month: 9,
			weeks: {
				42: {
					total: 1040,
					days: {
						13: { total: 500 }, // 8 hours 20 minutes
						14: { total: 540 } // 9 hours
					}
				},
				43: {
					total: 905,
					days: {
						20: { total: 425 }, // 7 hours, 5 Minutes
						21: { total: 480 } // 8 hours
					}
				}
			}
		};

		it( 'calculates total overtime', function () {
			var hoursPerWeek = 16,
				calulcator = new WeeklyOvertimeCalculator(),
				result = calulcator.getOvertime( testData, hoursPerWeek );
			expect( result.total ).to.equal( 25 );
		} );

		it( 'calculates weekly overtime', function () {
			var hoursPerWeek = 16,
				calulcator = new WeeklyOvertimeCalculator(),
				result = calulcator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 42 ].total ).to.equal( 80 );
			expect( result.weeks[ 43 ].total ).to.equal( -55 );
		} );

		it( 'calculates daily overtime', function () {
			var hoursPerWeek = 16,
				daysPerWeek = 2,
				calulcator = new WeeklyOvertimeCalculator( daysPerWeek ),
				result = calulcator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 42 ].days[ 13 ].total ).to.equal( 20 );
			expect( result.weeks[ 42 ].days[ 14 ].total ).to.equal( 60 );
			expect( result.weeks[ 43 ].days[ 20 ].total ).to.equal( -55 );
			expect( result.weeks[ 43 ].days[ 21 ].total ).to.equal( 0 );
		} );

		it( 'copies year and month info', function () {
			var hoursPerWeek = 16,
				calulcator = new WeeklyOvertimeCalculator(),
				result = calulcator.getOvertime( testData, hoursPerWeek );
			expect( result.year ).to.equal( 2015 );
			expect( result.month ).to.equal( 9 );
		} );

	} );

	// TODO: it handles edge case where the month starts/ends in the middle of the week:
	//			reduce the required hours for week, track days normally
	// TODO: it handles edge case where the month starts with a weekend:
	//			if person has not worked on the weekend, it will not show up in input data
	//		 	otherwise count as overtime for week and day
	// TODO: it handles overtime when people work on weekends: 
	//		    when more than daysPerWeek days have entries, all remaining days are marked as overtime 
	//          ( weekly overtime is alreadly handled correctly)
	//			when there is no entry for a workday and and entry on a non-work day, count it normally
	//			do a case of not working on friday and doing 4 hours on saturday and sunday, week total should be fine
	// TODO: it handles edge cases where there is a holiday on a workday:
	// 			reduce the required hours for week, track days normally


} );
