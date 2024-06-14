// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter counter;

#ifdef CONFIG_HAS_OWNER
    address owner;
#endif

    function setUp() public {
#ifdef CONFIG_HAS_OWNER
        owner = address(this);
#endif
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

#ifdef CONFIG_HAS_OWNER
    function testInitialOwner() public {
        assertEq(counter.owner(), owner);
    }

    function testChangeOwner() public {
        address newOwner = address(0x123);
        counter.changeOwner(newOwner);
        assertEq(counter.owner(), newOwner);
    }
#endif
}
