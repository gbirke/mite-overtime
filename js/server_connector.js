function ServerConnector( apiUrl, XMLHttpRequestClass ) {
	this.apiUrl = apiUrl;
	this.xhrClass = XMLHttpRequestClass;
}

ServerConnector.prototype.getData = function ( callback ) {
	var xhr = new this.xhrClass();
	xhr.addEventListener( 'load', function() { 
		var jsonData = JSON.parse( this.responseText );
		callback( jsonData ); 
	} );
	xhr.open( 'GET', this.apiUrl );
	xhr.send();
}

module.exports = ServerConnector;