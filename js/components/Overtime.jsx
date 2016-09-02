import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function() {
	return (
		<Row>
			<Col md={1}/>
			<Col md={10} ><div>You'll see your overtime data soon.</div></Col>
			<Col md={1}/>
		</Row>
	);
};