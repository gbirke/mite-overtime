var expect = require( 'chai' ).expect,
	benv = require( 'benv' ),
	CalendarDataGenerator = require( '../js/calendar_data_generator' ),
	createWorkWeek = require( '../js/domain/workweek' ).createWorkWeek;

describe( 'HtmlRenderer', function () {

	var testOvertimeData = {
		timeDelta: 80,
		weeks: {
			42: { timeDelta: 100 },
			43: { timeDelta: -20 }
		}
	},
	dateGenerator = new CalendarDataGenerator( createWorkWeek( [ 1, 2, 3, 4, 5 ], 40 ), 'en' ),
	testCalendarData = dateGenerator.generateData( 2015, 9 );

	before( function ( done ) {
		benv.setup( function () {
			benv.expose( {
				d3: require( 'd3' )
			} );
			HtmlRenderer = require( '../js/html_renderer' );
			renderer = new HtmlRenderer( '#displayContainer' );
			displayContainer = d3.select( 'body' ).append( 'div' ).attr( { id: 'displayContainer' } );
			done();
		} );
	} );

	it( 'renders the month name and year', function () {
		var total;
		renderer.render( testCalendarData, {} );
		total = displayContainer.select( 'h1' );
		expect( total.size() ).to.equal( 1 );
		expect( total.text() ).to.equal( 'Total for October 2015' );
	} );

	it( 'renders the overall time delta', function () {
		var total;
		renderer.render( testCalendarData, testOvertimeData );
		total = displayContainer.select( '#totalOvertime' );
		expect( total.size() ).to.equal( 1 );
		expect( total.text() ).to.equal( '1:20 overtime' );
	} );

	it( 'renders the weekly time delta', function () {
		var weeks;
		renderer.render( testCalendarData, testOvertimeData );
		weeks = displayContainer.selectAll( '.week .total' );
		expect( weeks.size() ).to.equal( 5 );
		expect( displayContainer.select( '.week:nth-child(3) .total' ).text() ).to.equal( '1:40 overtime' );
		expect( displayContainer.select( '.week:nth-child(4) .total' ).text() ).to.equal( '0:20 missing' );
		expect( displayContainer.select( '.week:nth-child(5) .total' ).text() ).to.equal( '' );
	} );

	it( 'renders the week number', function () {
		var weeks;
		renderer.render( testCalendarData, testOvertimeData );
		weeks = displayContainer.selectAll( '.week h2' );
		expect( weeks.size() ).to.equal( 5 );
		expect( displayContainer.select( '.week:nth-child(1) h2' ).text() ).to.equal( 'Week 40' );
		expect( displayContainer.select( '.week:nth-child(2) h2' ).text() ).to.equal( 'Week 41' );
		expect( displayContainer.select( '.week:nth-child(3) h2' ).text() ).to.equal( 'Week 42' );
		expect( displayContainer.select( '.week:nth-child(4) h2' ).text() ).to.equal( 'Week 43' );
		expect( displayContainer.select( '.week:nth-child(5) h2' ).text() ).to.equal( 'Week 44' );
	} );

	it( 'renders the dates for each week', function () {
		var weeks;
		renderer.render( testCalendarData, testOvertimeData );
		weeks = displayContainer.selectAll( '.week h3' );
		expect( weeks.size() ).to.equal( 5 );
		expect( displayContainer.select( '.week:nth-child(1) h3' ).text() ).to.equal( '01. - 03.10.' );
		expect( displayContainer.select( '.week:nth-child(2) h3' ).text() ).to.equal( '04. - 10.10.' );
		expect( displayContainer.select( '.week:nth-child(3) h3' ).text() ).to.equal( '11. - 17.10.' );
		expect( displayContainer.select( '.week:nth-child(4) h3' ).text() ).to.equal( '18. - 24.10.' );
		expect( displayContainer.select( '.week:nth-child(5) h3' ).text() ).to.equal( '25. - 31.10.' );
	} );

	// TODO: test it renders week 1 of following year as last column, with year
	// TODO: test it renders week 52 of previous year as first column, with year
	// TODO: test it renders "one-day-weeks" (1st or last day of month is the beginning of the week) without range. See May 2016

	after( function () {
		benv.teardown();
	} );

} );
