// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract USDT is ERC20, ERC20Burnable, Ownable, Pausable {
    uint256 public basisPointsRate = 0;
    uint256 public maximumFee = 0;
    uint256 public constant MAX_UINT = type(uint256).max;
    address public upgradedAddress;
    bool public deprecated;

    mapping(address => bool) public isBlackListed;
    
    event Issue(uint256 amount);
    event Redeem(uint256 amount);
    event Deprecate(address newAddress);
    event Params(uint256 feeBasisPoints, uint256 maxFee);
    event DestroyedBlackFunds(address _blackListedUser, uint256 _balance);
    event AddedBlackList(address _user);
    event RemovedBlackList(address _user);

    constructor(
        uint256 _initialSupply,
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, _initialSupply * (10 ** _decimals));
    }

    function deprecate(address _upgradedAddress) public onlyOwner {
        require(_upgradedAddress != address(0), "New address cannot be zero address");
        upgradedAddress = _upgradedAddress;
        deprecated = true;
        emit Deprecate(_upgradedAddress);
    }

    function getOwner() external view returns (address) {
        return owner();
    }

    function addBlackList(address _evilUser) public onlyOwner {
        isBlackListed[_evilUser] = true;
        emit AddedBlackList(_evilUser);
    }

    function removeBlackList(address _clearedUser) public onlyOwner {
        isBlackListed[_clearedUser] = false;
        emit RemovedBlackList(_clearedUser);
    }

    function destroyBlackFunds(address _blackListedUser) public onlyOwner {
        require(isBlackListed[_blackListedUser], "Address is not blacklisted");
        uint256 dirtyFunds = balanceOf(_blackListedUser);
        _burn(_blackListedUser, dirtyFunds);
        emit DestroyedBlackFunds(_blackListedUser, dirtyFunds);
    }

    function getBlackListStatus(address _maker) external view returns (bool) {
        return isBlackListed[_maker];
    }

    function setParams(uint256 newBasisPoints, uint256 newMaxFee) public onlyOwner {
        require(newBasisPoints < 20, "Basis points cannot exceed 0.2%");
        require(newMaxFee < 50, "Maximum fee cannot exceed 0.5%");
        basisPointsRate = newBasisPoints;
        maximumFee = newMaxFee;
        emit Params(basisPointsRate, maximumFee);
    }

    function issue(uint256 amount) public onlyOwner {
        _mint(owner(), amount);
        emit Issue(amount);
    }

    function redeem(uint256 amount) public onlyOwner {
        _burn(owner(), amount);
        emit Redeem(amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _transfer(address from, address to, uint256 value) internal whenNotPaused override {
        require(!isBlackListed[from], "Sender is blacklisted");
        require(!isBlackListed[to], "Recipient is blacklisted");

        if (deprecated) {
            return;
        }

        uint256 fee = (value * basisPointsRate) / 10000;
        if (fee > maximumFee) {
            fee = maximumFee;
        }
        uint256 sendAmount = value - fee;

        super._transfer(from, to, sendAmount);
        
        if (fee > 0) {
            super._transfer(from, owner(), fee);
        }
    }

    // Override to maintain API compatibility with original ABI
    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }

    // Override to maintain API compatibility with original ABI
    function transfer(address to, uint256 value) public override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    // Override to maintain API compatibility with original ABI
    function approve(address spender, uint256 value) public override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, value);
        return true;
    }
}