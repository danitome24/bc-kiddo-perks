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
    kiddoPerks.createTask(taskName, 2 * 1e18);
  }

  function testCanCreateTask() public {
    string memory taskName = "Clean up room";

    vm.prank(PARENT);
    kiddoPerks.createTask(taskName, 2 * 1e18);

    (string memory title,) = kiddoPerks.tasks(0);

    assertEq(kiddoPerks.tasksLength(), 1);
    assertEq(title, taskName);
  }

  function testOnlyParentCanMarkTaskAsCompleted() public withTaskCreated {
    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector, CHILD_ONE
      )
    );
    kiddoPerks.completeTask(0, CHILD_ONE);
  }

  function testParentCanMarkTaskAsCompleted() public withTaskCreated {
    vm.prank(PARENT);
    kiddoPerks.completeTask(0, CHILD_ONE);

    bool isCompleted = kiddoPerks.isTaskCompletedBy(0, CHILD_ONE);

    assertTrue(isCompleted);
  }

  function testOnlyParentCanCreatePerk() public withTaskCreated {
    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector, CHILD_ONE
      )
    );
    kiddoPerks.createPerk("Disneyland", 2 * 1e18);
  }

  /**
   * Modifiers
   */
  modifier withTaskCreated() {
    string memory taskName = "Clean up room";

    vm.prank(PARENT);
    kiddoPerks.createTask(taskName, 2 * 1e18);
    _;
  }
}
