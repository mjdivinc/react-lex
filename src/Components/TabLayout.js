import React from 'react';
import TaskBar from './TaskBar';
import { Card, Row, Col, Button, ListGroup, Tabs, Tab } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import ClassIcon from '@material-ui/icons/Class';
import HomeIcon from '@material-ui/icons/Home';
import { attemptSave } from '../Actions/SavedCoursesActions';
import "../App.css"
import { connect } from 'react-redux';
import Find from './Find';
import MyCourses from './MyCourses';

const mapStateToProps = state => ({
    saved: state.savedCourses.courseList
});

const mapDispatchToProps = dispatch => ({
    onSaveCourse: (courses) => dispatch(attemptSave(courses))
});

class TabLayout extends React.Component {

    constructor() {
        super();
        this.handleHome = this.handleHome.bind(this);
    }

    componentWillMount() {
        this.setState({
            courses: this.props.saved
        });
    }

    handleHome() {
        this.props.history.replace('/home');
    }

    render() {
        //console.log(this.props.history.location.state)
        return (<React.Fragment>
            <TaskBar />
            <div className='pl-4 pt-3'>
                <Button onClick={this.handleHome} variant="success" style={{ fontSize: "20px" }}> <HomeIcon className='mb-1' fontSize="medium" /> Home </Button>
            </div>
            <Row><Col className="p-4 pl-5 pr-5">
                <Tabs justify className="myClass" defaultActiveKey={this.props.history.location.state.tab}>
                    <Tab eventKey="findCourses" title="Find Courses">
                        <Find></Find>

                    </Tab>
                    <Tab eventKey="myCourses" title="My Courses">
                        <MyCourses history={this.props.history}></MyCourses>
                    </Tab>
                </Tabs>
            </Col></Row>

        </React.Fragment>)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabLayout);