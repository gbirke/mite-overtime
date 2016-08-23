/*jshint expr: true*/

var chai = require( 'chai' ),
	sinon = require( 'sinon' ),
	sinonChai = require( 'sinon-chai' ),
	SettingsView = require( '../../js/views/settings_view' ).default,
	expect = chai.expect
	;

chai.use( sinonChai );

describe( 'SettingsView', function () {

	describe( '#init', function () {

		it( 'registers as a listener for the submit button', function () {
			var handler = sinon.spy(),
				finder = sinon.stub().returns( { on: handler } );
			new SettingsView( { find: finder}, { subscribe: sinon.stub() } );
			expect( handler ).to.have.been.calledWith( 'click', sinon.match.any );
		} );
	} );

	// Settings does too much and will be split into components in the next refactoring (which will use React.js)
	// Therefore, we don't test the submit action here :(
} );
