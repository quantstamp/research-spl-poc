pragma solidity 0.8.24;
contract Token {
    string public name = "Name Goes here";
    string public symbol = "TICKER";
    uint256 public totalSupply = 21000000;
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    mapping(address => uint256) balances;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
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
    function changeOwner(address _newOwner) public onlyOwner
    {
        require(_newOwner != address(0), "Not valid address");
        owner = _newOwner;
    }
}
