//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract KDOToken is ERC20, Ownable {
  event TokenMinted(address by, uint256 amount);

  constructor() ERC20("Kiddo Token", "KDO") Ownable(msg.sender) { }

  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }
}
