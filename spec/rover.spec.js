const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98437);
    expect(rover.position).toEqual(98437);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(943432);
    expect(rover.receiveMessage(message).message).toEqual("Test message with two commands");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(943432);
    expect(rover.receiveMessage(message).results.length).toEqual(2);
  });
  it("responds correctly to status check command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(943432);
    expect(rover.receiveMessage(message).results[1].roverStatus.mode).toEqual('LOW_POWER');
    expect(rover.receiveMessage(message).results[1].roverStatus.generatorWatts).toEqual(110);
    expect(rover.receiveMessage(message).results[1].roverStatus.position).toEqual(943432);
  });
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(943432);
    expect(rover.receiveMessage(message).results[1].completed).toBeTrue();
    expect(rover.receiveMessage(message).results[1].roverStatus.mode).toEqual('LOW_POWER');
  });
  it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
    let rover = new Rover(943432);
    rover.mode = "LOW_POWER";
    let commands = [new Command('MOVE', 656576657), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
     expect(rover.receiveMessage(message).results[1].completed).toBeFalse();

  });
  it("responds with position for move command",function(){
let commands = [new Command('MOVE', 7735475765), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(943432);
    rover.receiveMessage(message);
    expect(rover.position).toEqual(7735475765);
  });
});
