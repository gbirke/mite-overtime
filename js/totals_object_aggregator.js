var DefaultObject = require('./default_object');

function TotalsObjectAggregator( defaultData ) {
    defaultData.total = 0;
    this.defaultObject = new DefaultObject( defaultData );
}

TotalsObjectAggregator.prototype.getData = function( data, key, addToTotal ) {
    var newValue = this.defaultObject.getData( data, key );
    newValue.total += addToTotal;
    return newValue;
}

module.exports = TotalsObjectAggregator;
