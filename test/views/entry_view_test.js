/*jshint expr: true*/

var chai = require( 'chai' ),
	sinon = require( 'sinon' ),
	sinonChai = require( 'sinon-chai' ),
	EntryView = require( '../../js/views/entry_view' ).default,
	expect = chai.expect;

chai.use( sinonChai );

describe( 'EntryView', function () {

	var settings = {
		hoursPerWeek: 40,
		workingDays: [ 1, 2, 3, 4, 5 ],
		locale: 'de',
		holidayFunction: null
	};

	it( 'subscribes to store events', function () {
		var store = { subscribe: sinon.spy() },
			view = new EntryView( {}, store, {} );
		expect( store.subscribe ).to.have.been.called.once;
	} );

	it( 'calls the converter with entries data', function () {
		var entries = [],
			state = {
				currentDate: '2016-07-16',
				entries: entries,
				settings: settings
			},
			store = {
				subscribe: sinon.stub(),
				getState: sinon.stub().returns( state )
			},
			converter = { getDataForRenderer: sinon.spy() },
			renderer = { render: sinon.stub() },
			view = new EntryView( renderer, store, converter );
		view.update();

		expect( converter.getDataForRenderer ).to.have.been.calledWith(
			entries,
			state.currentDate,
			settings.workingDays,
			settings.hoursPerWeek,
			settings.holidayFunction,
			settings.locale
		);
	} );

	it( 'calls the renderer with converter data', function () {
		var entries = [],
			state = {
				currentDate: '2016-07-16',
				entries: entries,
				settings: settings
			},
			store = {
				subscribe: sinon.stub(),
				getState: sinon.stub().returns( state )
			},
			converterResult = [ 'calendar', 'overtime' ],
			converter = { getDataForRenderer: sinon.stub().returns( converterResult ) },
			renderer = { render: sinon.spy() },
			view = new EntryView( renderer, store, converter );
		view.update();

		expect( renderer.render ).to.have.been.calledWith( 'calendar', 'overtime' );
	} );

} );
