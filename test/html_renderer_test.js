var expect = require( 'chai' ).expect,
	benv = require( 'benv' );

describe( 'HtmlRenderer', function () {

	var testData = {
		total: 80
	};

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
		expect( total.text() ).to.equal( '80' );
	} );

	after( function () {
		benv.teardown();
	} );

} );
