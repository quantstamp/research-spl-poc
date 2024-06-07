
pragma solidity 0.8.24;
contract Counter {
    uint256 public number;
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    constructor() {
        owner = msg.sender;
    }
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
    function changeOwner(address _newOwner) public onlyOwner
    {
        require(_newOwner != address(0), "Not valid address");
        owner = _newOwner;
    }
}
