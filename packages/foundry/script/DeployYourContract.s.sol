//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/KiddoPerks.sol";
import "./DeployHelpers.s.sol";

contract DeployYourContract is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    address PARENT = 0x97289b9C7AE16114D993057F81f99457224a59b3;

    KiddoPerks kiddoPerks = new KiddoPerks(PARENT);
    console.logString(
      string.concat(
        "YourContract deployed at: ", vm.toString(address(kiddoPerks))
      )
    );
  }
}
