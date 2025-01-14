//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";
import { KiddoPerks } from "./KiddoPerks.sol";

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
  error KDONft__NotEnoughTasksCompletedToMint(
    address who, uint256 nftTasksCompleted
  );

  enum TaskMilestone {
    NONE, // Needed to first comparison. If not, first comparison will revert.
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
  KiddoPerks kiddoPerks;
  uint256 public s_nextTokenId;
  mapping(address child => TaskMilestone taskMilestone) public
    s_childLastNftMinted;
  mapping(uint256 tokenId => TaskMilestone taskMilestone) public
    s_tokenIdToMilestone;

  string private s_fiveSvgImageUri;
  string private s_tenSvgImageUri;
  string private s_twentySvgImageUri;
  string private s_fiftySvgImageUri;
  string private s_hundredSvgImageUri;

  constructor(
    address _kiddoPerks,
    string memory fiveSvgImageUri,
    string memory tenSvgImageUri,
    string memory twentySvgImageUri,
    string memory fiftySvgImageUri,
    string memory hundredSvgImageUri
  ) ERC721("KiddoPerks NFT", "KDONft") {
    s_nextTokenId = 0;
    kiddoPerks = KiddoPerks(_kiddoPerks);
    s_fiveSvgImageUri = fiveSvgImageUri;
    s_tenSvgImageUri = tenSvgImageUri;
    s_twentySvgImageUri = twentySvgImageUri;
    s_fiftySvgImageUri = fiftySvgImageUri;
    s_hundredSvgImageUri = hundredSvgImageUri;
  }

  /**
   * @notice Mint an NFT if the user has completed enough tasks to reach a milestone.
   * @param to Address of the user to mint the NFT for.
   * @param numTasksCompleted Number of tasks the user has completed.
   */
  function mintNft(
    address to,
    uint256 numTasksCompleted
  ) external hasCompletedMinTasks(numTasksCompleted) {
    if (numTasksCompleted > kiddoPerks.s_childNumTasksCompleted(msg.sender)) {
      revert KDONft__NotEnoughTasksCompletedToMint(
        msg.sender, numTasksCompleted
      );
    }
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

    string memory imageUri =
      _getImageUriForMilestone(s_tokenIdToMilestone[tokenId]);

    return string(
      abi.encodePacked(
        _baseURI(),
        Base64.encode(
          bytes(
            abi.encodePacked(
              '{"name": "}',
              name(),
              '", "description": "An NFT that reflects the number of tasks completed on KiddoPerks.", "image:":',
              imageUri,
              '"}'
            )
          )
        )
      )
    );
  }

  /**
   * @dev We need to let metadata know that the content is JSON.
   */
  function _baseURI() internal pure override returns (string memory) {
    return "data:application/json;base64,";
  }

  /**
   * @dev Gets image uri given a task milestone
   * @param milestone Milestone task for tokenId
   */
  function _getImageUriForMilestone(
    TaskMilestone milestone
  ) internal view returns (string memory) {
    if (milestone == TaskMilestone.FIVE) {
      return s_fiveSvgImageUri;
    } else if (milestone == TaskMilestone.TEN) {
      return s_tenSvgImageUri;
    } else if (milestone == TaskMilestone.TWENTY) {
      return s_twentySvgImageUri;
    } else if (milestone == TaskMilestone.FIFTY) {
      return s_fiftySvgImageUri;
    } else if (milestone == TaskMilestone.HUNDRED) {
      return s_hundredSvgImageUri;
    } else {
      revert("Invalid milestone");
    }
  }

  /**
   * @dev Helper function to determine the milestone based on tasks completed.
   * @param numTasksCompleted The number of tasks completed by the user.
   * @return The milestone the user has reached.
   */
  function _getMilestone(
    uint256 numTasksCompleted
  ) public pure hasCompletedMinTasks(numTasksCompleted) returns (TaskMilestone) {
    if (numTasksCompleted >= HUNDRED) {
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
