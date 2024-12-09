//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract KDONft is ERC721 {
  //////////////
  // EVENTS
  //////////////
  event KDONftMinted(address by, uint256 tokenId);

  //////////////
  // ERRORS
  //////////////
  error KDONft__NftDoesNotExist(uint256 tokenId);
  error KDONft__MinimumTasksCompletedRequired();
  error KDONft__CannotMintNFTMoreThanOnce(address who);

  enum TaskMilestone {
    FIVE,
    TEN,
    TWENTY,
    FIFTY,
    HUNDRED
  }

  //////////////
  // CONST
  //////////////
  uint256 constant FIVE = 5;
  uint256 constant TEN = 10;
  uint256 constant TWENTY = 20;
  uint256 constant FIFTY = 50;
  uint256 constant HUNDRED = 100;

  //////////////
  // STATE VARIABLES
  //////////////
  uint256 public s_nextTokenId;
  mapping(address child => TaskMilestone taskMilestone) public s_childLastNftMinted;

  constructor() ERC721("KiddoPerks NFT", "KDONft") {
    s_nextTokenId = 0;
  }

  /**
   * @notice Mint an NFT if the user has completed enough tasks to reach a milestone.
   * @param to Address of the user to mint the NFT for.
   * @param numTasksCompleted Number of tasks the user has completed.
   */
  function mintNft(address to, uint256 numTasksCompleted) public hasCompletedMinTasks(numTasksCompleted) {
    TaskMilestone currentTaskMilestone = _getMilestone(numTasksCompleted);
    if (s_childLastNftMinted[to] == currentTaskMilestone) {
      revert KDONft__CannotMintNFTMoreThanOnce(to);
    }

    _safeMint(to, s_nextTokenId);
    emit KDONftMinted(to, s_nextTokenId);
    s_nextTokenId++;

    s_childLastNftMinted[to] = currentTaskMilestone;
  }

  /**
   * @notice Returns the metadata URI for a given token ID.
   * @param tokenId The ID of the token.
   */
  function tokenURI(
    uint256 tokenId
  ) public view override returns (string memory) {
    if (tokenId >= s_nextTokenId) {
      revert KDONft__NftDoesNotExist(tokenId);
    }
    return "";
  }

  /**
   * @dev Helper function to determine the milestone based on tasks completed.
   * @param numTasksCompleted The number of tasks completed by the user.
   * @return The milestone the user has reached.
   */
  function _getMilestone(
    uint256 numTasksCompleted
  ) internal pure hasCompletedMinTasks(numTasksCompleted) returns (TaskMilestone) {
    if (numTasksCompleted >= FIVE) {
      return TaskMilestone.HUNDRED;
    } else if (numTasksCompleted >= FIFTY) {
      return TaskMilestone.FIFTY;
    } else if (numTasksCompleted >= TWENTY) {
      return TaskMilestone.TWENTY;
    } else if (numTasksCompleted >= TEN) {
      return TaskMilestone.TEN;
    }
    return TaskMilestone.FIVE;
  }

  /**
   * Modifiers
   */
  modifier hasCompletedMinTasks(
    uint256 numTasksCompleted
  ) {
    if (numTasksCompleted < FIVE) {
      revert KDONft__MinimumTasksCompletedRequired();
    }
    _;
  }
}
