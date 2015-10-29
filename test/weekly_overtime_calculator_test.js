var expect = require( 'chai' ).expect,
	WeeklyOvertimeCalculator = require( '../js/weekly_overtime_calculator' ),
	WorktimeCalculator = require( '../js/worktime_calculator' );

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
		},
		worktimeCalculator = new WorktimeCalculator( [ 2, 3 ] );

		it( 'calculates total overtime', function () {
			var hoursPerWeek = 16,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.total ).to.equal( 25 );
		} );

		it( 'calculates weekly overtime', function () {
			var hoursPerWeek = 16,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 42 ].total ).to.equal( 80 );
			expect( result.weeks[ 43 ].total ).to.equal( -55 );
		} );

		it( 'calculates daily overtime', function () {
			var hoursPerWeek = 16,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 42 ].days[ 13 ].total ).to.equal( 20 );
			expect( result.weeks[ 42 ].days[ 14 ].total ).to.equal( 60 );
			expect( result.weeks[ 43 ].days[ 20 ].total ).to.equal( -55 );
			expect( result.weeks[ 43 ].days[ 21 ].total ).to.equal( 0 );
		} );

		it( 'copies year and month info', function () {
			var hoursPerWeek = 16,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.year ).to.equal( 2015 );
			expect( result.month ).to.equal( 9 );
		} );

	} );

	describe( '#getOvertime, incomplete week at beginning of month', function () {

		var testData = {
			year: 2015,
			month: 9,
			weeks: {
				40: {
					total: 1040,
					days: {
						1: { total: 500 }, // 8 hours 20 minutes
						2: { total: 540 } // 9 hours
					}
				}
			}
		},
		worktimeCalculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] );

		it( 'calculates total overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.total ).to.equal( 80 );
		} );

		it( 'calculates weekly overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 40 ].total ).to.equal( 80 );
		} );

		it( 'calculates daily overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 40 ].days[ 1 ].total ).to.equal( 20 );
			expect( result.weeks[ 40 ].days[ 2 ].total ).to.equal( 60 );
		} );

	} );

	describe( '#getOvertime, incomplete week at end of month', function () {

		var testData = {
			year: 2015,
			month: 7,
			weeks: {
				36: {
					total: 500,
					days: {
						31: { total: 500 } // 8 hours 20 minutes
					}
				}
			}
		},
		worktimeCalculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] );

		it( 'calculates total overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.total ).to.equal( 20 );
		} );

		it( 'calculates weekly overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 36 ].total ).to.equal( 20 );
		} );

		it( 'calculates daily overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 36 ].days[ 31 ].total ).to.equal( 20 );
		} );

	} );

	describe( '#getOvertime, month starting on a weekend', function () {

		var testData = {
			year: 2015,
			month: 7,
			weeks: {
				31: {
					total: 240,
					days: {
						2: { total: 240 },
					}
				}
			}
		},
		worktimeCalculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] );

		it( 'ignores the two days on the weekend', function () {
			var hoursPerWeek = 40,
				emptyData = {
					year: 2015,
					month: 7,
					weeks: {
						31: {
							total: 0,
							days: {	}
						}
					}
				},
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( emptyData, hoursPerWeek );
			expect( result.total ).to.equal( 0 );
		} );

		it( 'calculates weekly overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 31 ].total ).to.equal( 240 );
		} );

		it( 'registers working on sunday at the start of a month as overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 31 ].days[ 2 ].total ).to.equal( 240 );
		} );

	} );

	describe( '#getOvertime, working outside worktimes without deficit', function () {

		var testData = {
			year: 2015,
			month: 9,
			weeks: {
				42: {
					total: 2490,
					days: {
						12: { total: 480 },
						13: { total: 500 }, // 8 hours 20 minutes
						14: { total: 540 }, // 9 hours
						15: { total: 420 }, // 7 hours
						16: { total: 480 },
						17: { total: 70 },
					}
				}
			}
		},
		worktimeCalculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] );

		it( 'calculates total overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.total ).to.equal( 90 );
		} );

		it( 'calculates weekly overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 42 ].total ).to.equal( 90 );
		} );

		it( 'calculates daily overtime', function () {
			var hoursPerWeek = 40,
				calculator = new WeeklyOvertimeCalculator( worktimeCalculator ),
				result = calculator.getOvertime( testData, hoursPerWeek );
			expect( result.weeks[ 42 ].days[ 17 ].total ).to.equal( 70 );
		} );
	} );

	// jscs:disable requireSpaceAfterLineComment
	// TODO: it handles overtime when people work on weekends:
	//		    when more than daysPerWeek days have entries, all remaining days are marked as overtime
	//          ( weekly overtime is alreadly handled correctly)
	//			when there is no entry for a workday and and entry on a non-work day, count it normally
	//			do a case of not working on friday and doing 4 hours on saturday and sunday, week total should be fine
	// TODO: it handles edge cases where there is a holiday on a workday:
	// 			reduce the required hours for week, track days normally

} );
