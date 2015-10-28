function ServerConnector( apiUrl, XMLHttpRequestClass, specialHeaders ) {
	this.apiUrl = apiUrl;
	this.xhrClass = XMLHttpRequestClass;
	this.specialHeaders = specialHeaders;
}

ServerConnector.prototype.getData = function ( callback, errback ) {
	var xhr = new this.xhrClass(),
		header;
	xhr.addEventListener( 'load', function () {
		var jsonData = JSON.parse( this.responseText );
		if ( this.status >= 400 ) {
			errback( this, jsonData );
		}
		else {
			callback( jsonData );
		}
	} );
	xhr.addEventListener( 'error', function () {
		var jsonData = JSON.parse( this.responseText );
		callback( jsonData );
	} );
	xhr.open( 'GET', this.apiUrl, true );
	if ( this.specialHeaders ) {
		for ( header in this.specialHeaders ) {
			xhr.setRequestHeader( header, this.specialHeaders[ header ] );
		}
	}
	xhr.send();
};

module.exports = ServerConnector;
