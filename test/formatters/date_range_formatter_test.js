import DateRangeFormatter from '../../js/formatters/date_range_formatter'
import Week from '../../js/domain/week'

let expect = require( 'chai' ).expect,
	moment = require( 'moment' );

function getLocalizedWeek( date ) {
	return new Week( moment( date, 'YYYY-MM-DD', 'de' ) );
}

describe( 'DateRangeFormatter, German locale', function () {

	describe( 'October 2015', function () {

		const formatter = new DateRangeFormatter( 9 );

		it( 'formats week inside month', function () {
			expect( formatter.formatWeek( getLocalizedWeek( '2015-10-05') ) ).to.equal( '05. - 11.10.' );
			expect( formatter.formatWeek( getLocalizedWeek( '2015-10-12') ) ).to.equal( '12. - 18.10.' );
			expect( formatter.formatWeek( getLocalizedWeek( '2015-10-19') ) ).to.equal( '19. - 25.10.' );
		} );

		it( 'formats days at the beginning of month', function () {
			expect( formatter.formatWeek( getLocalizedWeek( '2015-09-28') ) ).to.equal( '01. - 04.10.' );
		} );

		it( 'formats last week of month', function () {
			expect( formatter.formatWeek( getLocalizedWeek( '2015-10-26') ) ).to.equal( '26. - 31.10.' );
		} );
	} );

	describe( 'December 2015', function () {

		const formatter = new DateRangeFormatter( 11 );

		it( 'formats last week of month', function () {
			expect( formatter.formatWeek( getLocalizedWeek( '2015-12-28') ) ).to.equal( '28. - 31.12.' );
		} );
	} );

	describe( 'January 2016', function () {

		const formatter = new DateRangeFormatter( 0 );

		it( 'formats first week of month', function () {
			expect( formatter.formatWeek( getLocalizedWeek( '2015-12-28') ) ).to.equal( '01. - 03.01.' );
		} );
	} );


} );