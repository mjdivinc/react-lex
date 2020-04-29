import React from 'react';
import TaskBar from './TaskBar';
import { Card, Row, Col, Button } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import ClassIcon from '@material-ui/icons/Class';
import HomeIcon from '@material-ui/icons/Home';
import { attemptMyCourses } from './../Actions/SavedCoursesActions';
import { attemptFind } from './../Actions/SavedCoursesActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    onFindCourse: (courses, history, courseList) => dispatch(attemptFind(courses, history, courseList)),
    onMyCourse: (courses, history, courseList) => dispatch(attemptMyCourses(courses, history, courseList))
});

class HomeScreen extends React.Component {
    constructor() {
        super();

        var courseList = [
            ['Math', 'Course'],
            ['Math Certification', 'Certification'],
            ['History', 'Course'],
            ['History Certification', 'Certification']
        ];

        this.state = { courses: courseList };

        this.handleFind = this.handleFind.bind(this);
        this.handleMy = this.handleMy.bind(this);

    }

    handleFind() {
        this.props.onFindCourse(this.props.history, this.state.courses);
        /* this.props.history.push({
            pathname: '/find-courses',
            state: { courses: this.state.courses }
        }); */
    }

    handleMy() {
        this.props.onMyCourse(this.props.history, this.state.courses);
    }

    render() {
        return (<React.Fragment>
            <TaskBar />
            <div className='pl-4 pt-3'>
                <Button onClick={this.handleHome} variant="success" style={{ fontSize: "20px" }} disabled> <HomeIcon className='mb-1' fontSize="medium" /> Home </Button>
            </div>

            <Row className='p-4 text-center'>
                <Col className='col-md-2 col-sm-1'></Col>
                <Col className='col-md-4 col-sm-5 p-4 text-center'>
                    <Card onClick={this.handleFind} style={{ borderWidth: "2px" }} className='p-3 text-center btn-outline-success'>
                        <Row> <Col><SearchIcon fontSize="large" className='mt-2'></SearchIcon></Col></Row>
                        <Row> <Col>

                            <p style={{ fontSize: "24px" }}>
                                Find Courses
                            </p>

                        </Col> </Row>
                    </Card>
                </Col>

                <Col className='col-md-4 col-sm-5 p-4'>
                    <Card onClick={this.handleMy} style={{ borderWidth: "2px" }} className='p-3 text-center btn-outline-success'>
                        <Row> <Col><ClassIcon fontSize="large" className='mt-2'></ClassIcon></Col></Row>
                        <Row> <Col>

                            <p style={{ fontSize: "24px" }}>
                                My Courses
                            </p>

                        </Col> </Row>
                    </Card>
                </Col>
                <Col className='col-md-2 col-sm-1'></Col>
            </Row>
        </React.Fragment>)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(HomeScreen);