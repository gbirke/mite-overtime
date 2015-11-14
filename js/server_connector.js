module.exports = {
	create: function ( apiUrl, xhrObject ) {
		var account, apiKey;

		return Object.create( {
			getData: function ( year, month, callback, errback ) {
				xhrObject.addEventListener( 'load', function () {
					var jsonData = JSON.parse( this.responseText );
					if ( this.status >= 400 ) {
						errback( jsonData, this );
					}
					else {
						callback( jsonData );
					}
				} );
				xhrObject.addEventListener( 'error', function () {
					var jsonData = JSON.parse( this.responseText );
					errback( jsonData, this );
				} );
				xhrObject.open( 'GET', apiUrl, true );
				xhrObject.setRequestHeader( 'X-MiteAccount', account );
				xhrObject.setRequestHeader( 'X-MiteApiKey', apiKey );
				xhrObject.send();
			},
			onChangeCredentials: function( newCredentials ) {
				account = newCredentials.account || '';
				apiKey = newCredentials.apiKey || '';
			}
		} ); // END Object.create
	}
};
