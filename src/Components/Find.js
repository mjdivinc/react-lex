import React from 'react';
import TaskBar from './TaskBar';
import { Card, Row, Col, Button, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ClassIcon from '@material-ui/icons/Class';
import HomeIcon from '@material-ui/icons/Home';
import { attemptSave, attemptFirst } from './../Actions/SavedCoursesActions';
import "../App.css"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
    saved: state.savedCourses.courseList,
    myCourses: state.savedCourses.myCourses
});

const mapDispatchToProps = dispatch => ({
    onSaveCourse: (courses) => dispatch(attemptSave(courses)),
    onFirstCourse: (course) => dispatch(attemptFirst(course))
});

class Find extends React.Component {

    constructor() {
        super();
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
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

    saveCourse = index => {
        //start heree
        //this.props.savedCourses.push();
        console.log(this.props.myCourses);
        console.log(this.state.courses[index]);
        //this.props.myCourses.push(this.state.courses[index])
        if (this.props.myCourses.includes(this.state.courses[index]) === false) {
            if (this.props.myCourses.length > 0) {
                this.props.onSaveCourse(this.state.courses[index]);
            } else {
                var first = [this.state.courses[index]]
                this.props.onFirstCourse(first)
            }
        }

    }

    handleSearchInput(e) {
        const searchText = e.target.value;
        const filteredItems = this.props.saved.filter(
            item => item[0].concat(item[1]).toUpperCase().search(searchText.toUpperCase()) > -1
        );
        this.setState({ courses: filteredItems })
    }

    createTable = courses => {
        const table = [];
        if (courses !== undefined && courses.length !== 0) {
            courses.sort((a, b) => {
                if (a[0].toUpperCase() < b[0].toUpperCase()) {
                    return -1;
                }
                if (a[0].toUpperCase() === b[0].toUpperCase()) {
                    return 0;
                }
                return 1;
            });

            for (let i = 0; i < courses.length; i++) {
                table.push(
                    <ListGroup.Item>
                        <Link
                                    to={{
                                        pathname: "/course",
                                        state: { courseName: courses[i][0] }
                                    }}
                                >{`${courses[i][0]} - ${courses[i][1]}`}</Link>
                        <button
                            className="btn-outline-secondary d-inline-flex rounded ml-5 medium mt-1"
                            type="button"
                            onClick={this.saveCourse.bind(this, i)}
                        >
                            {' '}
                            Save Course
                        </button>
                    </ListGroup.Item>
                )
            }
        }
        return table;
    }

    render() {
        console.log(this.props.myCourses)
        return (<React.Fragment>
            <Row className='p-4'>
                <Col d-flex="true" justify-content-between="true" flex-columns="true">
                    <div>
                        <h5>
                            Filter Courses:
                                </h5>
                        <input
                            className="filter form-control"
                            onInput={this.handleSearchInput}
                            type="text"
                            placeholder="Search for a Course"
                        />
                    </div>
                </Col>
            </Row>
            <Row className='p-4'>
                <Col d-flex="true" justify-content-between="true" flex-columns="true">
                    <ListGroup
                        style={{
                            maxHeight: '1000px',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}
                    >
                        {this.createTable(this.state.courses)}
                    </ListGroup>
                </Col>
            </Row>

        </React.Fragment>)
    }
}

Find.defaultProps = {
    myCourses: []
}
Find.propTypes = {
    myCourses: PropTypes.array.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Find);