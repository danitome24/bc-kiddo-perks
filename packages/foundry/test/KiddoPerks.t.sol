// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test } from "forge-std/Test.sol";
import { KiddoPerks } from "../contracts/KiddoPerks.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract KiddoPerksTest is Test {
  KiddoPerks public kiddoPerks;

  uint256 constant SMALL_REQUIRED_TOKENS_AMOUNT = 2 * 1e18;

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

  event TaskCreated(string title);

  function testCanCreateTask() public {
    string memory taskName = "Clean up room";

    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit TaskCreated(taskName);
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

  event TaskCompleted(string title, address by);

  function testParentCanMarkTaskAsCompleted() public withTaskCreated {
    vm.prank(PARENT);
    vm.expectEmit(true, true, false, true);
    emit TaskCompleted("Clean up room", CHILD_ONE);
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

  event PerkCreated(string title, uint256 tokensRequired);

  function testParentCanCreatePerk() public withTaskCreated {
    string memory perkTitle = "Go to Disneyland Paris";
    vm.prank(PARENT);
    vm.expectEmit(true, true, false, true);
    emit PerkCreated(perkTitle, SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createPerk(perkTitle, SMALL_REQUIRED_TOKENS_AMOUNT);
  }

  /**
   * Modifiers
   */
  modifier withTaskCreated() {
    string memory taskName = "Clean up room";

    vm.prank(PARENT);
    kiddoPerks.createTask(taskName, SMALL_REQUIRED_TOKENS_AMOUNT);
    _;
  }
}
