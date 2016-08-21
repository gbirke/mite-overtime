var expect = require( 'chai' ).expect,
    MonthlyOvertimeDecorator = require( '../js/monthly_overtime_decorator' );

function createWeek( weekNumber, minutesWorked ) {
	return {
		weekNumber: weekNumber,
		getMinutesWorked: sinon.stub().returns( minutesWorked )
	};
}

describe( 'MonthlyOvertimeDecorator', function () {

	it( 'sums up the time delta of the contained weeks', function () {
		var firstMonth = {
			weeks: {
				40: { timeDelta: 0 },
				41: { timeDelta: 50 },
				42: { timeDelta: -8 }
			}
		},
            months = {
	9: firstMonth
            },
            decorator = MonthlyOvertimeDecorator.createMonthlyOvertimeDecorator();
		decorator.addOvertimeToEntries( months );

		expect( firstMonth ).to.have.property( 'timeDelta' );
		expect( firstMonth.timeDelta ).to.equal( 42 );

	} );
} );
