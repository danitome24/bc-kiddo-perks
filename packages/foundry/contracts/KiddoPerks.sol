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

  IERC20 token;
  address public parent;

  mapping(uint256 => Child) public children;
  uint256 public childrenLength = 0;

  Perk[] public perks;

  mapping(uint256 => Task) public tasks;
  uint256[] s_tasksIds;
  uint256 public tasksLength = 0;

  mapping(uint256 => mapping(address => bool)) public completedTasksByUser;

  struct Task {
    string title;
    uint256 tokensReward;
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
    tasks[tasksLength] = Task(title, tokensReward);
    s_tasksIds.push();
    tasksLength++;
    emit TaskCreated(title);
  }

  function completeTask(uint256 taskId, address by) public onlyOwner {
    completedTasksByUser[taskId][by] = true;
    emit TaskCompleted(tasks[taskId].title, by);

    // TODO: reward
  }

  function removeTask(
    uint256 id
  ) public onlyOwner {
    delete tasks[id];
    tasksLength--;

    emit TaskRemoved(id);
  }

  function isTaskCompletedBy(
    uint256 taskId,
    address by
  ) public view returns (bool) {
    return completedTasksByUser[taskId][by];
  }

  function getAllTasks() public view returns (Task[] memory) {
    Task[] memory allTasks = new Task[](tasksLength);

    for (uint256 i = 0; i < tasksLength; i++) {
      allTasks[i] = tasks[i];
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
