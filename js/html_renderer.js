var d3 = require( 'd3' ),
	moment = require( 'moment' ),
	longFormatter, shortFormatter;

require( 'moment-duration-format' );

// jscs:disable disallowDanglingUnderscores

function DurationFormatter( positiveFormat, negativeFormat, absoluteValue ) {
	this.positiveFormat = positiveFormat;
	this.negativeFormat = negativeFormat;
	this.absoluteValue = absoluteValue;
}

DurationFormatter.prototype.format = function ( duration ) {
	var fmt = duration > 0 ? this.positiveFormat : this.negativeFormat;
	if ( this.absoluteValue ) {
		duration = Math.abs( duration );
	}
	return moment.duration( duration, 'minutes' )
		.format( fmt, { trim: false } );
};

longFormatter = new DurationFormatter( 'h:mm [overtime]', 'h:mm [missing]', true );
shortFormatter = new DurationFormatter( 'h:mm', 'h:mm', false );

function HtmlRenderer( elementName ) {
	this.overtimeData = {};
	this.elementName = elementName;
}

HtmlRenderer.prototype.render = function ( calendarData, overtimeData ) {
	var	displayContainer, total, weekContainers, weeks;

	this.overtimeData = overtimeData;
	displayContainer = d3.select( this.elementName ).data( [ calendarData ] );
	displayContainer.selectAll( 'div, h1' )
		.remove();

	this._renderTotal( displayContainer );
	this._renderWeeks( displayContainer );
};

HtmlRenderer.prototype._renderTotal = function ( displayContainer ) {
	var self = this,
		totalElement;

	displayContainer.append( 'h1' ).text( function ( d ) {
		var headingTime;
		moment.locale( 'en' ); // use english locale to display english month names
		headingTime = moment( [ d.year, d.month ] );

		return 'Total for ' + headingTime.format( 'MMMM YYYY' );
	} );
	totalElement = displayContainer.append( 'div' )
		.attr( { id: 'totalOvertime' } )
		.text( function ( ) {
			if ( self.overtimeData.timeDelta ) {
				return longFormatter.format( self.overtimeData.timeDelta );
			}
		} );
	return totalElement;
};

HtmlRenderer.prototype._renderWeeks = function ( displayContainer ) {
	var weekContainer = displayContainer.append( 'div' ).classed( 'weeks', true ),
		self = this,
		weeks = weekContainer.selectAll( '.week' )
			.data( function ( d ) {
				return d3.values( d.weeks );
			} )
			.enter()
			.append( 'div' )
			.classed( 'week', true );

	weeks.append( 'h2' )
		.text( function ( d ) {
			return 'Week ' + d.week;
		} )
		.classed( 'weekNumber', true );

	weeks.append( 'h3' )
			.text( function ( d ) {
				var datePieces = [];
				if ( d.start.month() === d.end.month() ) {
					datePieces.push(  d.start.format( 'DD.' ) );
					datePieces.push(  d.end.format( 'DD.MM.' ) );
				}
				else {
					datePieces.push(  d.start.format( 'DD.MM.' ) );
					datePieces.push(  d.end.format( 'DD.MM.' ) );
				}
				return datePieces.join( ' - '  );
			} )
			.classed( 'weekDates', true );

	weeks.append( 'div' )
		.classed( 'total', true )
		.text( function ( d ) {
			if ( typeof self.overtimeData.weeks !== 'undefined' && d.week in self.overtimeData.weeks ) {
				return longFormatter.format( self.overtimeData.weeks[ d.week ].timeDelta );
			} else {
				return '';
			}
		} );
	return weeks;
};

module.exports = HtmlRenderer;
