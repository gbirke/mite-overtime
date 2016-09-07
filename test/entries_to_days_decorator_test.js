// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

import Day from '../js/domain/Day'
import EntriesToDaysDecorator from '../js/entries_to_days_decorator';

let expect = require( 'chai' ).expect,
	moment = require( 'moment' );

describe( 'EntriesToDaysConverter', function () {

	beforeEach( function () {
		this.days = {
			'2015-10-11': new Day( moment( '2015-10-11' ) ),
			'2015-10-12': new Day( moment( '2015-10-12' ) )
		};
	} );

	it( 'Does not change time entries when data is empty', function () {
		const testData = [],
			decorator = new EntriesToDaysDecorator();
		decorator.addWorkingTimeToDays( this.days, testData );
		expect( this.days[ '2015-10-11' ].getMinutesWorked() ).to.equal( 0 );
		expect( this.days[ '2015-10-12' ].getMinutesWorked() ).to.equal( 0 );
	} );

	it( 'adds minutes from the same day', function () {
		var testData = [
				{ time_entry: { date_at: '2015-10-11', minutes: 45 } },
				{ time_entry: { date_at: '2015-10-11', minutes: 60 } }
			],
			decorator = new EntriesToDaysDecorator();
		decorator.addWorkingTimeToDays( this.days, testData );
		expect( this.days[ '2015-10-11' ].getMinutesWorked() ).to.equal( 105 );
	} );

	it( 'drops entries with no matching day', function () {
		var testData = [
				{ time_entry: { date_at: '2015-09-08', minutes: 45 } },
				{ time_entry: { date_at: '2015-10-11', minutes: 60 } }
			],
			decorator = new EntriesToDaysDecorator();
		decorator.addWorkingTimeToDays( this.days, testData );
		expect( this.days[ '2015-10-11' ].getMinutesWorked() ).to.equal( 60 );
		expect( Object.keys( this.days ).length ).to.equal( 2 );
	} );

	it( 'adds minutes from running trackers', function () {
		var testData = [
				{ time_entry: { date_at: '2015-10-11', minutes: 45, tracking: {
					minutes: 80
				} } },
				{ time_entry: { date_at: '2015-10-11', minutes: 60 } }
			],
			decorator = new EntriesToDaysDecorator();
		decorator.addWorkingTimeToDays( this.days, testData );
		expect( this.days[ '2015-10-11' ].getMinutesWorked() ).to.equal( 140 );
	} );

} );
