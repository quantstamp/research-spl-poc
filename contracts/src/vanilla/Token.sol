pragma solidity 0.8.24;
contract Token {
    string public name = "Name Goes here";
    string public symbol = "TICKER";
    uint256 public totalSupply = 21000000;
    mapping(address => uint256) balances;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    constructor() {
        balances[msg.sender] = totalSupply;
    }
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
