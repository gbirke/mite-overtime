function DefaultObject( defaultData ) {
    this.defaultData = defaultData;
}

DefaultObject.prototype.getData = function( data, key ) {
    if ( data.hasOwnProperty( key ) ) {
        return data[key];
    }
    else {
        return Object.create( this.defaultData );
    }
}

module.exports = DefaultObject;
