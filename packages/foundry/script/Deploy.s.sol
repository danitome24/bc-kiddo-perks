//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { DeployKiddoPerks } from "./DeployKiddoPerks.s.sol";

contract DeployScript is ScaffoldETHDeploy {
  function run() external {
    DeployKiddoPerks deployKiddoPerks = new DeployKiddoPerks();
    deployKiddoPerks.run();

    // deploy more contracts here
    // DeployMyContract deployMyContract = new DeployMyContract();
    // deployMyContract.run();
  }
}
