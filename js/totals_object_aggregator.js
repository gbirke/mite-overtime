var DefaultObject = require('./default_object');

function TotalsObjectAggregator( defaultData ) {
    var defaultDataWithTotalProperty = Object.create( defaultData );
    defaultDataWithTotalProperty.total = 0;
    this.defaultObject = new DefaultObject( defaultDataWithTotalProperty );
}

TotalsObjectAggregator.prototype.getData = function( data, key, addToTotal ) {
    var newValue = this.defaultObject.getData( data, key );
    newValue.total += addToTotal;
    return newValue;
}

module.exports = TotalsObjectAggregator;
