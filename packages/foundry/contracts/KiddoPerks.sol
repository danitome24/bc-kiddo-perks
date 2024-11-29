//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract KiddoPerks is Ownable {
  event TaskCreated(string title);
  event TaskCompleted(string title, address by);
  event PerkCreated(string title, uint256 tokensRequired);
  event ChildAdded(string name, address childAddr);

  IERC20 token;
  address public parent;
  Child[] children;
  Perk[] perks;
  mapping(uint256 => Task) public tasks;
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

  constructor(address _parent, IERC20 _token) Ownable(_parent) {
    parent = _parent;
    token = _token;
  }

  /**
   * Tasks
   */
  function createTask(
    string memory title,
    uint256 tokensReward
  ) public onlyOwner {
    tasks[tasksLength] = Task(title, tokensReward);
    tasksLength++;
    emit TaskCreated(title);
  }

  function completeTask(uint256 taskId, address by) public onlyOwner {
    completedTasksByUser[taskId][by] = true;
    emit TaskCompleted(tasks[taskId].title, by);

    // TODO: reward
  }

  function isTaskCompletedBy(
    uint256 taskId,
    address by
  ) public view returns (bool) {
    return completedTasksByUser[taskId][by];
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

  /**
   * Children
   */
  function addChild(string memory name, address childAddr) public onlyOwner {
    Child memory newChild = Child(name, childAddr);
    children.push(newChild);

    emit ChildAdded(name, childAddr);
  }
}
