//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { KDOToken } from "./KDOToken.sol";

contract KiddoPerks is Ownable {
  event TaskCreated(string title);
  event TaskCompleted(address indexed by, string title, uint256 taskId);
  event PerkCreated(string title, uint256 tokensRequired);
  event ChildAdded(string name, address childAddr);
  event ChildRemoved(uint256 id);
  event ParentUpdated(address newParentAddress);
  event TaskRemoved(uint256 id);
  event PerkRemoved(uint256 id);
  event TokenMinted(address by, uint256 tokensReward);
  event PerkRedeemed(uint256 perkId, address by);

  error KiddoPerks__NotValidId(uint256 id);
  error KiddoPerks__TaskAlreadyRemoved(uint256 id);
  error KiddoPerks__TaskNotFound(uint256 id);
  error KiddoPerks__CannotCompleteRemovedTask(uint256 id);
  error KiddoPerks__ChildAlreadyRemoved(uint256 id);
  error KiddoPerks__PerkAlreadyRemoved(uint256 id);
  error KiddoPerks__NotEnoughTokenBalance(
    uint256 id, address by, uint256 tokensRequired
  );

  KDOToken token;
  address public parent;

  mapping(uint256 => Child) public s_children;
  uint256 public s_childrenNextId = 0;

  mapping(uint256 => Perk) public s_perks;
  mapping(uint256 perkId => mapping(address by => bool isRedeemed))
    s_perksRedeemedBy;
  uint256 public s_perksNextId = 0;

  mapping(uint256 => Task) public s_tasks;
  uint256 public s_taskNextId = 0;
  mapping(address => mapping(uint256 => bool)) public s_completedTasksByUser;

  struct Task {
    uint256 id;
    string title;
    uint256 tokensReward;
    bool removed;
  }

  struct Perk {
    uint256 id;
    string title;
    uint256 tokensRequired;
    bool removed;
  }

  struct Child {
    uint256 id;
    string name;
    address childAddr;
    bool removed;
  }

  constructor(
    KDOToken _token
  ) Ownable(msg.sender) {
    setParent(msg.sender);
    token = _token;
  }

  /**
   * Set parent management address
   *
   * @param newParentAddress New parent address
   */
  function setParent(
    address newParentAddress
  ) public onlyOwner {
    parent = newParentAddress;
    transferOwnership(newParentAddress);

    emit ParentUpdated(newParentAddress);
  }

  /**
   * Tasks
   */
  function createTask(
    string memory title,
    uint256 tokensReward
  ) public onlyOwner {
    s_tasks[s_taskNextId] = Task(s_taskNextId, title, tokensReward, false);
    s_taskNextId++;
    emit TaskCreated(title);
  }

  function taskBy(
    uint256 id
  ) public view returns (Task memory) {
    return s_tasks[id];
  }

  function completeTask(uint256 taskId, address by) public onlyOwner {
    if (taskId >= s_taskNextId) {
      revert KiddoPerks__TaskNotFound(taskId);
    }
    Task memory taskCompleted = s_tasks[taskId];
    if (taskCompleted.removed) {
      revert KiddoPerks__CannotCompleteRemovedTask(taskId);
    }
    s_completedTasksByUser[by][taskId] = true;
    emit TaskCompleted(by, taskCompleted.title, taskId);

    token.mint(by, taskCompleted.tokensReward);
    emit TokenMinted(by, taskCompleted.tokensReward);
  }

  function removeTask(
    uint256 id
  ) public onlyOwner {
    if (id >= s_taskNextId) {
      revert KiddoPerks__NotValidId(id);
    }

    if (s_tasks[id].removed) {
      revert KiddoPerks__TaskAlreadyRemoved(id);
    }

    s_tasks[id].removed = true;

    emit TaskRemoved(id);
  }

  function isTaskCompletedBy(
    uint256 taskId,
    address by
  ) public view returns (bool) {
    return s_completedTasksByUser[by][taskId];
  }

  function getAllTasks() public view returns (Task[] memory) {
    Task[] memory allTasks = new Task[](s_taskNextId);

    for (uint256 i = 0; i < s_taskNextId; i++) {
      allTasks[i] = s_tasks[i];
    }

    return allTasks;
  }

  /**
   * Perks
   */
  function createPerk(
    string memory title,
    uint256 tokensRequired
  ) public onlyOwner {
    Perk memory newPerk = Perk(s_perksNextId, title, tokensRequired, false);
    s_perks[s_perksNextId] = newPerk;
    s_perksNextId++;
    emit PerkCreated(title, tokensRequired);
  }

  function perkBy(
    uint256 id
  ) public view returns (Perk memory) {
    return s_perks[id];
  }

  function removePerk(
    uint256 id
  ) public onlyOwner {
    if (id >= s_perksNextId) {
      revert KiddoPerks__NotValidId(id);
    }
    if (s_perks[id].removed) {
      revert KiddoPerks__PerkAlreadyRemoved(id);
    }

    s_perks[id].removed = true;

    emit PerkRemoved(id);
  }

  function getAllPerks() public view returns (Perk[] memory) {
    Perk[] memory allPerks = new Perk[](s_perksNextId);

    for (uint256 i = 0; i < s_perksNextId; i++) {
      allPerks[i] = s_perks[i];
    }

    return allPerks;
  }

  function redeemPerk(
    uint256 perkId
  ) public {
    Perk memory perk = s_perks[perkId];
    uint256 userTokenBalance = token.balanceOf(msg.sender);
    if (userTokenBalance < perk.tokensRequired) {
      revert KiddoPerks__NotEnoughTokenBalance(
        perkId, msg.sender, perk.tokensRequired
      );
    }

    bool sent =
      token.transferFrom(msg.sender, address(this), perk.tokensRequired);
    if (!sent) {
      revert("Error on token transfer");
    }
    emit PerkRedeemed(perkId, msg.sender);
  }

  /**
   * Children
   */
  function addChild(string memory name, address childAddr) public onlyOwner {
    Child memory newChild = Child(s_childrenNextId, name, childAddr, false);
    s_children[s_childrenNextId] = newChild;
    s_childrenNextId++;

    emit ChildAdded(name, childAddr);
  }

  function childBy(
    uint256 id
  ) public view returns (Child memory) {
    return s_children[id];
  }

  function removeChild(
    uint256 id
  ) public onlyOwner {
    if (id >= s_childrenNextId) {
      revert KiddoPerks__NotValidId(id);
    }
    if (s_children[id].removed) {
      revert KiddoPerks__ChildAlreadyRemoved(id);
    }

    s_children[id].removed = true;

    emit ChildRemoved(id);
  }

  function getAllChildren() public view returns (Child[] memory) {
    Child[] memory allChildren = new Child[](s_childrenNextId);

    for (uint256 i = 0; i < s_childrenNextId; i++) {
      allChildren[i] = s_children[i];
    }

    return allChildren;
  }
}
