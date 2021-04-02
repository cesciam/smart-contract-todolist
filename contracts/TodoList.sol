pragma solidity ^0.5.0;

contract  TodoList {
    // State variable = represent the state of the smart contract in the blockchain
    uint public taskCount = 0;

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("My first smart contract");
    }

    function createTask(string memory _content) public{
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }
}
