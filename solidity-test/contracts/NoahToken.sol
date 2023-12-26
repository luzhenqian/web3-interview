// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NoahToken is ERC20, Ownable {
    uint256 public maxSupply;
    uint256 public mintPrice = 0.01 ether;
    uint256 public mintedAmount = 0;

    constructor() ERC20("NoahToken", "NOAH") Ownable(msg.sender) {
        uint256 initialSupply = 2100000000 * (10 ** uint256(decimals())); // 设定初始供应量为 21 亿
        maxSupply = initialSupply;
        _mint(msg.sender, initialSupply / 10); // 部署者获得 10% 的初始供应量
        mintedAmount += initialSupply / 10; // 更新已铸造量
    }

    function mint(address to, uint256 amount) public payable {
        require(msg.value >= mintPrice * amount, "Insufficient minting price");
        require(
            mintedAmount + amount <= maxSupply,
            "Minting would exceed max supply"
        );
        uint256 currentMintedPercent = ((amount * 100) / maxSupply);
        require(
            currentMintedPercent <= 10,
            "Cannot mint more than 10% at once"
        );

        _mint(to, amount);
        mintedAmount += amount;

        // 每铸造 10% 时，铸造价格翻倍
        if (currentMintedPercent == 10) {
            mintPrice *= 2;
        }
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
