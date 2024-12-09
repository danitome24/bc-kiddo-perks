//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract KDONft is ERC721 {
  event KDONftMinted(address by, uint256 tokenId);

  error KDONft__NftDoesNotExist(uint256 tokenId);

  enum TasksThreshold {
    FIVE,
    TEN,
    TWENTY,
    FIFTY,
    HUNDRED
  }

  uint256 public s_nextTokenId;
  mapping(address child => TasksThreshold tasksCompleted) public
    s_childLastNftMinted;

  constructor() ERC721("KiddoPerks NFT", "KDONft") {
    s_nextTokenId = 0;
  }

  function mintNft(address to) public {
    _safeMint(to, s_nextTokenId);
    emit KDONftMinted(to, s_nextTokenId);
    s_childToTokenId[s_nextTokenId] = s_nextTokenId++;
  }

  function tokenURI(
    uint256 tokenId
  ) public view override returns (string memory) {
    if (tokenId >= s_nextTokenId) {
      revert KDONft__NftDoesNotExist(tokenId);
    }
    return "";
  }
}
