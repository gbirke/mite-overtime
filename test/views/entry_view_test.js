/*jshint expr: true*/

var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	EntryView = require( '../../js/views/entry_view' ),
	expect = chai.expect;

chai.use(sinonChai);

describe( 'EntryView', function () {

    it( 'registers as a listener on the entry store', function () {
        var entryStore = { listen: sinon.spy() },
            view = EntryView.createAndInit( {}, entryStore );
        expect( entryStore.listen ).to.have.been.calledWith( view.update );
    } );

    it( 'calls the renderer with calendar and overtime data', function () {
        var entryStore = { listen: sinon.stub() },
            renderer = { render: sinon.spy() },
            view = EntryView.create( renderer, entryStore ),
            testData = { calendarData: 'calendar', overtimeData: 'overtime' };
        view.update( testData );
        expect( renderer.render ).to.have.been.calledWith( 'calendar', 'overtime' );
	} );

} );
