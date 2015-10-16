var expect = require( 'chai' ).expect,
	benv = require( 'benv' );

describe( 'HtmlRenderer', function () {

	var testData = [ {
		total: 80,
		weeks: [
			{ total: 100, number: 42 },
			{ total: -20, number: 43 }
		]
	} ];

	before( function ( done ) {
		benv.setup( function () {
			benv.expose( {
				d3: require( 'd3' )
			} );
			HtmlRenderer = require( '../js/html_renderer' );
			renderer = new HtmlRenderer( testData );
			displayContainer = d3.select( 'body' ).append( 'div' ).attr( { id: 'displayContainer' } );
			done();
		} );
	} );

	it( 'renders the total', function () {
		var total;
		renderer.render();
		total = displayContainer.select( '#totalOvertime' );
		expect( total.size() ).to.equal( 1 );
		expect( total.text() ).to.equal( '1:20 overtime' );
	} );

	it( 'renders the weekly total', function () {
		var weeks;
		renderer.render();
		weeks = displayContainer.selectAll( '.week .total' );
		expect( weeks.size() ).to.equal( 2 );
		expect( displayContainer.select( '.week:nth-child(1) .total' ).text() ).to.equal( '1:40 overtime' );
		expect( displayContainer.select( '.week:nth-child(2) .total' ).text() ).to.equal( '20 missing' );
	} );

	after( function () {
		benv.teardown();
	} );

} );
