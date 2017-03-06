const moment = require( 'moment' );

export const ERROR_SERVER = 500;
export const ERROR_CREDENTIALS = 403;

function doRequest( url, account, apiKey, method='GET' ) {
	return new Promise( ( resolve, reject ) => {
		const xhr = new XMLHttpRequest();
		xhr.addEventListener( 'load', function () {
			if ( this.status !== 200 ) {
				// TODO Use Error subclass instead
				reject( ERROR_CREDENTIALS );
			} else {
				resolve( this.responseText );
			}
		} );
		xhr.addEventListener( 'error', function () {
			// TODO Use Error subclass instead
			reject( ERROR_SERVER );
		} );
		xhr.open( method, url, true );
		xhr.setRequestHeader( 'X-MiteAccount', account );
		xhr.setRequestHeader( 'X-MiteApiKey', apiKey );
		xhr.send();
	} );
}


export default class ServerApi {
	constructor( baseUrl ) {
		this.baseUrl = baseUrl;
	}

	checkCredentials( account, apiKey ) {
		return doRequest( this.baseUrl + 'myself.json', account, apiKey, 'HEAD' ).then( () => ( true ) )
	}

	loadEntries( account, apiKey, year, month ) {
			let from = moment( [ year, month ] );
			let to = moment( from ).add( 1, 'month' ).subtract( 1, 'day' );
			let params = '?from=' + from.format( 'YYYY-MM-DD' ) + 
			    '&to=' + to.format( 'YYYY-MM-DD' ) + 
			    '&user_id=current';
			return doRequest( this.baseUrl + 'time_entries.json' + params, account, apiKey ).then(
				( response ) => ( JSON.parse( response ) )
			);
	}

	getYearlyTime( account, apiKey, year ) {
		let from = moment( [ year, month ] );
		let to = moment( from ).add( 1, 'month' ).subtract( 1, 'day' );
		let params = '?from=' + from.format( 'YYYY-MM-DD' ) + 
		    '&to=' + to.format( 'YYYY-MM-DD' ) +
		    '&user_id=current';
		return doRequest( this.baseUrl + 'time_entries.json' + params, account, apiKey ).then(
			( response ) => ( JSON.parse( response ) )
		);
	}

}
