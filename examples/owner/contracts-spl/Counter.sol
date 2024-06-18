// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

contract Counter {
    uint256 public number;

#ifdef CONFIG_HAS_OWNER
    // An address type variable is used to store ethereum accounts.
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
#endif

    constructor() {
#ifdef CONFIG_HAS_OWNER
        owner = msg.sender;
#endif
    }

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }

#ifdef CONFIG_HAS_OWNER
    function changeOwner(address _newOwner) public onlyOwner
    {
        require(_newOwner != address(0), "Not valid address");
        owner = _newOwner;
    }
#endif
}