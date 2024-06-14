
pragma solidity 0.8.24;
import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";
contract CounterTest is Test {
    Counter counter;
    address owner;
    function setUp() public {
        owner = address(this);
        counter = new Counter();
    }
    function testIncrement() public {
        uint256 initialNumber = counter.number();
        counter.increment();
        assertEq(counter.number(), initialNumber + 1);
    }
    function testSetNumber() public {
        uint256 newNumber = 123;
        counter.setNumber(newNumber);
        assertEq(counter.number(), newNumber);
    }
    function testInitialOwner() public {
        assertEq(counter.owner(), owner);
    }
    function testChangeOwner() public {
        address newOwner = address(0x123);
        counter.changeOwner(newOwner);
        assertEq(counter.owner(), newOwner);
    }
}
