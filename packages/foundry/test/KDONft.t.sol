// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { KDONft } from "../contracts/KDONft.sol";
import { KiddoPerks } from "../contracts/KiddoPerks.sol";
import { KDOToken } from "../contracts/KDOToken.sol";

contract KDONftTest is Test {
  KDONft kdoNft;

  address immutable CHILD_ONE = makeAddr("baby1");
  address immutable CHILD_TWO = makeAddr("baby2");

  function setUp() public {
    string memory fiveTasksAchievedSvg =
      vm.readFile("./nfts/5TasksAchieved.svg");
    string memory tenTasksAchievedSvg =
      vm.readFile("./nfts/10TasksAchieved.svg");
    string memory twentyTasksAchievedSvg =
      vm.readFile("./nfts/20TasksAchieved.svg");
    string memory fiftyTasksAchievedSvg =
      vm.readFile("./nfts/50TasksAchieved.svg");
    string memory hundredTasksAchievedSvg =
      vm.readFile("./nfts/100TasksAchieved.svg");

    KiddoPerks kdoPerks = new KiddoPerks(new KDOToken());

    kdoNft = new KDONft(
      address(kdoPerks),
      fiveTasksAchievedSvg,
      tenTasksAchievedSvg,
      twentyTasksAchievedSvg,
      fiftyTasksAchievedSvg,
      hundredTasksAchievedSvg
    );
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

  function testMintNftSuccess() public {
    uint256 tasksCompleted = 10;

    vm.prank(CHILD_ONE);
    kdoNft.mintNft(tasksCompleted);

    assertEq(kdoNft.ownerOf(0), CHILD_ONE);
    assertEq(kdoNft.s_nextTokenId(), 1);

    assertEq(
      uint256(kdoNft.s_childLastNftMinted(CHILD_ONE)),
      uint256(KDONft.TaskMilestone.TEN)
    );
  }

  function testMintRevertIfTasksBelowMinimum() public {
    uint256 tasksCompleted = 4;

    vm.expectRevert(KDONft.KDONft__MinimumTasksCompletedRequired.selector);
    vm.prank(CHILD_ONE);
    kdoNft.mintNft(tasksCompleted);
  }

  function testMintNftRevertIfSameMilestone() public {
    uint256 tasksCompleted = 10;

    vm.prank(CHILD_ONE);
    kdoNft.mintNft(tasksCompleted);

    vm.expectRevert(
      abi.encodeWithSelector(
        KDONft.KDONft__CannotMintNFTMoreThanOnce.selector, CHILD_ONE
      )
    );
    vm.prank(CHILD_ONE);
    kdoNft.mintNft(tasksCompleted);
  }

  function testMintNftMultipleMilestones() public {
    vm.prank(CHILD_ONE);
    kdoNft.mintNft(10);
    assertEq(kdoNft.ownerOf(0), CHILD_ONE);
    assertEq(
      uint256(kdoNft.s_childLastNftMinted(CHILD_ONE)),
      uint256(KDONft.TaskMilestone.TEN)
    );

    vm.prank(CHILD_ONE);
    kdoNft.mintNft(20);
    assertEq(kdoNft.ownerOf(1), CHILD_ONE);
    assertEq(
      uint256(kdoNft.s_childLastNftMinted(CHILD_ONE)),
      uint256(KDONft.TaskMilestone.TWENTY)
    );
  }
}
