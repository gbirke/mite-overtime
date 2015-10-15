var expect = require( 'chai' ).expect,
	DefaultObject = require( '../js/default_object' );

describe( 'DefaultObject', function () {

	it( 'returns the default data when the key is missing', function () {
		var defaultData = { foo: 'bar' },
			defaultObject = new DefaultObject( defaultData ),
			result = defaultObject.getData( {}, 'missingKey' );
		expect( result ).to.deep.equal( defaultData );
	} );

	it( 'returns the existing data when the exists', function () {
		var defaultData = { foo: 'bar' },
			defaultObject = new DefaultObject( defaultData ),
			result = defaultObject.getData( { myKey: { baz: 42 } }, 'myKey' );
		expect( result ).to.deep.equal( { baz: 42 } );
	} );

	it( 'creates fresh copies of default data', function () {
		var defaultData = { foo: 0 },
			defaultObject = new DefaultObject( defaultData ),
			result1, result2;
		result1 = defaultObject.getData( {}, 'myKey' );
		result1.foo += 10;
		result2 = defaultObject.getData( {}, 'myKey' );
		expect( result2.foo ).to.equal( 0 );
	} );

	it( 'creates fresh deep copies of default data', function () {
		var defaultData = { foo: { bar: 0 } },
			defaultObject = new DefaultObject( defaultData ),
			result1, result2;
		result1 = defaultObject.getData( {}, 'myKey' );
		result1.foo.bar += 10;
		result2 = defaultObject.getData( {}, 'myKey' );
		expect( result2.foo.bar ).to.equal( 0 );
	} );

} );
