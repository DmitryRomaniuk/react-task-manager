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
        console.log(this.props.list);
        var list = this.props.list;
        return {list};
    },
    render: function () {
        return (
            <article className="col-xs-4 project-left">
                <div className="list-group">
                    {this.state.list.map((task, i)=>
                        <div className={(i==0)? "list-group-item active":"list-group-item"} key={Math.random()}>
                            <div className="list-group-item-wrap">
                                <span> {task.nameProject}</span>
                                <span className="list-group-item-delete">X</span>
                                <i className="fa fa-pencil" aria-hidden="true"/>
                            </div>
                        </div>)}
                </div>
            </article>

        )
    }
});
var ListofTasks = React.createClass({
    getInitialState: function () {
        var listTasks = this.props.list;
        //console.log(listTasks);
        return {listTasks};
    },
    checkboxClick: function () {
        this.setState({listTasks:this.state.listTasks}, console.log('click input'));
    },
    eraseClick: function () {
        this.setState({listTasks:this.state.listTasks}, console.log('erase'));
    },
    editClick: function () {
        this.setState({listTasks:this.state.listTasks}, console.log('edit'));
    },
    render: function () {
        return (
            <article className="col-xs-4 task-center">
                <div className="list-group">
                    {this.state.listTasks.map((task, i)=>
                        <div className={(i==0)? "list-group-item active":"list-group-item"} key={Math.random()}>
                            <div className="list-group-item-wrap">
                                <input type="checkbox"
                                       checked={task.isChecked}
                                       onChange={this.state.checkboxClick}
                                />
                                <span> {task.name}</span>
                                <span className="list-group-item-delete"
                                      onClick={this.state.eraseClick}>X</span>
                                <i className="fa fa-pencil"
                                   aria-hidden="true"
                                   onClick={this.state.editClick}/>
                            </div>
                        </div>)}
                    <div className="button-create-entry">
                        <a href="#" className="btn btn-info">Create task</a>
                    </div>
                </div>
            </article>
        )
    }
});

var ListofDescriptions = React.createClass({
    getInitialState: function () {
        var allDescriptions = this.props.list;
        return {allDescriptions};
    },
    render: function () {
        return (
            <article className="col-xs-4 description-right">
                <div className="list-group">
                    {this.state.allDescriptions.map((descr, i)=>
                        <div className={(i==0)? "list-group-item active":"list-group-item"} key={Math.random()}>
                            <div className="list-group-item-wrap">
                                <span> {descr}</span>
                                <span className="list-group-item-delete">X</span>
                                <i className="fa fa-pencil" aria-hidden="true"/>
                            </div>
                        </div>
                    )}
                    <div className="button-create-entry">
                        <a href="#" className="btn btn-info">Add comment</a>
                    </div>
                </div>
            </article>
        )
    }
});

var Main = React.createClass({
    getInitialState: function () {
        //console.log(this.props.list);
        return null;
    },
    render: function () {
        return (
            <div className="row">
                <ListofProjects list={this.props.list}/>
                <ListofTasks list={this.props.list[0].listTask}/>
                <ListofDescriptions list={this.props.list[0].listTask[0].listDescriptions}/>
            </div>
        )
    }
});


var App = React.createClass({
    getInitialState: function () {
        //console.log(this.props);
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