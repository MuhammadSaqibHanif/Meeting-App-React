import React from 'react';
import { Panel, Media } from 'react-bootstrap';

const DashboardData = ({
  userData,
  statusTitle,
}) =>
	<div>
		<br />
		{userData.map((value, index) =>
			<div key={index}>
				{value.statuses === statusTitle &&
					<Panel eventKey="1" bsStyle="primary" style={{ marginRight: 20, marginLeft: 20 }}>
						<Panel.Heading>
							<Panel.Title componentClass="h3" toggle>
								<Media>
									<Media.Left>
										<img width={64} height={64} src={value.avatar} alt="avatar" />
									</Media.Left>
									<Media.Body align='middle'>
										<Media.Heading>
											{value.name}
										</Media.Heading>
									</Media.Body>
								</Media>
							</Panel.Title>
						</Panel.Heading>
						<Panel.Body>													
							<h4>Location: {value.place}</h4>
							<h4>Date & Time: {value.date}</h4>
							<h4>Status: {value.statuses}</h4>
						</Panel.Body>
					</Panel>
				}
			</div>
		)}		
	</div>

export default DashboardData;	