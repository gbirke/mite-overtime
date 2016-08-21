/*jshint expr: true*/

var chai = require( 'chai' ),
	sinon = require( 'sinon' ),
	sinonChai = require( 'sinon-chai' ),
	PaginationView = require( '../../js/views/pagination_view' ),
	expect = chai.expect,
	moment = require( 'moment' ),
	dummyEvent = { preventDefault: sinon.stub() }
	;

chai.use( sinonChai );

function newDateStoreStub( currentDate ) {
	return {
		date: moment( currentDate ),
		now: moment( '2016-12-31' ),
		listen: sinon.stub()
	};
}

describe( 'PaginationView', function () {

	describe( '#init', function () {

		it( 'registers as a listener for the prev and next elements button and the date store', function () {
			var prevHandler = sinon.spy(),
				nextHandler = sinon.spy(),
				prevElement = { on: prevHandler },
				nextElement = { on: nextHandler },
				dateStore = { listen: sinon.spy() },
				view = PaginationView.createAndInit( prevElement, nextElement, dateStore, {} );
			expect( dateStore.listen ).to.have.been.called;
			expect( prevHandler ).to.have.been.calledWith( 'click', view.handlePrevious );
			expect( nextHandler ).to.have.been.calledWith( 'click', view.handleNext );
		} );
	} );

	describe( '#handlePrevious', function () {
		it( 'sets the date with previous month', function () {
			var commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = PaginationView.createAndInit( prevElement, nextElement, newDateStoreStub( '2016-07-16' ), commandActions );
			view.handlePrevious( dummyEvent );
			expect( commandActions.setDate ).to.have.been.called;
			expect( commandActions.setDate.args[ 0 ][ 0 ].isSame( moment( '2016-06-16' ) ) ).to.be.true;
		} );

		it( 'rolls over to previous year', function () {
			var commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = PaginationView.createAndInit( prevElement, nextElement, newDateStoreStub( '2016-01-16' ), commandActions );
			view.handlePrevious( dummyEvent );
			expect( commandActions.setDate ).to.have.been.called;
			expect( commandActions.setDate.args[ 0 ][ 0 ].format() ).to.equal( moment( '2015-12-16' ).format() );
		} );

		it( 'does not add more than one month for shorter months', function () {
			var commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = PaginationView.createAndInit( prevElement, nextElement, newDateStoreStub( '2016-03-31' ), commandActions );
			view.handlePrevious( dummyEvent );
			expect( commandActions.setDate ).to.have.been.called;
			expect( commandActions.setDate.args[ 0 ][ 0 ].format() ).to.equal( moment( '2016-02-29' ).format() );
		} );

	} );

	describe( '#handleNext', function () {
		it( 'sets the date with previous month', function () {
			var commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = PaginationView.createAndInit( prevElement, nextElement, newDateStoreStub( '2016-07-16' ), commandActions );
			view.handleNext( dummyEvent );
			expect( commandActions.setDate ).to.have.been.called;
			expect( commandActions.setDate.args[ 0 ][ 0 ].isSame( moment( '2016-08-16' ) ) ).to.be.true;
		} );

		it( 'rolls over to next year', function () {
			var commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = PaginationView.createAndInit( prevElement, nextElement, newDateStoreStub( '2015-12-16' ), commandActions );
			view.handleNext( dummyEvent );
			expect( commandActions.setDate ).to.have.been.called;
			expect( commandActions.setDate.args[ 0 ][ 0 ].format() ).to.equal( moment( '2016-01-16' ).format() );
		} );

		it( 'does not add more than one month for shorter months', function () {
			var commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = PaginationView.createAndInit( prevElement, nextElement, newDateStoreStub( '2016-01-31' ), commandActions );
			view.handleNext( dummyEvent );
			expect( commandActions.setDate ).to.have.been.called;
			expect( commandActions.setDate.args[ 0 ][ 0 ].format() ).to.equal( moment( '2016-02-29' ).format() );
		} );

		it( 'does paginate into the future', function () {
			var dateStore = newDateStoreStub( '2016-12-16' ),
				commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = PaginationView.createAndInit( prevElement, nextElement, dateStore, commandActions );
			view.handleNext( dummyEvent );
			expect( commandActions.setDate ).to.not.have.been.called;
		} );

	} );

	describe( '#update', function () {

		it( 'sets disabled state for next when we are in current month', function () {
			var dateStore = newDateStoreStub( '2016-12-16' ),
				commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub(), addClass: sinon.spy() },
				view = PaginationView.createAndInit( prevElement, nextElement, dateStore, commandActions );
			view.update( dateStore );
			expect( nextElement.addClass ).to.have.been.calledWith( 'disabled' );
		} );

		it( 'removes disabled state for next when we are in a different month or year', function () {
			var dateStore = newDateStoreStub( '2016-11-16' ),
				commandActions = {
					setDate: sinon.spy()
				},
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub(), removeClass: sinon.spy() },
				view = PaginationView.createAndInit( prevElement, nextElement, dateStore, commandActions );
			view.update( dateStore );
			expect( nextElement.removeClass ).to.have.been.calledWith( 'disabled' );

			dateStore.date = moment( '2015-12-16' );
			view.update( dateStore );
			expect( nextElement.removeClass ).to.have.been.calledTwice;
		} );

	} );

} );
