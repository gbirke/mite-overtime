let chai = require( 'chai' ),
	expect = chai.expect,
	sinon = require( 'sinon' ),
	chaiAsPromised = require('chai-as-promised'),
	ServerApi = require( '../js/server_api' ).default;

chai.use(chaiAsPromised);

describe( 'serverApi', () => {

	const baseUrl = 'http://test.example.com/';

	let xhr;
	let requests;

	beforeEach(() => {
		xhr = sinon.useFakeXMLHttpRequest();
		global.XMLHttpRequest = xhr;
		requests = [];
		/* eslint no-shadow: 1*/
		xhr.onCreate = (xhr) => {
			requests.push(xhr);
		};
	});

	afterEach(() => {
		xhr.restore();
	});

	describe( '#checkCredentials', () => {

		it( 'sends api key and account as header', () => {
			const api = new ServerApi( baseUrl );
			let r = api.checkCredentials( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);
			expect( requests[0].requestHeaders ).to.include.key( 'X-MiteAccount' );
			expect( requests[0].requestHeaders ).to.include.key( 'X-MiteApiKey' );
		} );

		it( 'builds the URL', () => {
			const api = new ServerApi( baseUrl );
			let r = api.checkCredentials( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);
			expect( requests[0].url ).to.equal( 'http://test.example.com/myself.json' );
		} );

		it( 'sends only a HEAD request', () => {
			const api = new ServerApi( baseUrl );
			let r = api.checkCredentials( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);
			expect( requests[0].method ).to.equal( 'HEAD' );
		} );

		it( 'resolves promise when server returns status 200', () => {
			const api = new ServerApi( baseUrl );
			let r = api.checkCredentials( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);
			requests[0].respond(200, {}, '' );
			expect( r ).to.be.eventually.true;
			return r;
		} );

		it( 'rejects promise when server returns status >200', ( done ) => {
			const api = new ServerApi( baseUrl );
			let r = api.checkCredentials( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);

			requests[0].respond( 400, {}, '' );
			expect( r ).to.be.rejected.notify(done);
		} );



	} );

	describe( '#loadEntries', () => {
		it( 'sends api key and account as header', () => {
			const api = new ServerApi( baseUrl );
			let r = api.loadEntries( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);
			expect( requests[0].requestHeaders ).to.include.key( 'X-MiteAccount' );
			expect( requests[0].requestHeaders ).to.include.key( 'X-MiteApiKey' );
		} );

		it( 'resolves promise with JSON data when server returns status 200', ( done ) => {
			const api = new ServerApi( baseUrl );
			let r = api.loadEntries( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);
			requests[0].respond(200, { "Content-Type": "application/json" }, '[{ "time_entry": "just fake" }]' );
			expect( r ).to.eventually.be.deep.equal( [ { time_entry: "just fake" } ] ).notify( done );
		} );

		it( 'rejects promise when server returns status >200', ( done ) => {
			const api = new ServerApi( baseUrl );
			let r = api.loadEntries( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);
			requests[0].respond( 500, {}, '' );
			expect( r ).to.be.rejected.notify( done );
		} );

		it( 'rejects promise when server JSON cannot be parsed', ( done ) => {
			const api = new ServerApi( baseUrl );
			let r = api.loadEntries( 'accountName', 'valid key' );
			expect( requests ).to.have.length(1);
			requests[0].respond( 200, { "Content-Type": "text/html" }, '<p>Oh noes!</p>' );
			expect( r ).to.be.rejected.notify( done );
		} );

	} );

} );