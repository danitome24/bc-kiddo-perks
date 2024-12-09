// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { KiddoPerks } from "../contracts/KiddoPerks.sol";
import { KDOToken } from "../contracts/KDOToken.sol";
import { KDONft } from "../contracts/KDONft.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract KiddoPerksTest is Test {
  KiddoPerks public kiddoPerks;
  KDOToken public kdoToken;
  KDONft public kdoNft;

  uint256 constant SMALL_REQUIRED_TOKENS_AMOUNT = 2 * 1e18;

  address PARENT = makeAddr("Daddy");
  address CHILD_ONE = makeAddr("Miky");
  address CHILD_TWO = makeAddr("Owen");

  function setUp() public {
    kdoToken = new KDOToken();
    kdoNft = new KDONft();

    kiddoPerks = new KiddoPerks(kdoToken, kdoNft);
    kiddoPerks.setParent(PARENT);
    kdoToken.transferOwnership(address(kiddoPerks));
  }

  /////////////////////
  //// Task test
  /////////////////////
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

    KiddoPerks.Task memory task = kiddoPerks.taskBy(0);
    assertEq(kiddoPerks.s_taskNextId(), 1);
    assertEq(task.title, task.title);
  }

  function testCanCreateMultipleTasks() public {
    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit TaskCreated("Clean up room");
    kiddoPerks.createTask("Clean up room", 2 * 1e18);

    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit TaskCreated("Make bed");
    kiddoPerks.createTask("Make bed", 2 * 1e18);

    KiddoPerks.Task memory taskOne = kiddoPerks.taskBy(0);
    KiddoPerks.Task memory taskTwo = kiddoPerks.taskBy(1);
    assertEq(kiddoPerks.s_taskNextId(), 2);
    assertEq(taskOne.title, "Clean up room");
    assertEq(taskTwo.title, "Make bed");
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

  event TaskCompleted(address indexed by, string title, uint256 taskId);
  event TokenMinted(address by, uint256 tokenReward);

  function testParentCanMarkTaskAsCompleted()
    public
    withTaskCreated
    withChildCreated
  {
    vm.prank(PARENT);
    vm.expectEmit(true, true, false, true);
    emit TaskCompleted(CHILD_ONE, "Clean up room", 0);
    vm.expectEmit(true, true, false, true);
    emit TokenMinted(CHILD_ONE, SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.completeTask(0, CHILD_ONE);

    bool isCompleted = kiddoPerks.isTaskCompletedBy(0, CHILD_ONE);

    assertTrue(isCompleted);
  }

  function testRevertsIfCompletedTaskIdNotExists()
    public
    withTaskCreated
    withChildCreated
  {
    uint256 taskId = 4;
    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__TaskNotFound.selector, taskId
      )
    );
    kiddoPerks.completeTask(taskId, CHILD_ONE);
  }

  function testRevertsIfCompleteARemovedTask()
    public
    withTaskCreated
    withChildCreated
  {
    uint256 taskId = 0;

    vm.prank(PARENT);
    kiddoPerks.removeTask(taskId);

    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__CannotCompleteRemovedTask.selector, taskId
      )
    );
    kiddoPerks.completeTask(taskId, CHILD_ONE);
  }

  function testRevertsIfNoOwnerTriesToRemoveTask() public withTaskCreated {
    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector, CHILD_ONE
      )
    );
    kiddoPerks.removeTask(0);
  }

  function testRevertsIfTryingToRemoveANonExistingTask() public withTaskCreated {
    uint256 id = 4;
    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(KiddoPerks.KiddoPerks__NotValidId.selector, id)
    );
    kiddoPerks.removeTask(id);
  }

  event TaskRemoved(uint256 id);

  function testRevertsIfTryToRemoveAnAlreadyRemovedTask()
    public
    withTaskCreated
  {
    uint256 id = 0;
    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit TaskRemoved(id);
    kiddoPerks.removeTask(id);

    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__TaskAlreadyRemoved.selector, id
      )
    );
    kiddoPerks.removeTask(id);
  }

  function testParentCanRemoveTask() public withTaskCreated {
    uint256 id = 0;
    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit TaskRemoved(id);
    kiddoPerks.removeTask(id);

    assertTrue(kiddoPerks.taskBy(id).removed);
  }

  function testRevertsIfNoValidChildTriesToCompleteTask()
    public
    withTaskCreated
  {
    uint256 taskId = 0;
    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__NoValidChild.selector, CHILD_ONE
      )
    );
    kiddoPerks.completeTask(taskId, CHILD_ONE);
  }

  function testRevertsIfRemovedChildTriesToCompleteTask()
    public
    withTaskCreated
    withChildCreated
  {
    uint256 taskId = 0;
    uint256 childId = 0;

    vm.prank(PARENT);
    kiddoPerks.removeChild(childId);

    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__NoValidChild.selector, CHILD_ONE
      )
    );
    kiddoPerks.completeTask(taskId, CHILD_ONE);
  }

  /////////////////////
  //// Perk test
  /////////////////////
  event PerkCreated(string title, uint256 tokensRequired);

  function testParentCanCreatePerk() public withTaskCreated {
    string memory perkTitle = "Go to Disneyland Paris";
    vm.prank(PARENT);
    vm.expectEmit(true, true, false, true);
    emit PerkCreated(perkTitle, SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createPerk(perkTitle, SMALL_REQUIRED_TOKENS_AMOUNT);

    assertEq(kiddoPerks.s_perksNextId(), 1);
  }

  function testOnlyParentCanCreatePerk() public withTaskCreated {
    string memory perkTitle = "Go to Disneyland Paris";
    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector, CHILD_ONE
      )
    );
    kiddoPerks.createPerk(perkTitle, SMALL_REQUIRED_TOKENS_AMOUNT);
  }

  function testOnlyParentCanRemovePerk() public withPerkCreated {
    uint256 perkId = 0;
    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector, CHILD_ONE
      )
    );
    kiddoPerks.removePerk(perkId);
  }

  function testRevertsIfTriesToRemoveNonExistingPerk() public withPerkCreated {
    uint256 perkId = 5;
    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(KiddoPerks.KiddoPerks__NotValidId.selector, perkId)
    );
    kiddoPerks.removePerk(perkId);
  }

  event PerkRemoved(uint256 id);

  function testRevertsIfTriesToRemoveAnAlreadyRemovedPerk()
    public
    withPerkCreated
  {
    uint256 perkId = 0;

    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit PerkRemoved(perkId);
    kiddoPerks.removePerk(perkId);

    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__PerkAlreadyRemoved.selector, perkId
      )
    );
    kiddoPerks.removePerk(perkId);
  }

  function testParentCanRemovePerk() public withPerkCreated {
    uint256 perkId = 0;

    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit PerkRemoved(perkId);
    kiddoPerks.removePerk(perkId);

    assertTrue(kiddoPerks.perkBy(perkId).removed);
  }

  event PerkRedeemed(uint256 perkId, address by);

  function testChildCanRedeemPerk() public withPerkCreated withChildCreated {
    uint256 perkId = 0;
    uint256 initialChildBalance = 5 * 10 ** 18;
    uint256 perkTokensRequired = 2 * 10 ** 18;
    vm.prank(address(kiddoPerks));
    kdoToken.mint(CHILD_ONE, initialChildBalance);

    vm.prank(CHILD_ONE);
    kdoToken.approve(address(kiddoPerks), perkTokensRequired);

    vm.expectEmit(true, true, false, true);
    emit PerkRedeemed(perkId, CHILD_ONE);
    vm.prank(CHILD_ONE);
    kiddoPerks.redeemPerk(perkId);

    uint256 userFinalBalance = kdoToken.balanceOf(CHILD_ONE);
    assertEq(initialChildBalance, perkTokensRequired + userFinalBalance);
  }

  function testChildCannotReddemMoreThanOnceAPerk()
    public
    withPerkCreated
    withChildCreated
  {
    uint256 perkId = 0;
    uint256 initialChildBalance = 5 * 10 ** 18;
    uint256 perkTokensRequired = 2 * 10 ** 18;
    vm.prank(address(kiddoPerks));
    kdoToken.mint(CHILD_ONE, initialChildBalance);

    vm.prank(CHILD_ONE);
    kdoToken.approve(address(kiddoPerks), perkTokensRequired);

    vm.expectEmit(true, true, false, true);
    emit PerkRedeemed(perkId, CHILD_ONE);
    vm.prank(CHILD_ONE);
    kiddoPerks.redeemPerk(perkId);

    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__PerkAlreadyRedeemmed.selector, perkId, CHILD_ONE
      )
    );
    vm.prank(CHILD_ONE);
    kiddoPerks.redeemPerk(perkId);
  }

  function testRevertsOnRedeemWhenChildHasNotEnoughTokenBalance()
    public
    withPerkCreated
    withChildCreated
  {
    uint256 perkId = 0;
    uint256 tokensToMint = 1 * 10 ** 18;
    uint256 perkTokensRequired = 2 * 10 ** 18;
    vm.prank(address(kiddoPerks));
    kdoToken.mint(CHILD_ONE, tokensToMint);

    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__NotEnoughTokenBalance.selector,
        perkId,
        CHILD_ONE,
        perkTokensRequired
      )
    );
    kiddoPerks.redeemPerk(perkId);
  }

  function testRevertIfNoValidChildTriesToRedeemPerk() public withPerkCreated {
    uint256 perkId = 0;
    uint256 tokensToMint = 1 * 10 ** 18;

    vm.prank(address(kiddoPerks));
    kdoToken.mint(CHILD_TWO, tokensToMint);

    vm.prank(CHILD_TWO);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__NoValidChild.selector, CHILD_TWO
      )
    );
    kiddoPerks.redeemPerk(perkId);
  }

  function testRevertIfRemovedChildTriesToRedeemPerk()
    public
    withPerkCreated
    withChildCreated
  {
    uint256 perkId = 0;
    uint256 childId = 0;
    uint256 tokensToMint = 1 * 10 ** 18;

    vm.prank(address(kiddoPerks));
    kdoToken.mint(CHILD_ONE, tokensToMint);

    vm.prank(PARENT);
    kiddoPerks.removeChild(childId);

    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__NoValidChild.selector, CHILD_ONE
      )
    );
    kiddoPerks.redeemPerk(perkId);
  }
  /////////////////////
  //// Child test
  /////////////////////

  function testRevertsIfNoParentTriesToAddChild() public withTaskCreated {
    string memory childName = "Willy";
    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector, CHILD_ONE
      )
    );
    kiddoPerks.addChild(childName, CHILD_ONE);
  }

  event ChildAdded(string name, address childAddr);

  function testParentCanAddAChild() public withTaskCreated {
    string memory childName = "Willy";
    vm.prank(PARENT);
    vm.expectEmit(true, true, false, true);
    emit ChildAdded(childName, CHILD_ONE);
    kiddoPerks.addChild(childName, CHILD_ONE);

    assertEq(kiddoPerks.s_childrenNextId(), 1);
  }

  function testParentCanAddMultipleChildren() public {
    string memory childNameOne = "Willy";
    string memory childNameTwo = "Owen";

    vm.prank(PARENT);
    vm.expectEmit(true, true, false, true);
    emit ChildAdded(childNameOne, CHILD_ONE);
    kiddoPerks.addChild(childNameOne, CHILD_ONE);

    vm.prank(PARENT);
    vm.expectEmit(true, true, false, true);
    emit ChildAdded(childNameTwo, CHILD_TWO);
    kiddoPerks.addChild(childNameTwo, CHILD_TWO);

    assertEq(kiddoPerks.s_childrenNextId(), 2);
    (, string memory nameOne,,) = kiddoPerks.s_children(0);
    assertEq(nameOne, childNameOne);
    (, string memory nameTwo,,) = kiddoPerks.s_children(1);
    assertEq(nameTwo, childNameTwo);
  }

  event ChildRemoved(uint256 id);

  function testParentCanRemoveAChild() public withTaskCreated {
    string memory childName = "Willy";
    uint256 childId = 0;
    vm.prank(PARENT);
    kiddoPerks.addChild(childName, CHILD_ONE);

    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit ChildRemoved(childId);
    kiddoPerks.removeChild(childId);

    assertTrue(kiddoPerks.childBy(childId).removed);
  }

  function testRevertsIfNoParentTriesToRemoveAChild() public withChildCreated {
    uint256 childId = 0;
    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector, CHILD_ONE
      )
    );
    kiddoPerks.removeChild(childId);
  }

  function testRevertsIfTriesToRemoveNonExistingChild() public withChildCreated {
    uint256 childId = 5;
    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__NotValidId.selector, childId
      )
    );
    kiddoPerks.removeChild(childId);
  }

  function testRevertsIfTriesToRemoveAnAlreadyRemovedChild()
    public
    withChildCreated
  {
    uint256 childId = 0;

    vm.prank(PARENT);
    vm.expectEmit(true, false, false, true);
    emit ChildRemoved(0);
    kiddoPerks.removeChild(0);

    vm.prank(PARENT);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__ChildAlreadyRemoved.selector, childId
      )
    );
    kiddoPerks.removeChild(childId);
  }

  /**
   * NFTs
   */
  function testRevertsIfTriesToMintNFTWithNoMinTasksCompletion()
    public
    withChildCreated
    withTaskCreated
  {
    vm.startPrank(PARENT);
    kiddoPerks.createTask("Clean up room", SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createTask("Make bed", SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createTask("Brush teeth", SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createTask("Do homework", SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createTask("Throw out trash", SMALL_REQUIRED_TOKENS_AMOUNT);

    kiddoPerks.completeTask(0, CHILD_ONE);
    kiddoPerks.completeTask(1, CHILD_ONE);
    kiddoPerks.completeTask(2, CHILD_ONE);
    kiddoPerks.completeTask(3, CHILD_ONE);
    vm.stopPrank();

    vm.prank(CHILD_ONE);
    vm.expectRevert(
      abi.encodeWithSelector(
        KiddoPerks.KiddoPerks__CannotMintAnyNFTYet.selector, CHILD_ONE, 4
      )
    );
    kiddoPerks.mintNFTByTaskCompletion();
  }

  function testCanMintNFT() public withChildCreated withTaskCreated {
    vm.startPrank(PARENT);
    kiddoPerks.createTask("Clean up room", SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createTask("Make bed", SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createTask("Brush teeth", SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createTask("Do homework", SMALL_REQUIRED_TOKENS_AMOUNT);
    kiddoPerks.createTask("Throw out trash", SMALL_REQUIRED_TOKENS_AMOUNT);

    kiddoPerks.completeTask(0, CHILD_ONE);
    kiddoPerks.completeTask(1, CHILD_ONE);
    kiddoPerks.completeTask(2, CHILD_ONE);
    kiddoPerks.completeTask(3, CHILD_ONE);
    kiddoPerks.completeTask(4, CHILD_ONE);
    vm.stopPrank();

    vm.prank(CHILD_ONE);
    kiddoPerks.mintNFTByTaskCompletion();
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

  modifier withChildCreated() {
    string memory childName = "Mickael";

    vm.prank(PARENT);
    kiddoPerks.addChild(childName, CHILD_ONE);
    _;
  }

  modifier withPerkCreated() {
    string memory perkTitle = "Go to Disneyland Paris";
    vm.prank(PARENT);
    kiddoPerks.createPerk(perkTitle, SMALL_REQUIRED_TOKENS_AMOUNT);
    _;
  }
}
