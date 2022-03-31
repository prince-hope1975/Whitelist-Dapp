// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Whitelist{

    uint8 public maxWhitelistAddresses;

    mapping(address => bool) public whitelistedAddresses;

    uint8 public numAddressWhitelisted;

    constructor(uint8 _maxWhitelistedAddresses){
        maxWhitelistAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public{
        require(!whitelistedAddresses[msg.sender],"Sender has already been whitelsted");

        require(numAddressWhitelisted < maxWhitelistAddresses, "More adresses can't be added, limit reached");

        whitelistedAddresses[msg.sender] = true;

        numAddressWhitelisted +=1;
    }
}