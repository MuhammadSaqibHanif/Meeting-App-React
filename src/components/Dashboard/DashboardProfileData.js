import React from 'react';
import { Panel, Media, Button, ListGroup, ListGroupItem, Image } from 'react-bootstrap';

const DashboardProfileData = ({
  user,
  profileChange,
}) =>
	<div>
<br />
								<Panel eventKey="1" bsStyle="primary" style={{ marginRight: 20, marginLeft: 20 }}>
									<Panel.Heading>
										<Panel.Title componentClass="h3" toggle>
											<Media>
												<Media.Left>
													<img width={64} height={64} src={user.photoURL} alt="avatar" />
												</Media.Left>
												<Media.Body align='middle'>
													<Media.Heading>
														{user.displayName}
													</Media.Heading>
												</Media.Body>
											</Media>
										</Panel.Title>
									</Panel.Heading>
									<Panel.Body>
										<ListGroup>
											<ListGroupItem>
												<h4>Email@</h4>
												<h5>
													{user.email}
												</h5>
											</ListGroupItem>

											<ListGroupItem>
												<h4>Nick Name</h4>
												<h5>
													{user.name}
												</h5>
											</ListGroupItem>
											<ListGroupItem>
												<h4>Phone Number</h4>
												<h5>
													{user.phoneNumber}
												</h5>
											</ListGroupItem>

											<ListGroupItem>
												<h4>Beverages</h4>
												<h5>
													{user.beverages1 !== 'false' &&
														user.beverages1}
													&nbsp;&nbsp;&nbsp;&nbsp;
																	{user.beverages2 !== 'false' &&
														user.beverages2}
													&nbsp;&nbsp;&nbsp;&nbsp;
																	{user.beverages3 !== 'false' &&
														user.beverages3}
												</h5>
											</ListGroupItem>
											<ListGroupItem>
												<h4>Duration</h4>
												<h5>
													{user.duration1 !== 'false' &&
														user.duration1}
													&nbsp;&nbsp;&nbsp;&nbsp;
																	{user.duration2 !== 'false' &&
														user.duration2}
													&nbsp;&nbsp;&nbsp;&nbsp;
																	{user.duration3 !== 'false' &&
														user.duration3}
												</h5>
											</ListGroupItem>
											<ListGroupItem>
												<h4>Pictures</h4>
												<Image width={100} height={100} alt="pic1" src={user.pic1} responsive />
												<Image width={100} height={100} alt="pic2" src={user.pic2} responsive />
												<Image width={100} height={100} alt="pic3" src={user.pic3} responsive />
											</ListGroupItem>
											<ListGroupItem>
												<h4>Latitude & Longitude</h4>
												<h5>
													{user.myLat}
													&nbsp;&nbsp;&nbsp;&nbsp;
																	{user.myLng}
												</h5>
											</ListGroupItem>

										</ListGroup>;
														<Button onClick={profileChange} bsStyle="primary">
											Change Profile
														</Button>
									</Panel.Body>
								</Panel>
	</div>

export default DashboardProfileData;	