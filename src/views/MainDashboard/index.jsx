import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Card, Badge } from 'react-bootstrap';
import { CheckCircle, XCircle, MoreHorizontal } from 'react-feather';
import { getUserData } from '../../utils/helpers';
import { getRequest } from '../../utils/axios';
import ApplicationsTable from '../../components/ApplicationsTable';
import Loader from '../../components/Loader';

import BackImage from '../../img/icon-bg.png';

export default function MainDashboard() {
    const [loading, setLoading] = useState(false);
    const [applicationsLoading, setApplicationsLoading] = useState(null);
    const [applications, setApplications] = useState([]);
    const [user] = useState(() => getUserData());

    useEffect(() => {
        getApplications();
    }, [user]);

    const getApplications = () => {
        const url = `applications`;

        setApplicationsLoading(true);
        getRequest(url)
            .then(res => {
                setApplicationsLoading(false);
                if (res.data.data.length) {
                    setApplications(res.data.data);
                }
            })
            .catch(e => { console.log(e); setApplicationsLoading(false) });
    }

    return (
        <Fragment>
            <Container id="main-dashboard">
                <Row>
                    {!loading && <Col md={4}>
                        <Card className="card-icon rt_icon_card mb-0 mb-mob-4 text-center">
                            <Card.Body>
                                <span className="heading_icon">
                                    <img src={BackImage} alt="back icon" />
                                    <CheckCircle size={50} className="er-text-primary" />
                                </span>
                                <div className="icon_specs">
                                    <p>Approved</p>
                                    <span>{applications.filter(item => item.status === 'approved').length}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>}
                    {!loading && <Col md={4}>
                        <Card className="card-icon rt_icon_card mb-0 mb-mob-4 text-center">
                            <Card.Body>
                                <span className="heading_icon">
                                    <img src={BackImage} alt="back icon" />
                                    <XCircle size={50} className="er-text-primary" />
                                </span>
                                <div className="icon_specs">
                                    <p>Rejected</p>
                                    <span>{applications.filter(item => item.status === 'rejected').length}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>}
                    {!loading && <Col md={4}>
                        <Card className="card-icon rt_icon_card mb-0 mb-mob-4 text-center">
                            <Card.Body>
                                <span className="heading_icon">
                                    <img src={BackImage} alt="back icon" />
                                    <MoreHorizontal size={50} className="er-text-primary" />
                                </span>
                                <div className="icon_specs">
                                    <p>Pending</p>
                                    <span>{applications.filter(item => item.status === 'pending').length}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>}
                </Row>
                <Row>
                    <Col>
                        {!applicationsLoading && <Card className="mt-5 border-0">
                            <Card.Body>
                                <h4 className="card_title">Recent Applications</h4>
                                <div className="single-table">
                                    <div className="table-responsive">
                                        {!applicationsLoading && applications.length ?
                                            <ApplicationsTable applications={applications} /> : <p className="text-center er-text-primary my-5">No Applications Found</p>}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>}

                        {applicationsLoading && <Loader />}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}