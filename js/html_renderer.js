var d3 = require( 'd3' ),
	moment = require( 'moment' );

require( 'moment-duration-format' );

function DurationFormatter( localeName ) {
	this.formatString = 'h:mm';
}

DurationFormatter.prototype.format = function ( duration ) {
	return moment.duration( duration, 'minutes' )
		.format( this.formatString );
};

function HtmlRenderer( overtimeData ) {
	this.overtimeData = overtimeData;
}

HtmlRenderer.prototype.render = function () {
	var data = [ 25 ],
		formatter = new DurationFormatter( 'de' ),
		displayContainer, total;
	displayContainer = d3.select( '#displayContainer' );
	displayContainer.selectAll( 'div' ).remove();
	total = displayContainer.append( 'div' );
	total.attr( { id: 'totalOvertime' } )
		.text( formatter.format( this.overtimeData.total ) );
};

module.exports = HtmlRenderer;
