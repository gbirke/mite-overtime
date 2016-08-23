/*jshint expr: true*/

var chai = require( 'chai' ),
	sinon = require( 'sinon' ),
	sinonChai = require( 'sinon-chai' ),
	PaginationView = require( '../../js/views/pagination_view' ).default,
	expect = chai.expect,
	moment = require( 'moment' ),
	dummyEvent = { preventDefault: sinon.stub() }
	;

chai.use( sinonChai );

function createStore( currentDate ) {
	var state = { currentDate };
	return {
		dispatch: sinon.spy(),
		subscribe: sinon.stub(),
		getState: sinon.stub().returns( state )
	};
}

describe( 'PaginationView', function () {

	describe( 'constructor', function () {

		it( 'registers as a listener for the prev and next elements button and the store', function () {
			var prevHandler = sinon.spy(),
				nextHandler = sinon.spy(),
				prevElement = { on: prevHandler },
				nextElement = { on: nextHandler },
				store = { subscribe: sinon.spy() },
				view = new PaginationView( prevElement, nextElement, store, {} );
			expect( store.subscribe ).to.have.been.called;
			expect( prevHandler ).to.have.been.calledWith( 'click', sinon.match.func );
			expect( nextHandler ).to.have.been.calledWith( 'click', sinon.match.func );
		} );
	} );

	describe( '#handlePrevious', function () {

		it( 'sets the date with previous month', function () {
			var setDate = sinon.stub().returns( 'SET_DATE' ),
				store = createStore( '2016-07-16' ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.handlePrevious( dummyEvent );
			expect( store.dispatch ).to.have.been.calledWith( 'SET_DATE' );
			expect( setDate ).to.have.been.called;
			expect( setDate.args[ 0 ][ 0 ].isSame( moment( '2016-06-16' ) ) ).to.be.true;
		} );

		it( 'rolls over to previous year', function () {
			var setDate = sinon.stub().returns( 'SET_DATE' ),
				store = createStore( '2016-01-16' ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.handlePrevious( dummyEvent );
			expect( setDate ).to.have.been.called;
			expect( setDate.args[ 0 ][ 0 ].format() ).to.equal( moment( '2015-12-16' ).format() );
		} );

		it( 'does not add more than one month for shorter months', function () {
			var setDate = sinon.stub().returns( 'SET_DATE' ),
				store = createStore( '2016-03-31' ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.handlePrevious( dummyEvent );
			expect( setDate ).to.have.been.called;
			expect( setDate.args[ 0 ][ 0 ].format() ).to.equal( moment( '2016-02-29' ).format() );
		} );

	} );

	describe( '#handleNext', function () {
		it( 'sets the date with next month', function () {
			var setDate = sinon.stub().returns( 'SET_DATE' ),
				store = createStore( '2016-07-16' ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.handleNext( dummyEvent );
			expect( setDate ).to.have.been.called;
			expect( setDate.args[ 0 ][ 0 ].isSame( moment( '2016-08-16' ) ) ).to.be.true;
		} );

		it( 'rolls over to next year', function () {
			var setDate = sinon.stub().returns( 'SET_DATE' ),
				store = createStore( '2015-12-16' ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.handleNext( dummyEvent );
			expect( setDate ).to.have.been.called;
			expect( setDate.args[ 0 ][ 0 ].format() ).to.equal( moment( '2016-01-16' ).format() );
		} );

		it( 'does not add more than one month for shorter months', function () {
			var setDate = sinon.stub().returns( 'SET_DATE' ),
				store = createStore( '2016-01-31' ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.handleNext( dummyEvent );
			expect( setDate ).to.have.been.called;
			expect( setDate.args[ 0 ][ 0 ].format() ).to.equal( moment( '2016-02-29' ).format() );
		} );

		it( 'does not paginate into the future', function () {
			var setDate = sinon.stub().returns( 'SET_DATE' ),
				store = createStore( moment().format( 'YYYY-MM-DD') ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.handleNext( dummyEvent );
			expect( setDate ).to.not.have.been.called;
		} );

	} );

	describe( '#update', function () {

		var setDate = sinon.stub().returns( 'SET_DATE' );

			it( 'sets disabled state for next when we are in current month', function () {
			var store = createStore( moment().format( 'YYYY-MM-DD') ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub(), hide: sinon.spy(), show: sinon.stub() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.update();
			expect( nextElement.hide ).to.have.been.calledOnce;
		} );

		it( 'removes disabled state for next when we are in a different month or year', function () {
			var store = createStore( '2015-01-01' ),
				prevElement = { on: sinon.stub() },
				nextElement = { on: sinon.stub(), hide: sinon.stub(), show: sinon.spy() },
				view = new PaginationView( prevElement, nextElement, store, setDate );
			view.update();
			expect( nextElement.show ).to.have.been.calledOnce;
		} );

	} );

} );
