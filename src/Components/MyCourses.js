import React from 'react';
import TaskBar from './TaskBar';
import { Card, Row, Col, Button, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ClassIcon from '@material-ui/icons/Class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playlists from './Playlists';

const mapStateToProps = state => ({
    myCourses: state.savedCourses.myCourses,
    playlists: state.playlist.playlists
});

class MyCourses extends React.Component {

/*     constructor() {
        super();
        //this.course = this.course.bind(this);
    } */

  /*   course(name) {
        this.props.history.push({
            pathname: '/course',
            state: { courseName: 'wtf' }
        });
    } */

    createTable = myCourses => {
        const table = [];
        if (myCourses !== undefined && myCourses.length !== 0) {
            myCourses.sort((a, b) => {
                if (a[0].toUpperCase() < b[0].toUpperCase()) {
                    return -1;
                }
                if (a[0].toUpperCase() === b[0].toUpperCase()) {
                    return 0;
                }
                return 1;
            });

            for (let i = 0; i < myCourses.length; i++) {
                table.push(
                    <Row>
                        <Col className="col-9">
                            <ListGroup.Item>
                                <Link
                                    to={{
                                        pathname: "/course",
                                        state: { courseName: myCourses[i][0] }
                                    }}
                                >{`${myCourses[i][0]} - ${myCourses[i][1]}`}</Link>

                            </ListGroup.Item>
                        </Col>
                    <Col className="p-0">
                        <DropdownButton size="small" id="dropdown-basic-button" title="Add to Playlist" className="float-right" variant="info">
                            {this.props.playlists.map((item, index) => <Dropdown.Item value={item}>{item}</Dropdown.Item>)}
                        </DropdownButton>
                    </Col>
                    </Row >
                )
            }
        }
        return table;
    }

    render() {
        return (<React.Fragment>
            <Row className='p-4'>
                <Col d-flex="true" justify-content-between="true" flex-columns="true">
                    <h4 className="mb-3">Courses</h4>
                    <ListGroup
                    >
                        {this.createTable(this.props.myCourses)}
                    </ListGroup>
                </Col>
                <Col d-flex="true" justify-content-between="true" flex-columns="true" >
                    <Playlists></Playlists>
                </Col>
            </Row>
        </React.Fragment>)
    }
}

MyCourses.defaultProps = {
    myCourses: [],
    playlists: []
}
MyCourses.propTypes = {
    myCourses: PropTypes.array.isRequired,
    playlists: PropTypes.array.isRequired
}

export default connect(
    mapStateToProps
)(MyCourses);