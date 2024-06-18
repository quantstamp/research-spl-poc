// WARNING: 
// THIS CODE IS SIMPLIFIED AND WAS CREATED FOR TESTING 
// PURPOSES ONLY. DO NOT USE THIS CODE IN PRODUCTION!
pragma solidity 0.8.24;

import "./interfaces/IToken.sol";

contract Token is IToken {
    string public name = "Name Goes here";
    string public symbol = "TICKER";
    // The fixed amount of tokens, stored in an unsigned integer type variable.
    uint256 public totalSupply = 21000000;

#ifdef CONFIG_HAS_OWNER
    // An address type variable is used to store ethereum accounts.
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
#endif

    // A mapping is a key/value map. Here we store each account's balance.
    mapping(address => uint256) balances;
    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    constructor() {
        balances[msg.sender] = totalSupply;
#ifdef CONFIG_HAS_OWNER
        owner = msg.sender;
#endif
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;
        // Notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

#ifdef CONFIG_HAS_OWNER
    function changeOwner(address _newOwner) external onlyOwner
    {
        require(_newOwner != address(0), "Not valid address");
        owner = _newOwner;
    }
#endif
}