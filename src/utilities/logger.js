// Reference: https://levelup.gitconnected.com/step-up-your-console-messaging-game-in-your-react-app-42eee17659ec

import debug from 'debug';

const base = 'reblog19';
const colors = {
  trace: 'teal',
  info: 'blue',
  warn: 'orange',
  error: 'red'
};

class Logger {
  generateMessage(level, message, source) {

    const namespace = `${base}:${level}`;
    const createDebug = debug(namespace);

    createDebug.color = colors[level];

    if (source) {
      createDebug(source, message);
    } else {
      createDebug(message);
    }
  }

  trace = (message, source) => {
    return this.generateMessage('trace', message, source);
  };

  info = (message, source) => {
    return this.generateMessage('info', message, source);
  }

  warn = (message, source) => {
    return this.generateMessage('warn', message, source);
  }

  error = (message, source) => {
    return this.generateMessage('error', message, source);
  }
}

export default new Logger();
