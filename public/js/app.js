var listOfProjects = [{
    "nameProject": "First Project",
    "listTask": [{
        "name": "First Task",
        "isChecked": true,
        "listDescriptions": ["Comment 1", "Comment 2", "Comment 3"]
    }, {
        "name": "Second Task",
        "isChecked": false,
        "listDescriptions": ["Description 4", "Description 5", "Description 6"]
    }, {
        "name": "Third Task",
        "isChecked": false,
        "listDescriptions": ["Description 7", "Description 8", "Description 9"]
    }]
}, {
    "nameProject": "Second Project",
    "listTask": [{
        "name": "1 Task",
        "isChecked": true,
        "listDescriptions": ["Description 7", "Description 8", "Description 9"]
    }, {
        "name": "2 Task",
        "isChecked": true, "listDescriptions": ["Description 10", "Description 11", "Description 12"]
    }]
}];

var Navbar = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Link <span className="sr-only">(current) </span></a></li>
                            <li><a href="#">Link</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-expanded="false">Dropdown <span className="caret"></span></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="navbar-form navbar-left" role="search">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search"/>
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">Link</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});


var Footer = React.createClass({
    render: function () {
        return (
            <footer className="row">
                <div className="footer-about">
                    © 2016 Romaniuk Dmitry
                </div>
            </footer>
        )
    }
});

var ListofProjects = React.createClass({
    getInitialState: function () {
        var list = this.props.list;
        return {list: list, selectedProject: 0, selectedTask: 0,selectedDescr: 0};
    },
    checkboxClick: function (i, e) {
        this.state.list[this.state.selectedProject].listTask[i].isChecked = e.target.checked;
        this.setState({list: this.state.list});
    },
    selectProject: function (i, e) {
        this.setState({selectedProject: i});
    },
    selectTask: function (i, e) {
        this.setState({selectedTask: i});
    },
    selectDescr: function (i, e) {
        this.setState({selectedDescr: i});
    },
    eraseComment: function (i, e) {
        console.log(this.state.list);
        this.state.list[this.state.selectedProject].listTask[this.state.selectedTask].listDescriptions.splice(i, 1);
        this.setState({list: this.state.list});
    },
    eraseTask: function (i, e) {
        this.state.list[this.state.selectedProject].listTask.splice(i, 1);
        this.setState({
            list: this.state.list,
            selectedProject: this.state.selectedProject,
            selectedTask: this.state.selectedTask
        });
    },
    eraseProject: function (i, e) {
        console.log(this.state.list);
        this.state.list[this.state.selectedProject].splice(i, 1);
        this.setState({list, selectedProject, selectedTask});
    },
    editClick: function (e) {
        console.log(e);
        console.log('edit');
        this.setState({list: this.state.list}, console.log('edit'));
    },
    addInfo: function (info, action) {
        switch (info) {
            case "project":
                console.log("project");
                break;
            case "task":
                console.log("task");
                break;
            case "comment":
                console.log("comment");
                break;
        }
        console.log(action);
    },
    render: function () {
        var projList = "0 projects";
        var taskList = "0 tasks";
        var commentList = "0 comments";
        if (this.state.selectedProject && this.state.selectedProject > this.state.list.length-1) {
            this.state.selectedProject = this.state.list.length-1
        }
        if (this.state.list[this.state.selectedProject].listTask.length &&
            this.state.selectedTask > this.state.list[this.state.selectedProject].listTask.length-1) {
            this.state.selectedTask = this.state.list[this.state.selectedProject].listTask.length-1
        }
        if (this.state.list[this.state.selectedProject]
                .listTask[this.state.selectedTask].listDescriptions.length &&
            this.state.selectedDescr > this.state.list[this.state.selectedProject]
                .listTask[this.state.selectedTask].listDescriptions.length-1) {
            this.state.selectedDescr = this.state.list[this.state.selectedProject]
                    .listTask[this.state.selectedTask].listDescriptions.length-1
        }
        if (this.state.list.length > 0) {
            projList = this.state.list.map((task, i)=>
                <div className={(i==this.state.selectedProject)? "list-group-item active":"list-group-item"}
                     onClick={this.selectProject.bind(this,i)}
                     key={i}>
                    <div className="list-group-item-wrap">
                        <span> {task.nameProject}</span>
                        <span className="list-group-item-delete">X</span>
                        <i className="fa fa-pencil" aria-hidden="true"/>
                    </div>
                </div>);
            if (this.state.list[this.state.selectedProject].listTask.length > 0) {
                taskList = this.state.list[this.state.selectedProject].listTask.map((task, i)=>
                    <div className={(i==this.state.selectedTask)? "list-group-item active":"list-group-item"}
                         key={i+100}
                         onClick={this.selectTask.bind(this,i)}>
                        <div className="list-group-item-wrap">
                            <input type="checkbox"
                                   checked={task.isChecked}
                                   onChange={this.checkboxClick.bind(this,i)}
                            />
                            <span> {task.name}</span>
                                <span className="list-group-item-delete"
                                      onClick={this.eraseTask.bind(this,i)}>X</span>
                            <i className="fa fa-pencil"
                               aria-hidden="true"
                               onClick={this.editClick.bind(this,i)}/>
                        </div>
                    </div>);
                if (this.state.list[this.state.selectedProject]
                        .listTask[this.state.selectedTask].listDescriptions.length > 0) {
                    commentList = this.state.list[this.state.selectedProject]
                        .listTask[this.state.selectedTask].listDescriptions.map((descr, i)=>
                        <div className={(i==this.state.selectedDescr)? "list-group-item active":"list-group-item"}
                             key={i+10000}
                             onClick={this.selectDescr.bind(this,i)}>
                            <div className="list-group-item-wrap">
                                <span> {descr}</span>
                                    <span className="list-group-item-delete"
                                          onClick={this.eraseComment.bind(this,i)}>X</span>
                                <i className="fa fa-pencil" aria-hidden="true"/>
                            </div>
                        </div>
                    )
                }
            }
        }
        return (
            <div>
                <article className="col-xs-4 project-left">
                    <div className="list-group">
                        {projList}
                    </div>
                </article>
                <article className="col-xs-4 task-center">
                    <div className="list-group">
                        {taskList}
                        <div className="button-create-entry">
                            <button className="btn btn-info" onClick={this.addTask}>Create task</button>
                        </div>
                    </div>
                </article>
                <article className="col-xs-4 description-right">
                    <div className="list-group">
                        {commentList}
                        <div className="button-create-entry">
                            <button className="btn btn-info" onClick={this.addInfo.bind(this, "comment")}>
                                Add comment
                            </button>
                        </div>
                    </div>
                </article>
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Modal title</h4>
                            </div>
                            <div className="modal-body">
                                <p>One fine body…</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


var Main = React.createClass({
    getInitialState: function () {
        return {list: this.props.list};
    },
    render: function () {
        return (
            <div className="row">
                <ListofProjects list={this.state.list}/>
            </div>
        )
    }
});


var App = React.createClass({
    getInitialState: function () {
        return {list: this.props.list};
    },
    render: function () {
        return (
            <div className='wrap-body'>
                <Navbar/>
                <div className='container'>
                    <Main list={this.props.list}/>
                    <Footer />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <App list={listOfProjects}/>,
    document.getElementById('root')
);