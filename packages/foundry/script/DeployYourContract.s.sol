//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/KiddoPerks.sol";
import "./DeployHelpers.s.sol";

contract DeployYourContract is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    KiddoPerks yourContract = new KiddoPerks();
    console.logString(
      string.concat(
        "KiddoPerks deployed at: ", vm.toString(address(yourContract))
      )
    );
  }
}
