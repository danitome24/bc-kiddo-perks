//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract KiddoPerks is Ownable {
  event TaskCreated(string title);
  event TaskCompleted(string title, address by);
  event PerkCreated(string title, uint256 tokensRequired);

  address public parent;
  address[] children;
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

  constructor(
    address _parent
  ) Ownable(_parent) {
    parent = _parent;
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
  function addChild(
    address child
  ) public onlyOwner { }
}
