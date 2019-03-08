import React, {Component} from 'react';
import $ from 'jquery';
import _ from 'lodash';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            items: [
                {id: 1, title: 'Go to office at 9.00 AM'},
                {id: 2, title: 'Take a tea break at 11:00 AM'},
                {id: 3, title: 'Submit daily status to the boss at 3:00 PM'}
            ]
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (_.isEmpty(e.target.title.value)) {
            alert("Field can't be empty.");
            return;
        }

        let item = {
            id: this.state.items.length + 1,
            title: e.target.title.value
        };

        let items = this.state.items.concat(item);
        this.setState({items: items});
        e.target.title.value = "";
        $('#addModal').modal('toggle');
    };

    handleEdit = id => e => {
        let item = this.state.items.find(item => {
            return item.id === id;
        });

        $("#editForm #id").val(item.id);
        $("#editForm #title").val(item.title);
        $('#editModal').modal('show');
    };

    handleUpdate = e => {
        e.preventDefault();
        let item = {
            id: e.target.id.value,
            title: e.target.title.value
        };

        let getItemIndex = this.state.items.findIndex(item => {
            return item.id === parseInt(e.target.id.value);
        });

        let items = this.state.items;
        items[getItemIndex] = item;
        this.setState({ items: items });
        $('#editModal').modal('toggle');
    };

    handleDelete = id => e => {
        e.preventDefault();
        let items = this.state.items.filter(item => {
            return item.id !== id;
        });

        this.setState({items: items});
    };

    render() {
        return (
            <div className="app">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <fieldset>
                                <legend>TODO LIST
                                    <button className="btn btn-outline-success float-right" data-toggle="modal"
                                            data-target="#addModal">
                                        <i className="fa fa-plus"></i> New
                                    </button>
                                </legend>
                                <table className="table table-striped">
                                    <tbody>
                                    {this.state.items.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td style={{width: '50px'}}>
                                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <button className="btn btn-info" onClick={this.handleEdit(item.id)}>
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-danger"
                                                            onClick={this.handleDelete(item.id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </fieldset>

                            {/*ADD ITEM MODAL*/}
                            <form method="post" onSubmit={this.handleSubmit} id="addForm">
                                <div className="modal fade" id="addModal" tabIndex="-1" role="dialog"
                                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Add Item</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <textarea className="form-control" name="title" cols="30" rows="5"
                                                          placeholder="Enter your task description"></textarea>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Close
                                                </button>
                                                <button type="submit" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/*EDIT ITEM MODAL*/}
                            <form method="post" onSubmit={this.handleUpdate} id="editForm">
                                <input type="hidden" name="id" id="id" value=""/>
                                <div className="modal fade" id="editModal" tabIndex="-1" role="dialog"
                                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Edit Item</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <textarea className="form-control" name="title" id="title" cols="30"
                                                          rows="5"
                                                          placeholder="Enter your task description"></textarea>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Close
                                                </button>
                                                <button type="submit" className="btn btn-primary">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
