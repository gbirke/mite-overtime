var expect = require( 'chai' ).expect,
    Week = require( '../js/domain/week' ),
    moment = require( 'moment' ),
    buildMonthsFromWeeks = require( '../js/build_months_from_weeks' );

function createDate( year, month, day ) {
	var date = moment( [ year, month, day ] );
	date.locale( 'de' );
	return date;
}

describe( 'buildMonthsFromWeeks', function () {

	it( 'builds a month with a single week', function () {
		var firstWeek = Week.createWeek( createDate( 2015, 9, 5 ) ),
		weeks = { 41: firstWeek },
		months = buildMonthsFromWeeks( weeks );

		expect( months ).to.have.key( '9' );
		expect( months[ '9' ].weeks[ '41' ] ).to.deep.equal( firstWeek );
	} );

	it( 'builds a month with multiple weeks', function () {
		var firstWeek = Week.createWeek( createDate( 2015, 9, 5 ) ),
		secondWeek = Week.createWeek( createDate( 2015, 9, 12 ) ),
		thirdWeek = Week.createWeek( createDate( 2015, 9, 19 ) ),
            weeks = {
	41: firstWeek,
	42: secondWeek,
	43: thirdWeek
            },
            months = buildMonthsFromWeeks( weeks );

		expect( months ).to.have.key( '9' );
		expect( months[ '9' ].weeks ).to.have.all.keys( [ '41', '42', '43' ] );
	} );

	it( 'builds multiple months when multiple weeks across month boundaries are given', function () {
		var firstWeek = Week.createWeek( createDate( 2015, 9, 1, 40 ) ), // 28th Sep - 4th Oct
		secondWeek = Week.createWeek( createDate( 2015, 9, 5, 41 ) ), // 4th Oct - 11th Oct
		thirdWeek = Week.createWeek( createDate( 2015, 9, 26, 44 ) ), // 26th Oct - 1st Nov
            weeks = {
	40: firstWeek,
	41: secondWeek,
	44: thirdWeek
            },
            months = buildMonthsFromWeeks( weeks );

		expect( months ).to.have.all.keys( [ '8', '9', '10' ] );
		expect( months[ '8' ].weeks ).to.have.all.keys( [ '40' ] );
		expect( months[ '9' ].weeks ).to.have.all.keys( [ '40', '41', '44' ] );
		expect( months[ '10' ].weeks ).to.have.all.keys( [ '44' ] );
	} );

	it( 'should clone weeks when building multiple months from a week across month boundaries', function () {
		var firstWeek = Week.createWeek( createDate( 2015, 9, 1, 40 ) ), // 28th Sep - 4th Oct
		weeks = { 40: firstWeek },
		months = buildMonthsFromWeeks( weeks );

		expect( months ).to.have.all.keys( [ '8', '9' ] );
		expect( months[ '8' ].weeks[ '40' ] ).not.to.equal( months[ '9' ].weeks[ '40' ] );
	} );

} );
