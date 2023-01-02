const server = require('./routes');
const { port } = require('./config');

let listener;

async function start() {
  try {
    listener = server.listen(port, () => {
      console.log(`Server successfully started on port ${port}`);
    });
  } catch (err) {
    console.error(`ATTENTION!!! ${err}`);
  }
}

function stop(callback) {
  if (!server) {
    callback();
    return;
  }
  listener.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      callback();
      return;
    }
    console.log('Server has been stopped.');
    callback();
  });
}

module.exports = {
  start,
  stop,
};
