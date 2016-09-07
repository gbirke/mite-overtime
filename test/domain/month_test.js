import { default as Month, createMonthFromMoment } from '../../js/domain/month'

var expect = require( 'chai' ).expect,
	MONTH_NUMBER = 7,
	YEAR = 2015;

describe( 'Month', function () {

	it( 'has a default of zero work minutes', function () {
		var month = new Month( YEAR, MONTH_NUMBER );
		expect( month.getMinutesWorked() ).to.equal( 0 );
	} );

	it( 'assigns month number and year', function () {
		var month = new Month( YEAR, MONTH_NUMBER );
		expect( month.monthNumber ).to.equal( MONTH_NUMBER );
		expect( month.year ).to.equal( YEAR );
	} );

	it( 'calculates worktime of added week', function () {
		var firstWeek = {
				weekNumber: 1,
				getMinutesWorked: function () { return 500; }
			},
			secondWeek = {
				weekNumber: 2,
				getMinutesWorked: function () { return 600; }
			},
			month = new Month( YEAR, MONTH_NUMBER );

		month.addWeek( firstWeek );
		month.addWeek( secondWeek );
		expect( month.getMinutesWorked() ).to.equal( 1100 );
	} );

	describe( '#getDays', function() {
		it( 'returns days', function () {
			var dayStub = {},
				firstWeek = {
					weekNumber: 1,
					getMinutesWorked: function () { return 500; },
					days: {
						'2016-08-19': dayStub,
						'2016-08-20': dayStub
					}
				},
				secondWeek = {
					weekNumber: 2,
					getMinutesWorked: function () { return 600; }
					,
					days: {
						'2016-08-24': dayStub,
						'2016-08-25': dayStub
					}
				},
				month = new Month( YEAR, MONTH_NUMBER );

			month.addWeek( firstWeek );
			month.addWeek( secondWeek );
			expect( month.getDays ).to.deep.equal( {
				'2016-08-19': dayStub,
				'2016-08-20': dayStub,
				'2016-08-24': dayStub,
				'2016-08-25': dayStub
			} );
		} );
	} );

	// TODO more sanity checks: Never add the same week twice, reject weeks without days in in the same month, etc.

} );

describe( 'createMonthFromMoment', function () {

	const momentStub = function () {
		return {
			month: function () {
				return MONTH_NUMBER;
			},
			year: function () {
				return YEAR
			}
		};
	};

	it( 'assigns month number and year', function () {
		var month = createMonthFromMoment( momentStub() );
		expect( month.monthNumber ).to.equal( MONTH_NUMBER );
		expect( month.year ).to.equal( YEAR );
	} );
} );
