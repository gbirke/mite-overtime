function DefaultObject( defaultData ) {
    this.defaultData = defaultData;
}

DefaultObject.prototype.getData = function( data, key ) {
    if ( data.hasOwnProperty( key ) ) {
        return data[key];
    }
    else {
        // Deep clone object
        return JSON.parse( JSON.stringify( this.defaultData ) );
    }
}

module.exports = DefaultObject;
