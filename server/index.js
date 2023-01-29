import server from './routes/index.js';
import config from './config/index.js';

let listener;

async function start() {
  try {
    listener = server.listen(config.port, () => {
      console.log(`Server successfully started on port ${config.port}`);
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

export default {
  start,
  stop,
};
