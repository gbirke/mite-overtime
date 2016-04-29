var expect = require( 'chai' ).expect,
    Day = require( '../js/domain/day'),
    moment = require( 'moment'),
    buildWeeksFromDays = require( '../js/build_weeks_from_days' );


function createDate( year, month, day ) {
    var date = moment( [ year, month, day ] );
    date.locale( 'de' );
    return date;
}


describe( 'buildWeeksFromDays', function () {

    it( 'builds a week with a single day', function () {
        var firstDay = Day.createWorkDay( createDate( 2015, 9, 1 ) ),
            days = { '2015-10-01': firstDay },
            weeks = buildWeeksFromDays( days );

        expect( weeks ).to.have.key( '40' );
        expect( weeks[ '40' ].days[ '2015-10-01' ] ).to.deep.equal( firstDay );
    } );

    it( 'builds a week with multiple days', function () {
        var firstDay = Day.createWorkDay( createDate( 2015, 9, 2 ) ),
            secondDay = Day.createWorkDay( createDate( 2015, 9, 3 ) ),
            thirdDay = Day.createWorkDay( createDate( 2015, 9, 4 ) ), // Edge case - Sunday still belongs to week 40 in Germany
            days = {
                '2015-10-02': firstDay,
                '2015-10-03': secondDay,
                '2015-10-04': thirdDay
            },
            weeks = buildWeeksFromDays( days );

        expect( weeks ).to.have.key( '40' );
        expect( weeks[ '40' ].days ).to.have.all.keys( [ '2015-10-02', '2015-10-03', '2015-10-04' ] );
    } );

    it( 'builds multiple weeks when multiple days across week boundaries are given', function () {
        var firstDay = Day.createWorkDay( createDate( 2015, 9, 3 ) ),
            secondDay = Day.createWorkDay( createDate( 2015, 9, 4 ) ),
            thirdDay = Day.createWorkDay( createDate( 2015, 9, 5 ) ),
            days = {
                '2015-10-03': firstDay,
                '2015-10-04': secondDay,
                '2015-10-05': thirdDay
            },
            weeks = buildWeeksFromDays( days );

        expect( weeks ).to.have.all.keys( [ '40', '41' ] );
        expect( weeks[ '40' ].days ).to.have.all.keys( [ '2015-10-03', '2015-10-04' ] );
        expect( weeks[ '41' ].days ).to.have.all.keys( [ '2015-10-05' ] );
    } );

} );
