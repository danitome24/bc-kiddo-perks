// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test } from "forge-std/Test.sol";
import { KiddoPerks } from "../contracts/KiddoPerks.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract KiddoPerksTest is Test {
  KiddoPerks public kiddoPerks;

  address PARENT = makeAddr("Daddy");
  address CHILD_ONE = makeAddr("Miky");

  function setUp() public {
    kiddoPerks = new KiddoPerks();
    kiddoPerks.transferOwnership(PARENT);
  }

  function testOnlyParentCanCreateTask() public {
    string memory taskName = "Clean up room";

    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector, CHILD_ONE
      )
    );
    kiddoPerks.createTask(taskName);
  }

  function testCanCreateTask() public {
    string memory taskName = "Clean up room";

    vm.prank(PARENT);
    kiddoPerks.createTask(taskName);

    (string memory title, bool completed) = kiddoPerks.tasks(0);

    assertEq(kiddoPerks.tasksLength(), 1);
    assertEq(title, taskName);
    assertFalse(completed);
  }
}
