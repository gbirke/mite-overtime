var expect = require( 'chai' ).expect,
	sinon = require( 'sinon' ),
	HolidayFactory = require( '../js/holiday_factory' );

describe( 'HolidayFactory', function () {

	describe( 'German Locale', function () {

		it( 'returns a function', function () {
			expect( HolidayFactory.getHolidayFunction( 'de', 'be' ) ).to.be.a( 'function' );
		} );

		it( 'returns different for different counties', function () {
			var fronleichnam = new Date( 2016, 4, 26 );
			expect( HolidayFactory.getHolidayFunction( 'de', 'be' )( fronleichnam ) ).to.be.false;
			expect( HolidayFactory.getHolidayFunction( 'de', 'by' )( fronleichnam ) ).to.be.true;
		} );

	} );

	describe( 'Other locales', function () {

		it( 'returns a function', function() {
			expect( HolidayFactory.getHolidayFunction( 'qqq', '' ) ).to.be.a( 'function' );
		} );

		it( 'is has no holidays', function() {
			var christmas = new Date( 2016, 11, 25 );
			expect( HolidayFactory.getHolidayFunction( 'qqq', '' )( christmas) ).to.be.false;
		} );

	} );

} );