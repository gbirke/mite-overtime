import Week from '../../js/domain/week';

var expect = require( 'chai' ).expect,
	moment = require( 'moment' ),
	WEEK_NUMBER = 12;

describe( 'Week', function () {

	it( 'has a default of zero work minutes', function () {
		var week = new Week( moment() );
		expect( week.getMinutesWorked() ).to.equal( 0 );
	} );

	it( 'knows its week number', function () {
		var week = new Week( moment().week( WEEK_NUMBER ) );
		expect( week.weekNumber ).to.equal( WEEK_NUMBER );
	} );

	it( 'calculates worktime of added days', function () {
		var firstDay = {
				date: 1,
				dateObject: moment( '2015-10-01' ),
				getMinutesWorked: function () { return 5; },
				getKey: function () { return '2015-10-01' }
			},
			secondDay = {
				date: 2,
				dateObject: moment( '2015-10-02' ),
				getMinutesWorked: function () { return 5; },
				getKey: function () { return '2015-10-02' }
			},
			week = new Week( moment( '2015-10-01' ) );

		week.addDay( firstDay );
		week.addDay( secondDay );
		expect( week.getMinutesWorked() ).to.equal( 10 );
	} );

	it( 'can count days with filtering', function () {
		var firstDay = {
					date: 30,
					dateObject: moment( '2015-09-30' ),
					getMinutesWorked: function () { return 5; },
					getKey: function () { return '2015-09-30' }
				},
				secondDay = {
					date: 1,
					dateObject: moment( '2015-10-01' ),
					getMinutesWorked: function () { return 5; },
					getKey: function () { return '2015-10-02' }
				},
				week = new Week( moment( '2015-10-01' ) ),
				verySpecificFilter = function ( days ) {
					return { '2015-09-30': firstDay };
				}
			;

		week.addDay( firstDay );
		week.addDay( secondDay );

		expect( week.countDays( verySpecificFilter ) ).to.equal( 1 );
	} );

	describe( 'English locale', function () {
		const localizedMoment = function ( dateStr ) {
			return moment( dateStr ).locale( 'en' )
		};

		it( 'adds start of week (Sunday)', function () {
			// Monday, 5th September 2016
			const week = new Week( localizedMoment( '2016-09-05' ) );
			expect( week.start.date() ).to.equal( 4 );
		} );

		it( 'adds end of week (Sunday)', function () {
			// Monday, 5th September 2016
			const week = new Week( localizedMoment( '2016-09-05' ) );
			expect( week.end.date() ).to.equal( 10 );
		} );

	} );

	describe( 'German locale', function () {
		const localizedMoment = function ( dateStr ) {
			return moment( dateStr ).locale( 'de' )
		};

		it( 'adds start of week (Monday)', function () {
			// Monday, 5th September 2016
			const week = new Week( localizedMoment( '2016-09-05' ) );
			expect( week.start.date() ).to.equal( 5 );
		} );

		it( 'adds end of week (Sunday)', function () {
			// Monday, 5th September 2016
			const week = new Week( localizedMoment( '2016-09-05' ) );
			expect( week.end.date() ).to.equal( 11 );
		} );

	} );

	// TODO more sanity checks: Never add the same day twice, reject days not in the same month etc

} );
