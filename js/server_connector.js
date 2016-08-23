module.exports = {
	create: function ( settings, xhrObject ) {
		return Object.create( {
			getData: function ( year, month, callback, errback ) {
				xhrObject.addEventListener( 'load', function () {
					var jsonData;
					try {
						jsonData = JSON.parse( this.responseText );
					} catch( e ) {
						jsonData = 'Invalid JSON';
					}
					// TODO: Handle 403 and 401 errors
					if ( this.status >= 400 ) {
						errback( 'Server Error, please check credentials. ' + jsonData, this );
					} else {
						// TODO avoid having invalid data in here
						callback( jsonData );
					}
				} );
				xhrObject.addEventListener( 'error', function () {
					var jsonData = JSON.parse( this.responseText );
					errback( jsonData || '', this );
				} );
				xhrObject.open( 'GET', settings.apiUrl, true );
				xhrObject.setRequestHeader( 'X-MiteAccount', settings.credentials.account );
				xhrObject.setRequestHeader( 'X-MiteApiKey', settings.credentials.apiKey );
				xhrObject.send();
			}
		} ); // END Object.create
	}
};
