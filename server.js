const express = require('express');
const fallback = require('express-history-api-fallback');
const bodyParser = require('body-parser');
const path = require('path');
let spawn = require('child_process').spawn;
const port = process.env.PORT || 3000;
var root = __dirname + './build'
var app = express();
app.use(express.static(path.resolve(__dirname, './build')));
app.use(fallback('index.html', { root: root }))
app.use(bodyParser.json());

app.post('/runLinuxCommand', function(request,response) {
  let process = null;
  const directory = request.body.directory ? request.body.directory:'.';
  const command = request.body.command ? request.body.command:'ls';

  try {
    process = spawnLinuxProcess(directory, command);
  } catch (e) {
    console.error("Error trying to execute command");
    console.error(e);
    console.log("error", e.message);
    console.log("finished");
    return;
  }

  process.stdout.on('data', function (data) {
    console.log("progress", data.toString('utf-8'));
    response.json({"status":"success","result":data.toString('utf-8')});
  });

  process.stderr.on('data', function (data) {
    //console.log("error", data.toString('utf-8'));
    response.json({"status":"success","result":data.toString('utf-8')});
  });

  process.on('exit', function (code) {
    response.json({"status":"success","result":"Command Exceuted "+code});
  });
});

function spawnLinuxProcess(dir, cmd) {
  var cmdParts = cmd.split(/\s+/);
  return spawn(cmdParts[0], cmdParts.slice(1), { cwd: dir});
}

app.listen(port, () => console.log('Example app listening on port 3000!'));
