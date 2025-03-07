// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MYID Token
 * @dev ERC20 Token for the Agentify platform
 */
contract MYID is ERC20, ERC20Burnable, Ownable {
    // Token distribution parameters
    uint256 public constant INITIAL_SUPPLY = 100_000_000; // 100 million tokens
    
    // Constructor sets up the token with initial supply
    constructor() ERC20("MYID Token", "MYID") {
        // Mint the initial supply to the contract creator
        _mint(msg.sender, INITIAL_SUPPLY * (10 ** decimals()));
    }
    
    /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address to, uint256 amount) public onlyOwner returns (bool) {
        _mint(to, amount);
        return true;
    }
}