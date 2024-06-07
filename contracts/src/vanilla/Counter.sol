
pragma solidity 0.8.24;
contract Counter {
    uint256 public number;
    constructor() {
    }
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
