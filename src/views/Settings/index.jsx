import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Card, Badge, NavLink } from 'react-bootstrap';
import states from '../../utils/states';
import genders from '../../utils/genders';
import HeaderBg from '../../img/lock-bg.jpg';
import Avatar from '../../img/team/member2.jpg';

export default function Settings() {


    // const [user] = useState(() => getUserData());
    const [user] = useState({ fullName: 'Isah Ohieku' });
    const [modal, setModal] = useState(false);
    const [updateProfileLoading, setUpdateProfileLoading] = useState(false);

    const [profileForm, setProfileForm] = useState({
        stateOfOrigin: { value: 'null', error: '' },
        gender: { value: 'null', error: '' },
        occupation: { value: '', error: '' },
        address: { value: '', error: '' },
        dob: { value: '', error: '' },
    });

    const toggle = () => {
        setModal(!modal);
    }

    const handleChange = e => {
        const copy = { ...profileForm };
        copy[e.target.name].value = e.target.value;
        setProfileForm(copy);
    }

    return (
        <Fragment>
            <Container id="settings">
                <Row>
                    <Col lg={12}>
                        <div className="cover-profile">
                            <div className="profile-bg-img" style={{ background: `url(${HeaderBg}) no-repeat` }}>
                                <div className="card-block user-info">
                                    <div className="col-md-12">
                                        <div className="media-left">
                                            <NavLink className="profile-image">
                                                <img className="user-img img-radius" src={Avatar} alt="user-img" />
                                            </NavLink>
                                        </div>
                                        <div className="media-body row">
                                            <div className="col-lg-12">
                                                <div className="user-title">
                                                    <h2>{user.fullName}</h2>
                                                    <span className="text-white"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="pull-right cover-btn">
                                                    <button type="button" className="btn btn-light m-r-10 m-b-5 er-text-small"><i className="icofont icofont-plus"></i> Change Password</button>
                                                    <button type="button" onClick={toggle} className="btn btn-light ml-2 text-small"><i className="icofont icofont-ui-messaging"></i> Update Profile</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* About Me */}
                <Row>
                    <Col id="personal">
                        <Card class="mb-4">
                            <div class="card-header">
                                <h5 class="card_title mb-0">About Me</h5>
                            </div>
                            <div class="card-block">
                                <div class="view-info">
                                    <div class="general-info">
                                        <div class="row">
                                            <div class="col-lg-12 col-xl-6">
                                                <div class="table-responsive">
                                                    <table class="table m-0">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Full Name</th>
                                                                <td>David Jhon</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Gender</th>
                                                                <td>Male</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Email</th>
                                                                <td><a href="#!">example@example.com</a></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Birth Date</th>
                                                                <td>April 12, 1990</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-xl-6">
                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <tbody>

                                                            <tr>
                                                                <th scope="row">Occupation</th>
                                                                <td>(4479) - 9876567</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">State of Origin</th>
                                                                <td>Single</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Residential Address</th>
                                                                <td>London, UK</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Update Profile */}
            <Modal
                show={modal}
                onHide={toggle}
                centered
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body>
                    <h5 className="text-center mb-4 mt-3">Update Profile</h5>
                    <form>
                        {/* Occupation */}
                        <div className="form-group mb-0 had-danger">
                            <label className="col-form-label">Occupation</label>
                            <input className="form-control"
                                placeholder="Enter occupation"
                                onChange={handleChange}
                                value={profileForm.occupation.value}
                                name="occupation" />
                            {profileForm.occupation.error && <div className="form-control-feedback text-danger text-small">{profileForm.occupation.error}</div>}
                        </div>

                        {/* Gender */}
                        <div className="form-group mb-0 had-danger">
                            <label className="col-form-label">Gender</label>
                            <select className="custom-select"
                                onChange={handleChange}
                                value={profileForm.gender.value}
                                name="gender">
                                <option value="null">Select Gender</option>
                                {genders.map(type => <option value={type} key={type}>{type}</option>)}
                            </select>
                            {profileForm.gender.error && <div className="form-control-feedback text-danger text-small">{profileForm.gender.error}</div>}
                        </div>

                        {/* State of Origin */}
                        <div className="form-group mb-0 had-danger">
                            <label className="col-form-label">State of Origin</label>
                            <select className="custom-select"
                                onChange={handleChange}
                                value={profileForm.stateOfOrigin.value}
                                name="stateOfOrigin">
                                <option value="null">Select State of Origin</option>
                                {states.map(type => <option value={type} key={type}>{type}</option>)}
                            </select>
                            {profileForm.stateOfOrigin.error && <div className="form-control-feedback text-danger text-small">{profileForm.stateOfOrigin.error}</div>}
                        </div>

                        {/* Residential Address */}
                        <div className="form-group mb-0 had-danger">
                            <label className="col-form-label">Residential Address</label>
                            <textarea className="form-control"
                                placeholder="Enter residential address"
                                onChange={handleChange}
                                value={profileForm.address.value}
                                name="address"></textarea>
                            {profileForm.address.error && <div className="form-control-feedback text-danger text-small">{profileForm.address.error}</div>}
                        </div>

                        <div className="d-flex justify-content-center">
                            <button type="submit" onClick={onsubmit} className="btn btn-primary mt-5 d-inline-block mx-auto">Update
    {updateProfileLoading ? <i className="fa fa-spinner fa-spin ml-2"></i> : ''}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}