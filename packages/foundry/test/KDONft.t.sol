// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { KDONft } from "../contracts/KDONft.sol";

contract KDONftTest is Test {
  KDONft kdoNft;

  function setUp() public {
    kdoNft = new KDONft();
  }
}
