import React from 'react';
import TaskBar from './TaskBar';
import HomeIcon from '@material-ui/icons/Home';
import { Card, Row, Col, Button, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ClassIcon from '@material-ui/icons/Class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playlists from './Playlists';

class Course extends React.Component {
    constructor() {
        super();
        this.handleHome = this.handleHome.bind(this);
    }
    handleHome() {
        this.props.history.replace('/home');
    }
    render() {
        console.log(this.props.history.location)
        return (<React.Fragment>
            <TaskBar />
            <div className='pl-4 pt-3'>
                <Button onClick={this.handleHome} variant="success" style={{ fontSize: "20px" }}> <HomeIcon className='mb-1' fontSize="medium" /> Home </Button>
            </div>
            <Row className='p-4'>
                <Col d-flex="true" justify-content-between="true" flex-columns="true">
                   <h1>{this.props.history.location.state.courseName}</h1> 
                </Col>
            </Row>
            <Row className='pl-4'>
                <Col d-flex="true" justify-content-between="true" flex-columns="true">
                    <span>Course doesn't have any content</span>
                </Col>
            </Row>
        </React.Fragment>)
    }
}

export default Course;