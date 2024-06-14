pragma solidity 0.8.24;
interface IToken {
    function transfer(address to, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
    function changeOwner(address _newOwner) external;
}
