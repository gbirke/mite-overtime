var expect = require( 'chai' ).expect,
    Day = require( '../js/domain/day'),
    buildWeeksFromDays = require( '../js/build_weeks_from_days' );


function createDate( year, month, day, weekNumber ) {
    return {
        date: function () { return day; },
        month: function () { return month; },
        year: function () { return year; },
        week: function () { return weekNumber; }
    }
}


describe( 'buildWeeksFromDays', function () {

    it( 'builds a week with a single day', function () {
        var firstDay = Day.createWorkDay( createDate( 2015, 10, 1, 40 ) ),
            days = [ firstDay ],
            weeks = buildWeeksFromDays( days );

        expect( weeks ).to.have.key( '40' );
        expect( weeks[ '40' ].days[ '1' ] ).to.deep.equal( firstDay );
    } );

    it( 'builds a week with multiple days', function () {
        var firstDay = Day.createWorkDay( createDate( 2015, 10, 2, 41 ) ),
            secondDay = Day.createWorkDay( createDate( 2015, 10, 3, 41 ) ),
            thirdDay = Day.createWorkDay( createDate( 2015, 10, 4, 41 ) ),
            days = [ firstDay, secondDay, thirdDay ],
            weeks = buildWeeksFromDays( days );

        expect( weeks ).to.have.key( '41' );
        expect( weeks[ '41' ].days ).to.have.all.keys( [ '2', '4', '4' ] );
    } );

    it( 'builds multiple weeks when multiple days across week boundaries are given', function () {
        var firstDay = Day.createWorkDay( createDate( 2015, 10, 1, 40 ) ),
            secondDay = Day.createWorkDay( createDate( 2015, 10, 2, 41 ) ),
            thirdDay = Day.createWorkDay( createDate( 2015, 10, 3, 41 ) ),
            days = [ firstDay, secondDay, thirdDay ],
            weeks = buildWeeksFromDays( days );

        expect( weeks ).to.have.all.keys( [ '40', '41' ] );
        expect( weeks[ '40' ].days ).to.have.all.keys( [ '1' ] );
        expect( weeks[ '41' ].days ).to.have.all.keys( [ '2', '3' ] );
    } );

} );