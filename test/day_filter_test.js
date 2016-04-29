var expect = require( 'chai' ).expect,
    moment = require( 'moment'),
    DayFilter = require( '../js/day_filter' );

function createDate( year, month, day ) {
    var date = moment( [ year, month, day ] );
    date.locale( 'de' );
    return date;
}

describe( 'DayFilter', function () {

    describe( '#all', function () {

        it( 'returns all days', function () {
            var filter = DayFilter.all(),
                firstDay = {
                    dateObject: createDate( 2015, 8, 30 )
                },
                secondDay = {
                    dateObject: createDate( 2015, 9, 1 )
                },
                days = {
                    '2015-08-30': firstDay,
                    '2015-09-01': secondDay
                },
                result = filter( days );
            expect( result ).to.deep.equals( days );
        } );

    } );

    describe( '#byMonth', function () {

        it( 'removes days outside the given month', function () {
            var filter = DayFilter.byMonth( 9 ),
                firstDay = {
                    dateObject: createDate( 2015, 8, 30 )
                },
                secondDay = {
                    dateObject: createDate( 2015, 9, 1 )
                },
                thirdDay = {
                    dateObject: createDate( 2015, 9, 2 )
                },
                days = {
                    '2015-08-30': firstDay,
                    '2015-09-01': secondDay,
                    '2015-09-02': thirdDay
                },
                result = filter( days );
            expect( result ).to.have.all.keys( [ '2015-09-01', '2015-09-02' ] );
            expect( result ).not.to.have.key( [ '2015-08-30' ] );
        } );

    } );

    describe( '#before', function () {

        it( 'removes days after the given date', function () {
            var filter = DayFilter.before( createDate( 2015, 9, 2 ) ),
                firstDay = {
                    dateObject: createDate( 2015, 8, 30 )
                },
                secondDay = {
                    dateObject: createDate( 2015, 9, 1 )
                },
                thirdDay = {
                    dateObject: createDate( 2015, 9, 2 )
                },
                days = {
                    '2015-08-30': firstDay,
                    '2015-09-01': secondDay,
                    '2015-09-02': thirdDay
                },
                result = filter( days );
            expect( result ).to.have.all.keys( [ '2015-08-30', '2015-09-01' ] );
            expect( result ).not.to.have.key( [ '2015-09-02' ] );
        } );

    } );

    describe( '#workDays', function () {

        it( 'removes non-workdays', function () {
            var filter = DayFilter.workDays(),
                workday = function() { return true; },
                holiday = function() { return false; },
                firstDay = {
                    isAWorkDay: workday
                },
                secondDay = {
                    isAWorkDay: workday
                },
                thirdDay = {
                    isAWorkDay: holiday
                },
                days = {
                    '2015-08-30': firstDay,
                    '2015-09-01': secondDay,
                    '2015-09-02': thirdDay
                },
                result = filter( days );
            expect( result ).to.have.all.keys( [ '2015-08-30', '2015-09-01' ] );
            expect( result ).not.to.have.key( [ '2015-09-02' ] );
        } );

    } );

    describe( '#combine', function () {

        it( 'leaves days that pass all filters', function () {
            var filter = DayFilter.combine(
                    DayFilter.before( createDate( 2015, 9, 2 ) ),
                    DayFilter.before( createDate( 2015, 9, 1 ) )
                ),
                firstDay = {
                    dateObject: createDate( 2015, 8, 30 )
                },
                secondDay = {
                    dateObject: createDate( 2015, 9, 1 )
                },
                thirdDay = {
                    dateObject: createDate( 2015, 9, 2 )
                },
                days = {
                    '2015-08-30': firstDay,
                    '2015-09-01': secondDay,
                    '2015-09-02': thirdDay
                },
                result = filter( days );
            expect( result ).to.have.all.keys( [ '2015-08-30'] );
            expect( result ).not.to.have.key( [ '2015-09-02', '2015-09-01' ] );
        } );

    } );
} );