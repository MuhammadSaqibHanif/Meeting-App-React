import React from 'react';
import { Panel, Media, Button } from 'react-bootstrap';

const DashboardInvitationData = ({
  invitationData,
  user,
  getDirection,
  onConfirm,
}) =>
	<div>
		<br />
		{invitationData.map((value, index) =>
									<div key={index}>
										{
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
															<Media.Right>
																<img width={64} height={64} src={user.pic1} alt="avatar" />
															</Media.Right>
														</Media>
													</Panel.Title>
												</Panel.Heading>
												<Panel.Body>
													<h4>Location: {value.place}</h4>
													<h4>Date & Time: {value.date}</h4>
													<h4>Duration: {value.meetingDuration}</h4>
													<h4>Status: {value.statuses}</h4>
													<Button onClick={() => getDirection(value.placeLat, value.placeLng)} bsStyle="primary">
														Get Direction
														</Button>
													&nbsp;&nbsp;&nbsp;
														<Button onClick={() => onConfirm(value.emailReff, 'ACCEPTED')} bsStyle="primary">
														Confirm
														</Button>
													&nbsp;&nbsp;&nbsp;
														<Button onClick={() => onConfirm(value.emailReff, 'CANCELLED')} bsStyle="primary">
														Cancel
														</Button>
												</Panel.Body>
											</Panel>
										}
									</div>
								)}		
	</div>

export default DashboardInvitationData;	