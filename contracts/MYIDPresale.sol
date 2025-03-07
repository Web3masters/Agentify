// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ChainLink.sol";

/**
 * @title MYIDPresale
 * @dev Contract for the MYID token presale
 */
contract MYIDPresale is Ownable {
    // Token contract addresses
    IERC20 public usdtToken;
    IERC20 public stakingToken;
    ChainLink public chainLink;
    
    address public usdtAddress;
    address public stakingTokenAddress;
    
    // Presale configuration
    uint256 public tokensPerUsdt = 10; // 10 MYID tokens per 1 USDT
    uint256 public tokensAllocatedForPresale = 10_000_000 * 10**18; // 10 million tokens
    uint256 public totalTokensSold = 0;
    uint256 public raisedUsdt = 0;
    uint256 public presaleEndTime;
    bool public presaleSuccessful = false;
    
    // User contribution trackers
    mapping(address => uint256) public contributionsUSDT;
    mapping(address => uint256) public contributionsEth;
    mapping(address => uint256) public boughtTokens;
    
    // Events
    event ContributedUsdt(address buyer, uint256 amountBought, uint256 timestamp);
    event ContributedETH(address buyer, uint256 ethAmount, uint256 timestamp);
    
    /**
     * @dev Constructor sets up the presale contract
     */
    constructor() {
        // Default presale end time (30 days from deployment)
        presaleEndTime = block.timestamp + 30 days;
    }
    
    /**
     * @dev Sets the USDT and MYID token addresses
     * @param _usdtAddress Address of the USDT token contract
     * @param _stakingTokenAddress Address of the MYID token contract
     * @param _chainLinkAddress Address of the ChainLink price feed contract
     */
    function initialize(
        address _usdtAddress,
        address _stakingTokenAddress,
        address _chainLinkAddress
    ) external onlyOwner {
        require(_usdtAddress != address(0), "Invalid USDT address");
        require(_stakingTokenAddress != address(0), "Invalid MYID address");
        require(_chainLinkAddress != address(0), "Invalid ChainLink address");
        
        usdtAddress = _usdtAddress;
        stakingTokenAddress = _stakingTokenAddress;
        
        usdtToken = IERC20(_usdtAddress);
        stakingToken = IERC20(_stakingTokenAddress);
        chainLink = ChainLink(_chainLinkAddress);
    }
    
    /**
     * @dev Calculate ETH price in USD using ChainLink oracle
     * @param ethAmount Amount of ETH
     * @return USD value
     */
    function ethToUsd(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPriceUsd = getEthPrice();
        // Convert to 18 decimals (ETH) from 8 decimals (ChainLink)
        return (ethAmount * ethPriceUsd) / 10**8;
    }
    
    /**
     * @dev Get the current ETH price from ChainLink
     * @return ETH price in USD (8 decimals)
     */
    function ethPrice() public view returns (uint256) {
        return getEthPrice();
    }
    
    /**
     * @dev Internal function to get ETH price from ChainLink
     * @return ETH price with 8 decimals
     */
    function getEthPrice() internal view returns (uint256) {
        (, int256 price, , , ) = chainLink.latestRoundData();
        return uint256(price);
    }
    
    /**
     * @dev Calculate tokens to be received for ETH contribution
     * @param ethAmount Amount of ETH
     * @return Number of tokens
     */
    function ethToTokens(uint256 ethAmount) public view returns (uint256) {
        uint256 usdValue = ethToUsd(ethAmount) / 10**18;
        return usdValue * tokensPerUsdt * 10**18;
    }
    
    /**
     * @dev Calculate tokens to be received for USDT contribution
     * @param usdtAmount Amount of USDT (with 6 decimals)
     * @return Number of tokens (with 18 decimals)
     */
    function usdtToTokens(uint256 usdtAmount) public view returns (uint256) {
        // Convert from USDT (6 decimals) to tokens (18 decimals)
        return (usdtAmount * tokensPerUsdt * 10**12);
    }
    
    /**
     * @dev Contribute ETH to the presale
     */
    function contributeEth() external payable {
        require(block.timestamp < presaleEndTime, "Presale ended");
        require(msg.value > 0, "Must send ETH");
        
        uint256 tokenAmount = ethToTokens(msg.value);
        require(totalTokensSold + tokenAmount <= tokensAllocatedForPresale, "Exceeds allocation");
        
        // Track contributions
        contributionsEth[msg.sender] += msg.value;
        boughtTokens[msg.sender] += tokenAmount;
        totalTokensSold += tokenAmount;
        
        emit ContributedETH(msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @dev Contribute USDT to the presale
     * @param usdtAmount Amount of USDT to contribute
     */
    function contributeUSDT(uint256 usdtAmount) external {
        require(block.timestamp < presaleEndTime, "Presale ended");
        require(usdtAmount > 0, "Must send USDT");
        require(address(usdtToken) != address(0), "USDT not configured");
        
        uint256 tokenAmount = usdtToTokens(usdtAmount);
        require(totalTokensSold + tokenAmount <= tokensAllocatedForPresale, "Exceeds allocation");
        
        // Transfer USDT from sender to contract
        require(usdtToken.transferFrom(msg.sender, address(this), usdtAmount), "USDT transfer failed");
        
        // Track contributions
        contributionsUSDT[msg.sender] += usdtAmount;
        boughtTokens[msg.sender] += tokenAmount;
        totalTokensSold += tokenAmount;
        raisedUsdt += usdtAmount;
        
        emit ContributedUsdt(msg.sender, tokenAmount, block.timestamp);
    }
    
    /**
     * @dev Get current presale stage
     * @return Current stage (1-based)
     */
    function getStage() public view returns (uint256) {
        uint256 percentSold = (totalTokensSold * 100) / tokensAllocatedForPresale;
        
        if (percentSold < 25) return 1;
        if (percentSold < 50) return 2;
        if (percentSold < 75) return 3;
        return 4;
    }
    
    /**
     * @dev Get presale progress percentage
     * @return Percentage of tokens sold (0-100)
     */
    function progress() public view returns (uint256) {
        return (totalTokensSold * 100) / tokensAllocatedForPresale;
    }
    
    /**
     * @dev Get general presale information
     * @return stage Current stage
     * @return progressPercent Progress percentage
     * @return totalInvestors Number of unique investors
     * @return tokensRemaining Tokens remaining for sale
     * @return timeRemaining Time remaining in seconds
     * @return tokenPrice Price per token in USDT
     */
    function genInfo() public view returns (
        uint256, uint256, uint256, uint256, uint256, uint256
    ) {
        uint256 stage = getStage();
        uint256 progressPercent = progress();
        uint256 totalInvestors = 0; // This is simplified - would require counting unique addresses
        uint256 tokensRemaining = tokensAllocatedForPresale - totalTokensSold;
        uint256 timeRemaining = block.timestamp < presaleEndTime ? presaleEndTime - block.timestamp : 0;
        uint256 tokenPrice = tokensPerUsdt; // Simplified - actual USD value per token
        
        return (stage, progressPercent, totalInvestors, tokensRemaining, timeRemaining, tokenPrice);
    }
    
    /**
     * @dev Get balances of an address
     * @param _addr The address to check
     * @return USDT contribution, ETH contribution, tokens bought, token balance
     */
    function balancesOf(address _addr) public view returns (
        uint256, uint256, uint256, uint256
    ) {
        uint256 usdtContribution = contributionsUSDT[_addr];
        uint256 ethContribution = contributionsEth[_addr];
        uint256 tokensBought = boughtTokens[_addr];
        uint256 tokenBalance = stakingToken.balanceOf(_addr);
        
        return (usdtContribution, ethContribution, tokensBought, tokenBalance);
    }
    
    /**
     * @dev Get contract balances
     * @return usdtBal USDT balance of the contract
     * @return ethBal ETH balance of the contract
     */
    function assetsBalance() public view returns (uint256 usdtBal, uint256 ethBal) {
        usdtBal = usdtToken.balanceOf(address(this));
        ethBal = address(this).balance;
    }
    
    /**
     * @dev Update presale end date
     * @param _date New date (timestamp)
     * @param number Reserved parameter (unused)
     */
    function updateDate(uint256 _date, uint256 number) external onlyOwner {
        presaleEndTime = _date;
    }
    
    /**
     * @dev Set presale success state
     * @param _presaleSuccessful Success status
     */
    function setPresale(bool _presaleSuccessful) external onlyOwner {
        presaleSuccessful = _presaleSuccessful;
    }
    
    /**
     * @dev Withdraw collected ETH (only owner)
     */
    function widthdrawEth() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Withdraw collected USDT (only owner)
     * @param _amount Amount to withdraw
     */
    function widthdrawUSDT(uint256 _amount) external onlyOwner {
        require(usdtToken.transfer(owner(), _amount), "USDT transfer failed");
    }
    
    /**
     * @dev Withdraw MYID tokens (only owner)
     * @param _amount Amount to withdraw
     */
    function widthdrawToken(uint256 _amount) external onlyOwner {
        require(stakingToken.transfer(owner(), _amount), "Token transfer failed");
    }
}