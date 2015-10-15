var expect = require('chai').expect,
    OvertimeCalculator = require('../js/overtime_calculator');

describe( 'OvertimeCalculator', function() {

	describe( '#getOvertimes', function() {

        var testData = {
            weeks: {
                "42": {
                    days: {
                        "13": { total: 500 }, // 8 hours 20 minutes
                        "14": { total: 540 } // 9 hours
                    }
                },
                "43": {
                    days: {
                        "20": { total: 425 }, // 7 hours, 5 Minutes
                        "21": { total: 480 } // 8 hours
                    }
                }
            }
        };

        it( 'calculates total overtime', function() {
            var minutesPerDay = 480,
                calulcator = new OvertimeCalculator(),
                result = calulcator.getOvertime( testData, minutesPerDay );
            expect( result.total ).to.equal( 25 );
        } );

        it( 'calculates weekly overtime', function() {
            var minutesPerDay = 480,
                calulcator = new OvertimeCalculator(),
                result = calulcator.getOvertime( testData, minutesPerDay );
            expect( result.weeks["42"].total ).to.equal( 80 );
            expect( result.weeks["43"].total ).to.equal( -55 );
        } );

        it( 'calculates daily overtime', function() {
            var minutesPerDay = 480,
                calulcator = new OvertimeCalculator(),
                result = calulcator.getOvertime( testData, minutesPerDay );
            expect( result.weeks["42"].days["13"].total ).to.equal( 20 );
            expect( result.weeks["42"].days["14"].total ).to.equal( 60 );
            expect( result.weeks["43"].days["20"].total ).to.equal( -55 );
            expect( result.weeks["43"].days["21"].total ).to.equal( 0 );
        } );

    } );

} );
