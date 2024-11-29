//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { KiddoPerks } from "../contracts/KiddoPerks.sol";
import { KDOToken } from "../contracts/KDOToken.sol";
import { ScaffoldETHDeploy, console } from "./DeployHelpers.s.sol";

contract DeployKiddoPerks is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    address PARENT = 0x27dBc64e6C38633eD526d970258372476BCE58C0;

    KDOToken token = new KDOToken();

    KiddoPerks kiddoPerks = new KiddoPerks(PARENT, token);
    console.logString(
      string.concat(
        "KiddoPerks deployed at: ", vm.toString(address(kiddoPerks))
      )
    );
  }
}
