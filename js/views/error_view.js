
module.exports = {
	create: function ( element, errorStore ) {
		return Object.create( {
			init: function() {
				errorStore.listen( this.update );
			},
			update: function( data ) {
                element.find( '.modal-body' ).html('<p>' + errorStore.message + '</p>');
				element.modal()
			}
		} );
	},
	createAndInit: function( element, errorStore ) {
		var view = this.create( element, errorStore );
		view.init();
		return view;
	}
}
