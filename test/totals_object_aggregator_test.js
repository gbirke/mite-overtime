var expect = require('chai').expect,
    TotalsObjectAggregator = require('../js/totals_object_aggregator');

describe( 'TotalsObjectAggregator', function() {

    it( 'creates total when key is missing', function() {
        var defaultObject = new TotalsObjectAggregator( { foo: "bar" } ),
            result = defaultObject.getData( {}, "missingKey", 42 );
        expect( result ).to.deep.equal( { foo: "bar", total: 42 } );
    } );

    it( 'adds to total when key is exists', function() {
        var defaultObject = new TotalsObjectAggregator( { foo: "bar" } ),
            testData = { "existingKey": { total: 23 } },
            result = defaultObject.getData( testData, "existingKey", 42 );
        expect( result ).to.deep.equal( { total: 65 } );
    } );

} );
