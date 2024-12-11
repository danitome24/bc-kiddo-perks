//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { KiddoPerks } from "../contracts/KiddoPerks.sol";
import { KDOToken } from "../contracts/KDOToken.sol";
import { KDONft } from "../contracts/KDONft.sol";
import { ScaffoldETHDeploy, console } from "./DeployHelpers.s.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";

contract DeployKiddoPerks is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    string memory fiveTasksAchievedSvg =
      vm.readFile("./nfts/5tasksAchieved.svg");
    string memory tenTasksAchievedSvg =
      vm.readFile("./nfts/10tasksAchieved.svg");
    string memory twentyTasksAchievedSvg =
      vm.readFile("./nfts/20tasksAchieved.svg");
    string memory fiftyTasksAchievedSvg =
      vm.readFile("./nfts/50tasksAchieved.svg");
    string memory hundredTasksAchievedSvg =
      vm.readFile("./nfts/100tasksAchieved.svg");

    address PARENT = 0x27dBc64e6C38633eD526d970258372476BCE58C0;

    KDOToken token = new KDOToken();
    KDONft nft = new KDONft(
      fiveTasksAchievedSvg,
      tenTasksAchievedSvg,
      twentyTasksAchievedSvg,
      fiftyTasksAchievedSvg,
      hundredTasksAchievedSvg
    );

    KiddoPerks kiddoPerks = new KiddoPerks(token, nft);
    console.logString(
      string.concat(
        "KiddoPerks deployed at: ", vm.toString(address(kiddoPerks))
      )
    );
    kiddoPerks.setParent(PARENT);
    token.transferOwnership(address(kiddoPerks));
  }

  function svgToImageURI(
    string memory svg
  ) public pure returns (string memory) {
    string memory baseUrl = "data:image/svg+xml;base64,";
    string memory svgBase64Encoded =
      Base64.encode(bytes(string(abi.encodePacked(svg))));

    return string(abi.encodePacked(baseUrl, svgBase64Encoded));
  }
}
