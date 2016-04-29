var expect = require( 'chai' ).expect,
    sinon = require( 'sinon' ),
    OvertimeFactory = require( '../js/overtime_factory' );

describe( 'OvertimeFactory', function () {

    var testData = [
            { time_entry: { date_at: '2015-09-30', minutes: 230 } },
            { time_entry: { date_at: '2015-10-01', minutes: 250 } },
            { time_entry: { date_at: '2015-10-01', minutes: 240 } },
            { time_entry: { date_at: '2015-10-02', minutes: 500 } }
        ],
        workWeek = {
            getHoursPerDay: sinon.stub().returns( 8 ),
            isWorkDay: function ( date ) {
				// No Sundays and Saturdays
                return date.day() != 0 &&  date.day() != 6;
            }
        };

    describe( '#createMonthsFromEntries', function () {

        it( 'should build a nested structure with months, weeks and days', function () {
            var factory = OvertimeFactory.createOvertimeFactory( workWeek, 'de'),
                months = factory.getMonthsFromEntries( testData),
				expectedDayKeys = [
					'2015-09-28', '2015-09-29', '2015-09-30', '2015-10-01', '2015-10-02', '2015-10-04', '2015-10-04'
				]
				;

            expect( months ).to.have.all.keys( [ '8', '9' ] );
            expect( months[ '9' ].weeks ).to.have.all.keys( [ '40' ] );
            expect( months[ '9' ].weeks[ '40' ].days ).to.have.keys( expectedDayKeys );
            expect( months[ '8' ].weeks[ '40' ].days ).to.have.keys( expectedDayKeys );
        } );

        it( 'should decorate weeks with weekly required minutes, each month counted separately', function () {
            var factory = OvertimeFactory.createOvertimeFactory( workWeek, 'de'),
                months = factory.getMonthsFromEntries( testData );

			expect( months[ '8' ].weeks[ '40' ].requiredMinutes ).to.equal( 1440 );
			expect( months[ '9' ].weeks[ '40' ].requiredMinutes ).to.equal( 960 );
        } );

		it( 'should decorate weeks with time deltas, each month counted separately', function () {
			var factory = OvertimeFactory.createOvertimeFactory( workWeek, 'de'),
				months = factory.getMonthsFromEntries( testData );

			expect( months[ '8' ].weeks[ '40' ].timeDelta ).to.equal( -1210 );
			expect( months[ '9' ].weeks[ '40' ].timeDelta ).to.equal( 30 );

		} );

    } );

} );