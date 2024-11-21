//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract KiddoPerks {
  event TaskCreated(string title);
  event TaskCompleted(string title, address by);
  event PerkCreated(string title, uint256 tokensRequired);

  address parent;
  address[] children;
  Perk[] perks;
  mapping(uint256 => Task) public tasks;
  uint256 public tasksLength = 0;

  struct Task {
    string title;
    bool completed;
  }

  struct Perk {
    string title;
    uint256 tokensRequired;
  }

  constructor() { }

  /**
   * Tasks
   */
  function createTask(
    string memory title
  ) public {
    tasks[tasksLength] = Task(title, false);
    tasksLength++;
    emit TaskCreated(title);
  }

  function completeTask(
    uint256 id
  ) public { }

  /**
   * Perks
   */
  function createPerk(string memory title, uint256 tokensRequired) public {
    Perk memory newPerk = Perk(title, tokensRequired);
    perks.push(newPerk);
  }

  /**
   * Children
   */
  function addChild(
    address child
  ) public { }
}
