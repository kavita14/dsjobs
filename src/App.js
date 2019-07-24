import React from 'react';
import './App.css';
import axios from 'axios';
import autoBind from 'react-autobind';

class App extends React.Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      cmdData:[]
    }
  }

  runCommand() {
    var self = this;
    var directory = document.getElementById('directory').value;
    var command = document.getElementById('command').value;
    let values = {
      directory,
      command
    }
    axios.post('/runLinuxCommand', values)
      .then(res => {
        self.setState({cmdData:res.data.result.split("\n")});
      })
      .catch(function (error) {

      });
}

render() {
  return (
    <div className="App">
    <div style={{marginTop:'30px',marginLeft:'30px'}} className="row">
    <div className="col-xs-12 col-sm-3 col-md-3"><input className="form-control input-lg" id="directory" placeholder="Please Enter Directory Name" name="directory" /></div>
    <div className="col-xs-12 col-sm-3 col-md-3"><input className="form-control input-lg" placeholder="Please Enter Command" id="command" name="command" /></div>
    <div className="col-xs-12 col-sm-3 col-md-3">
    <button className="btn btn-primary" onClick={this.runCommand}>RUN Linux Command</button></div>
    </div>
     <div>
    {this.state.cmdData.length>0 && <table style={{marginTop:"50px"}} className="table table-striped table-bordered">
         <thead>
         <tr>
         <th>Data</th>
         </tr>
         </thead>
         <tbody>
         {this.state.cmdData.map((cmd)=>(<tr>
            <td>{cmd}</td></tr>
          ))
        }
         </tbody>
         </table>}
    </div>
    </div>

  );
}
}

export default App;
