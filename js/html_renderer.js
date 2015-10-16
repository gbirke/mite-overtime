var d3 = require( 'd3' ),
	moment = require( 'moment' );

require( 'moment-duration-format' );

function DurationFormatter( positiveFormat, negativeFormat  ) {
	this.positiveFormat = positiveFormat;
	this.negativeFormat = negativeFormat;
}

DurationFormatter.prototype.format = function ( duration ) {
	var fmt = duration > 0 ? this.positiveFormat : this.negativeFormat;
	console.log( fmt );
	return moment.duration( duration, 'minutes' )
		.format( fmt );
};

function HtmlRenderer( overtimeData ) {
	this.overtimeData = overtimeData;
}

HtmlRenderer.prototype.render = function () {
	var longFormatter = new DurationFormatter( 'h:mm [overtime]', 'h:mm [missing]' ),
		shortFormatter = new DurationFormatter( 'h:mm', '[-] h:mm' ),
		displayContainer, total, weeks;
	displayContainer = d3.select( '#displayContainer' );
	displayContainer.selectAll( 'div' ).remove();
	total = displayContainer.append( 'div' );
	total.attr( { id: 'totalOvertime' } )
		.text( longFormatter.format( this.overtimeData.total ) );
	weeks = displayContainer.append( 'div' ).attr( { id: 'weeks' } );
	weeks.selectAll( 'div' )
		.data( this.overtimeData.weeks )
		.enter()
		.append( 'div' )
		.attr( { 'class': 'week' } )
		.append( 'div' )
		.attr( { 'class': 'total' } )
		.text( function ( d ) {
			return longFormatter.format( d.total );
		} );
};

module.exports = HtmlRenderer;
