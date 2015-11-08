var expect = require( 'chai' ).expect,
	benv = require( 'benv' );

describe( 'HtmlRenderer', function () {

	var testData = {
		timeDelta: 80,
		month: 9,
		year: 2015,
		weeks: {
			42: { timeDelta: 100, week: 42 },
			43: { timeDelta: -20, week: 43 }
		}
	};

	before( function ( done ) {
		benv.setup( function () {
			benv.expose( {
				d3: require( 'd3' )
			} );
			HtmlRenderer = require( '../js/html_renderer' );
			renderer = new HtmlRenderer();
			displayContainer = d3.select( 'body' ).append( 'div' ).attr( { id: 'displayContainer' } );
			done();
		} );
	} );

	it( 'renders the month name and year', function () {
		var total;
		renderer.render( testData );
		total = displayContainer.select( 'h1' );
		expect( total.size() ).to.equal( 1 );
		expect( total.text() ).to.equal( 'Total for November 2015' );
	} );


	it( 'renders the overall time delta', function () {
		var total;
		renderer.render( testData );
		total = displayContainer.select( '#totalOvertime' );
		expect( total.size() ).to.equal( 1 );
		expect( total.text() ).to.equal( '1:20 overtime' );
	} );

	it( 'renders the weekly time delta', function () {
		var weeks;
		renderer.render( testData );
		weeks = displayContainer.selectAll( '.week .total' );
		expect( weeks.size() ).to.equal( 2 );
		expect( displayContainer.select( '.week:nth-child(1) .total' ).text() ).to.equal( '1:40 overtime' );
		expect( displayContainer.select( '.week:nth-child(2) .total' ).text() ).to.equal( '0:20 missing' );
	} );

	it( 'renders the week number', function () {
		var weeks;
		renderer.render( testData );
		weeks = displayContainer.selectAll( '.week h2' );
		expect( weeks.size() ).to.equal( 2 );
		expect( displayContainer.select( '.week:nth-child(1) h2' ).text() ).to.equal( 'Week 42' );
		expect( displayContainer.select( '.week:nth-child(2) h2' ).text() ).to.equal( 'Week 43' );
	} );


	after( function () {
		benv.teardown();
	} );

} );
