// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { KDONft } from "../contracts/KDONft.sol";

contract KDONftTest is Test {
  KDONft kdoNft;

  function setUp() public {
    kdoNft = new KDONft();
  }

  function testFuzz_GetMilestone(
    uint256 _numTasksCompleted
  ) public {
    uint256 numTasksCompleted = bound(_numTasksCompleted, 0, 200);

    KDONft.TaskMilestone expectedMilestone;
    if (numTasksCompleted >= 100) {
      expectedMilestone = KDONft.TaskMilestone.HUNDRED;
    } else if (numTasksCompleted >= 50) {
      expectedMilestone = KDONft.TaskMilestone.FIFTY;
    } else if (numTasksCompleted >= 20) {
      expectedMilestone = KDONft.TaskMilestone.TWENTY;
    } else if (numTasksCompleted >= 10) {
      expectedMilestone = KDONft.TaskMilestone.TEN;
    } else if (numTasksCompleted >= 5) {
      expectedMilestone = KDONft.TaskMilestone.FIVE;
    } else {
      vm.expectRevert(KDONft.KDONft__MinimumTasksCompletedRequired.selector);
      kdoNft._getMilestone(numTasksCompleted);
      return;
    }
    assert(kdoNft._getMilestone(numTasksCompleted) == expectedMilestone);
  }
}
