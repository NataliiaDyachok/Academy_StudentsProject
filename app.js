import server from './server/index.js';

function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.error(error);
    console.log('Gracefully stopping...');
    server.stop(() => {
      process.exit();
    });
  };

  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);
  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);
  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

async function boot() {
  enableGracefulExit();
  await server.start();
}

boot();
