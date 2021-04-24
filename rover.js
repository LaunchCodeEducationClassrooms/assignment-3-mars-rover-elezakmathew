const Message = require('./message.js');
const Command = require('./command.js');
class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(messageObj) {
    var response = {
      message: messageObj.name,
    }
    let result = [];
    let complete = true;

    for (let i = 0; i < messageObj.commands.length; i++) {
      if (messageObj.commands[i].commandType === 'MODE_CHANGE') {
        this.mode = messageObj.commands[i].value;
        result[i] = {
          completed: true
        };
      } else if (messageObj.commands[i].commandType === 'MOVE') {
        
        if (this.mode === 'LOW_POWER') {
          complete = false;
        }else{
          this.position = messageObj.commands[i].value;
        }
        result[i] = {
          completed: complete
        };

      } else {
        result[i] = {
          completed: complete,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        };
      }
    }
    response.results = result;

    return response;
  }
}

module.exports = Rover;