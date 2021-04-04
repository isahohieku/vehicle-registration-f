import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Modal, Card, NavLink } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { getUserData, setUserData } from '../../utils/helpers';
import { updateRequest } from '../../utils/axios';
import states from '../../utils/states';
import genders from '../../utils/genders';
import { getFullMonth } from '../../utils/month';
import HeaderBg from '../../img/lock-bg.jpg';
import Avatar from '../../img/team/member2.jpg';
import 'react-datepicker/dist/react-datepicker.css';

export default function Settings() {

    const [modal, setModal] = useState(false);
    const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
    const [profileForm, setProfileForm] = useState({
        stateOfOrigin: { value: 'null', error: '' },
        gender: { value: 'null', error: '' },
        occupation: { value: '', error: '' },
        address: { value: '', error: '' },
        dob: { value: new Date(), error: '' },
    });
    const [user, setUser] = useState(getUserData());


    const toggle = () => {
        setModal(!modal);
    }

    const handleChange = e => {
        const copy = { ...profileForm };
        copy[e.target.name].value = e.target.value;
        setProfileForm(copy);
    }

    const onDobChange = (dob) => {
        const copy = { ...profileForm };
        copy.dob.value = dob;
        setProfileForm(copy);
    }

    const onsubmit = e => {
        e.preventDefault();
        const { stateOfOrigin, gender, occupation, address, dob } = profileForm;
        stateOfOrigin.error = '';
        gender.error = '';
        occupation.error = '';
        address.error = '';
        dob.error = '';

        if (stateOfOrigin.value === 'null') {
            stateOfOrigin.error = 'Please select State';
        }

        if (gender.value === 'null') {
            gender.error = 'Please select Gender';
        }

        if (!occupation.value) {
            occupation.error = 'Please enter your occupation';
        }

        if (!address.value) {
            address.error = 'Please enter your address';
        }

        setProfileForm({ stateOfOrigin, gender, occupation, address, dob });

        if (stateOfOrigin.error ||
            gender.error ||
            occupation.error
            || address.error || dob.error) {
            return;
        }

        const path = 'user';
        const data = {
            id: user.id,
            stateOfOrigin: stateOfOrigin.value,
            gender: gender.value,
            occupation: occupation.value,
            dob: dob.value,
            address: address.value,
        }

        setUpdateProfileLoading(true);
        updateRequest(path, data)
            .then(res => {
                setUpdateProfileLoading(false);
                setUserData(res.data.data);
                setUser(res.data.data)
                toggle();
            })
            .catch(e => { console.log(e); setUpdateProfileLoading(false); });
    }

    const getDate = (item) => {
        const date = new Date(item);
        return `${getFullMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
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
                                                    <h2>{user.firstName} {user.lastName}</h2>
                                                    <span className="text-white">{user.occupation}</span>
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
                        <Card className="mb-4">
                            <div className="card-header">
                                <h5 className="card_title mb-0">About Me</h5>
                            </div>
                            <div className="card-block">
                                <div className="view-info">
                                    <div className="general-info">
                                        <div className="row">
                                            <div className="col-lg-12 col-xl-6">
                                                <div className="table-responsive">
                                                    <table className="table m-0">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Full Name</th>
                                                                <td>{user.firstName} {user.lastName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Gender</th>
                                                                <td><span className="text-capitalize">{user.gender}</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Email</th>
                                                                <td><NavLink className="pl-0">{user.email}</NavLink></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Birth Date</th>
                                                                <td>{user.dob && getDate(user.dob)}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-xl-6">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <tbody>

                                                            <tr>
                                                                <th scope="row">Occupation</th>
                                                                <td>{user.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">State of Origin</th>
                                                                <td>{user.stateOfOrigin}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Residential Address</th>
                                                                <td>{user.address}</td>
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

                        {/* Date of Birth */}
                        <div className="form-group mb-0 had-danger">
                            <p className="col-form-label">Date of Birth</p>
                            <DatePicker
                                onChange={onDobChange}
                                selected={profileForm.dob.value}
                                placeholderText='Date of Birth'
                                className='border form-control'
                                value={profileForm.dob.value}
                            />
                            {profileForm.dob.error && <div className="form-control-feedback text-danger text-small">{profileForm.dob.error}</div>}
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