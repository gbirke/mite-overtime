'use strict';
var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	ErrorView = require( '../../js/views/error_view' ),
	expect = chai.expect
	;

chai.use(sinonChai);

describe( 'ErrorView', function () {

    beforeEach( function () {
        this.fixture = {};
        this.fixture.html = sinon.spy();
        this.fixture.element = {
            find: sinon.stub().returns( { html: this.fixture.html } ),
            modal: sinon.spy()
        };
    } );

    it( 'registers as a listener on the error store', function () {
        var errorStore = { listen: sinon.spy() },
            view = ErrorView.createAndInit( this.fixture.element, errorStore );
        expect( errorStore.listen ).to.have.been.calledWith( view.update );
    } );

    it( 'renders error message as html', function () {
        var errorStore = { message: 'test error' },
            view = ErrorView.create( this.fixture.element, errorStore );
        view.update();
        expect( this.fixture.html ).to.have.been.calledWith( '<p>test error</p>' );
	} );

	it( 'shows html error message as modal', function () {
        var errorStore = { message: '' },
            view = ErrorView.create( this.fixture.element, errorStore );
        view.update();
        expect( this.fixture.element.modal ).to.have.been.calledOnce;
	} );
} );
