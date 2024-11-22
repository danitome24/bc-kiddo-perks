//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/KiddoPerks.sol";
import "./DeployHelpers.s.sol";

contract DeployYourContract is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    address PARENT = 0x27dBc64e6C38633eD526d970258372476BCE58C0;

    KiddoPerks kiddoPerks = new KiddoPerks(PARENT);
    console.logString(
      string.concat(
        "YourContract deployed at: ", vm.toString(address(kiddoPerks))
      )
    );
  }
}
