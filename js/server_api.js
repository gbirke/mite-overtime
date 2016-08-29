export const ERROR_SERVER = 500;
export const ERROR_CREDENTIALS = 403;

export default class ServerApi {
	constructor( baseUrl ) {
		this.baseUrl = baseUrl;
	}

	checkCredentials( account, apiKey ) {
		return new Promise( ( resolve, reject ) => {
			const xhr = new XMLHttpRequest();
			xhr.addEventListener( 'load', function () {
				if ( this.status !== 200 ) {
					// TODO Use Error subclass instead
					reject( ERROR_CREDENTIALS );
				} else {
					resolve( true );
				}
			} );
			xhr.addEventListener( 'error', function () {
				// TODO Use Error subclass instead
				reject( ERROR_SERVER );
			} );
			xhr.open( 'HEAD', this.baseUrl + 'myself.json', true );
			xhr.setRequestHeader( 'X-MiteAccount', account );
			xhr.setRequestHeader( 'X-MiteApiKey', apiKey );
			xhr.send();
		} );
	}

	loadEntries( account, apiKey, year, month ) {
		return new Promise( ( resolve, reject ) => {
			const xhr = new XMLHttpRequest();
			xhr.addEventListener( 'load', function () {
				let entries = [];
				if ( this.status !== 200 ) {
					// TODO Use Error subclass instead
					reject( ERROR_CREDENTIALS );
				} else {
					try {
						entries = JSON.parse( this.responseText )
					} catch ( e ) {
						// TODO Use Error subclass instead
						reject( ERROR_SERVER );
					}
					resolve( entries );
				}
			} );
			xhr.addEventListener( 'error', function () {
				// TODO Use Error subclass instead
				reject( ERROR_SERVER );
			} );
			xhr.open( 'GET', this.baseUrl + 'time_entries.json', true );
			xhr.setRequestHeader( 'X-MiteAccount', account );
			xhr.setRequestHeader( 'X-MiteApiKey', apiKey );
			xhr.send();
		} );
	}

}