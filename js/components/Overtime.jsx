import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactFauxDOM from 'react-faux-dom'
import EntryConverter from '../views/util/entry_converter'

const OvertimeFactory = require( '../overtime_factory' ),
	HtmlRenderer = require( '../html_renderer' );

class OvertimeDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { entries, currentDate, workingDays, hoursPerWeek, holidayFunction, locale } = this.props;
		const converter = new EntryConverter( this.props.overtimeFactory );
		function renderEntries(entries) {
			let el = ReactFauxDOM.createElement( 'div' );
			const renderer = new HtmlRenderer(el);
			renderer.render.apply(
				renderer,
				converter.getDataForRenderer( entries, currentDate, workingDays, hoursPerWeek, holidayFunction, locale )
			);
			return el.toReact();
		}
		return (
			<Row>
				<Col md={1}/>
				<Col md={10}>
					<div>{renderEntries(entries)}</div>
				</Col>
				<Col md={1}/>
			</Row>
		);
	}
}

OvertimeDisplay.propTypes = {
	entries: React.PropTypes.array,
	currentDate: React.PropTypes.string,
	workingDays: React.PropTypes.array,
	hoursPerWeek: React.PropTypes.number,
	holidayFunction: React.PropTypes.func,
	locale: React.PropTypes.string,
	overtimeFactory: React.PropTypes.func,
	htmlRenderer: React.PropTypes.object
};

OvertimeDisplay.defaultProps = {
	entries: [],
	workingDays: [1,2,3,4,5],
	hoursPerWeek: 40,
	holidayFunction: null,
	locale: 'de_DE',
	overtimeFactory: OvertimeFactory.createOvertimeFactory
};

const mapStateToProps = (state) => {
	return {
		entries: state.entries,
		currentDate: state.currentDate,
		workingDays: state.settings.workingDays,
		hoursPerWeek: state.settings.hoursPerWeek,
		locale: state.settings.locale
	};
};

const VisibleOvertimeDisplay = connect( mapStateToProps )( OvertimeDisplay );

export default VisibleOvertimeDisplay;