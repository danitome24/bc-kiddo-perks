//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract KiddoPerks is Ownable {
  event TaskCreated(string title);
  event TaskCompleted(string title, address by);
  event PerkCreated(string title, uint256 tokensRequired);
  event ChildAdded(string name, address childAddr);
  event ChildRemoved(uint256 id);
  event ParentUpdated(address newParentAddress);
  event TaskRemoved(uint256 id);

  error KiddoPerks__NotValidId(uint256 id);
  error KiddoPerks__TaskAlreadyRemoved(uint256 id);
  error KiddoPerks__TaskNotFound(uint256 id);
  error KiddoPerks__CannotCompleteRemovedTask(uint256 id);

  IERC20 token;
  address public parent;

  mapping(uint256 => Child) public children;
  uint256 public childrenLength = 0;

  Perk[] public perks;

  mapping(uint256 => Task) public s_tasks;
  uint256 public s_taskNextId = 0;
  uint256 public s_activeTaskCount = 0;
  mapping(uint256 => mapping(address => bool)) public s_completedTasksByUser;

  struct Task {
    string title;
    uint256 tokensReward;
    bool removed;
  }

  struct Perk {
    string title;
    uint256 tokensRequired;
  }

  struct Child {
    string name;
    address childAddr;
  }

  constructor(
    IERC20 _token
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
    s_tasks[s_taskNextId] = Task(title, tokensReward, false);
    s_taskNextId++;
    s_activeTaskCount++;
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
    if (s_tasks[taskId].removed) {
      revert KiddoPerks__CannotCompleteRemovedTask(taskId);
    }
    s_completedTasksByUser[taskId][by] = true;
    emit TaskCompleted(s_tasks[taskId].title, by);

    // TODO: reward
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
    s_activeTaskCount--;

    emit TaskRemoved(id);
  }

  function isTaskCompletedBy(
    uint256 taskId,
    address by
  ) public view returns (bool) {
    return s_completedTasksByUser[taskId][by];
  }

  function getAllTasks() public view returns (Task[] memory) {
    Task[] memory allTasks = new Task[](s_activeTaskCount);

    uint256 index = 0;
    for (uint256 i = 0; i < s_taskNextId; i++) {
      if (!s_tasks[i].removed) {
        allTasks[index] = s_tasks[i];
        index++;
      }
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
    Perk memory newPerk = Perk(title, tokensRequired);
    perks.push(newPerk);
    emit PerkCreated(title, tokensRequired);
  }

  function getAllPerks() public view returns (Perk[] memory) {
    return perks;
  }

  /**
   * Children
   */
  function addChild(string memory name, address childAddr) public onlyOwner {
    Child memory newChild = Child(name, childAddr);
    children[childrenLength] = newChild;
    childrenLength++;

    emit ChildAdded(name, childAddr);
  }

  function removeChild(
    uint256 id
  ) public onlyOwner {
    delete children[id];
    childrenLength--;

    emit ChildRemoved(id);
  }

  function getAllChildren() public view returns (Child[] memory) {
    Child[] memory allChildren = new Child[](childrenLength);

    for (uint256 i = 0; i < childrenLength; i++) {
      allChildren[i] = children[i];
    }

    return allChildren;
  }
}
