// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test } from "forge-std/Test.sol";
import { KiddoPerks } from "../contracts/KiddoPerks.sol";

contract KiddoPerksTest is Test {
  KiddoPerks public kiddoPerks;

  function setUp() public {
    kiddoPerks = new KiddoPerks();
  }

  function testCanCreateTask() public {
    string memory taskName = "Clean up room";

    kiddoPerks.createTask(taskName);

    (string memory title, bool completed) = kiddoPerks.tasks(0);

    assertEq(kiddoPerks.tasksLength(), 1);
    assertEq(title, taskName);
    assertFalse(completed);
  }
}
