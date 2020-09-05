import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Card } from 'react-bootstrap';
import { Plus } from 'react-feather';
import { getUserData } from '../../utils/helpers/index';
import { postRequest, getRequest } from '../../utils/axios';
import ApplicationsTable from '../../components/ApplicationsTable';
import states from '../../utils/states';
import vehicles from '../../utils/vehicles';
import './index.scss';

export default function Applications() {
    const [modal, setModal] = useState(false);
    const [applications, setApplications] = useState([]);
    const [applicationsLoading, setApplicationsLoading] = useState(false);
    const [addApplicationsLoading, setaddApplicationsLoading] = useState(false);
    const [user] = useState(() => getUserData());
    const [applicationForm, setApplicationForm] = useState({
        applicationState: { value: 'null', error: '' },
        applicationType: { value: 'first', error: '' },
        vehicleType: { value: 'null', error: '' }
    });

    useEffect(() => {
        // getApplications();
    }, [user]);

    const toggle = () => {
        setModal(!modal);
    }

    const handleChange = e => {
        const copy = { ...applicationForm };
        copy[e.target.name].value = e.target.value;
        setApplicationForm(copy);
    }

    const getApplications = () => {
        const url = `applications`;

        setApplicationsLoading(true);
        getRequest(url)
            .then(res => {
                setApplicationsLoading(false);
                setApplications(res.data.data);
            })
            .catch(e => { console.log(e); setApplicationsLoading(false) });
    }

    const onsubmit = e => {
        e.preventDefault();
        const { applicationType, applicationState, vehicleType } = applicationForm;
        applicationType.error = '';
        applicationState.error = '';
        vehicleType.error = '';

        if (applicationState.value === 'null') {
            applicationState.error = 'Please select State'
        }

        if (vehicleType.value === 'null') {
            vehicleType.error = 'Please select Vehicle'
        }

        setApplicationForm({ applicationState, applicationType, vehicleType });

        if (applicationState.error || vehicleType.error) {
            return;
        }

        const path = 'application';
        const data = {
            vehicle: vehicleType.value,
            state: applicationState.value,
            occurence: applicationType.value
        }

        setaddApplicationsLoading(true);
        postRequest(path, data)
            .then(res => {
                setaddApplicationsLoading(false);
                getApplications();
                toggle();
            })
            .catch(e => { console.log(e); setaddApplicationsLoading(false); });
    }

    return (
        <Fragment>
            <Container id="applications">
                <Row>
                    <Col className="d-flex justify-content-end">
                        <button className="btn d-flex align-items-center er-text-primary" onClick={toggle}>
                            <span className="mb-0">New Application</span>
                            <Plus size={22} className="ml-3" />
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="mt-5 border-0">
                            <Card.Body>
                                <h4 className="card_title">All Applications</h4>
                                <div className="single-table">
                                    <div className="table-responsive">
                                        {!applicationsLoading && applications.length ? 
                                        <ApplicationsTable /> : <p className="text-center er-text-primary my-5">No Applications Found</p>}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={modal}
                onHide={toggle}
                centered
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body>
                    <h5 className="text-center mb-4 mt-3">New Application</h5>
                    <form>
                        <div className="form-group mb-0 had-danger">
                            <label className="col-form-label">Vehicle Type</label>
                            <select className="custom-select"
                                onChange={handleChange}
                                value={applicationForm.vehicleType.value}
                                name="vehicleType">
                                <option value="null">Select Vehicle type</option>
                                {vehicles.map(type => <option value={type} key={type}>{type}</option>)}
                            </select>
                            {applicationForm.vehicleType.error && <div className="form-control-feedback text-danger text-small">{applicationForm.vehicleType.error}</div>}
                        </div>
                        <div className="form-group mb-0 had-danger mt-3">
                            <p className="col-form-label">Application type</p>
                            <div className="custom-control custom-radio primary-radio custom-control-inline">
                                <input
                                    type="radio"
                                    checked={applicationForm.applicationType.value === 'first'}
                                    value="first"
                                    id="application-type-first"
                                    name="applicationType"
                                    className="custom-control-input"
                                    onChange={handleChange}
                                />
                                <label className="custom-control-label" for="application-type-first">First time</label>
                            </div>
                            <div className="custom-control custom-radio primary-radio custom-control-inline">
                                <input
                                    type="radio"
                                    checked={applicationForm.applicationType.value === 'renewal'}
                                    id="application-type-renewal"
                                    value="renewal"
                                    name="applicationType"
                                    className="custom-control-input"
                                    onChange={handleChange} />
                                <label className="custom-control-label" for="application-type-renewal">Renewal</label>
                            </div>
                            {applicationForm.applicationType.error && <div className="form-control-feedback text-danger text-small">{applicationForm.applicationType.error}</div>}
                        </div>
                        <div className="form-group mb-0 had-danger mt-3">
                            <label className="col-form-label">Application State</label>
                            <select className="custom-select"
                                onChange={handleChange}
                                value={applicationForm.applicationState.value}
                                name="applicationState">
                                <option value="null">Select Application state</option>
                                {states.map(type => <option value={type} key={type}>{type}</option>)}
                            </select>
                            {applicationForm.applicationState.error && <div className="form-control-feedback text-danger text-small">{applicationForm.applicationState.error}</div>}
                        </div>

                        <div className="d-flex justify-content-center">
                            <button type="submit" onClick={onsubmit} className="btn btn-primary mt-5 d-inline-block mx-auto">Submit Application
    {addApplicationsLoading ? <i className="fa fa-spinner fa-spin ml-2"></i> : <i className="ti ti-plus  ml-2"></i>}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}