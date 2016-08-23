/*jshint expr: true*/

var chai = require( 'chai' ),
	sinon = require( 'sinon' ),
	sinonChai = require( 'sinon-chai' ),
	PropertyWatcher = require( '../../../js/views/util/property_watcher' ),
	expect = chai.expect;

chai.use( sinonChai );

describe( 'stateHasChanged', function () {

	it( 'detects changed state', function () {
		var propertyValueObj = { v: 'foo' },
			stateValueObj = { v: 'bar' },
			props = {
				visible: true,
				obj: propertyValueObj
			},
			state = {
				visible: true,
				obj: stateValueObj,
				ignoredValue: 42
			};

		expect( PropertyWatcher.stateHasChanged( props, state ) ).to.be.true;
	} );

	it( 'detects unchanged state', function () {
		var propertyValueObj = { v: 'foo' },
			props = {
				visible: true,
				obj: propertyValueObj
			},
			state = {
				visible: true,
				obj: propertyValueObj,
				ignoredValue: 42
			};

		expect( PropertyWatcher.stateHasChanged( props, state ) ).to.be.false;
	} );

	it( 'can update properties', function () {
		var propertyValueObj = { v: 'foo' },
			stateValueObj = { v: 'bar' },
			props = {
				visible: true,
				obj: propertyValueObj
			},
			state = {
				visible: true,
				obj: stateValueObj,
				ignoredValue: 42
			},
			newProps = PropertyWatcher.updateProperties( props, state );

		expect( newProps.obj ).to.be.equal( stateValueObj );
		expect( newProps ).to.be.equal( props );
	} );

} );
