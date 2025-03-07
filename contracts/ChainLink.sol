// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ChainLink Mock
 * @dev This is a simplified mock of Chainlink price feeds for testing purposes
 */
contract ChainLink is Ownable {
    // Price data
    uint256 private ethUsdPrice;
    uint8 public decimals = 8;
    string public description = "ETH / USD";
    
    // Constructor sets an initial ETH/USD price
    constructor() {
        // Set initial ETH price to $3000 with 8 decimals
        ethUsdPrice = 3000 * 10**8;
    }
    
    /**
     * @dev Returns the latest price of ETH in USD
     * @return roundId The round ID
     * @return answer The price answer
     * @return startedAt When the round started
     * @return updatedAt When the round was updated
     * @return answeredInRound The round in which the answer was computed
     */
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        return (
            uint80(block.number),
            int256(ethUsdPrice),
            block.timestamp - 3600,
            block.timestamp,
            uint80(block.number)
        );
    }
    
    /**
     * @dev Updates the ETH/USD price (only owner can update)
     * @param _newPrice New ETH/USD price with 8 decimals
     */
    function updatePrice(uint256 _newPrice) external onlyOwner {
        ethUsdPrice = _newPrice;
    }
    
    /**
     * @dev Returns the latest ETH/USD price
     * @return Latest price with 8 decimals
     */
    function getLatestPrice() external view returns (uint256) {
        return ethUsdPrice;
    }
}