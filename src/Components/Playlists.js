import React, { useState } from 'react';
import { Card, Row, Col, Button, ListGroup, Modal } from 'react-bootstrap';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPlaylist, firstPlaylist } from './../Actions/PlaylistActions';

const mapStateToProps = state => ({
    myPlaylists: state.playlist.playlists
});

const mapDispatchToProps = dispatch => ({
    onAddPlaylist: (playlist) => dispatch(addPlaylist(playlist)),
    onFirstPlaylist: (playlist) => dispatch(firstPlaylist(playlist))
});

class Playlists extends React.Component {
    constructor() {
        super();

        this.state = { show: false, name: '' };

        this.handleClose= this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);

    }

    savePlaylist = name => {
        //start heree
        //this.props.savedCourses.push();
        if (this.props.myPlaylists.length > 0) {
            this.props.onAddPlaylist([name, []]);
        } else {
            var first = [[name, []]]
            this.props.onFirstPlaylist(first)
        }
        this.handleClose();
    }

    handleClose = () => { this.setState({ show: false, name: '' }) };
    handleShow = () => { this.setState({ show: true }) };

    createTable = myPlaylists => {
        const table = [];
        if (myPlaylists !== undefined && myPlaylists.length !== 0) {
            myPlaylists.sort((a, b) => {
                console.log(myPlaylists)
                if (a[0].toUpperCase() < b[0].toUpperCase()) {
                    return -1;
                }
                if (a[0].toUpperCase() === b[0].toUpperCase()) {
                    return 0;
                }
                return 1;
            });

            for (let i = 0; i < myPlaylists.length; i++) {
                table.push(
                    <ListGroup.Item>
                        {`${myPlaylists[i][0]}`}
                    </ListGroup.Item>
                )
            }
        }
        return table;
    }

    render() {
        return (<React.Fragment>
            <h4 className="mb-3 d-inline-block">Playlists</h4>
            <Button variant="success" className="float-right" onClick={this.handleShow}>New Playlist</Button>
            <ListGroup
                style={{
                    maxHeight: '1000px',
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                }}
            >
                {this.createTable(this.props.myPlaylists)}
            </ListGroup>

            <Modal show={this.state.show} onHide={this.handleClose} className="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>Create Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body><input value={this.state.name} onChange={e => this.setState({ name: e.target.value })}
                    type="text" className="form-control" id="name" placeholder="Enter Playlist Name" name="name" /> </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
            </Button>
                    <Button variant="success" onClick={this.savePlaylist.bind(this, this.state.name)}>
                        Save
            </Button>
                </Modal.Footer>
            </Modal>
            </React.Fragment>)
    }
}

Playlists.defaultProps = {
    myPlaylists: []
}
Playlists.propTypes = {
    myPlaylists: PropTypes.array.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlists);