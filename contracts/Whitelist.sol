// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Whitelist{

    uint8 public maxNumberOfWhiteListedAddress;

    uint8 public numberOfWhiteListedAddress;

    constructor(uint8 _maxNumberOfWhiteListedAddress){
        maxNumberOfWhiteListedAddress = _maxNumberOfWhiteListedAddress;
    }

    mapping(address => bool) public WhiteListedAddresses;

    function addAddressToWhiteList() public{
        require(!WhiteListedAddresses[msg.sender],"You are already in whitelist");
        require(numberOfWhiteListedAddress < maxNumberOfWhiteListedAddress , "Maximum limit reached");

        WhiteListedAddresses[msg.sender] = true;
        numberOfWhiteListedAddress += 1;

    }

}