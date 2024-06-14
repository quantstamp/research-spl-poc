// WARNING: 
// THIS CODE IS SIMPLIFIED AND WAS CREATED FOR TESTING 
// PURPOSES ONLY. DO NOT USE THIS CODE IN PRODUCTION!
pragma solidity 0.8.24;

interface IToken {
    function transfer(address to, uint256 amount) external;

    function balanceOf(address account) external view returns (uint256);

#ifdef CONFIG_HAS_OWNER
    function changeOwner(address _newOwner) external;
#endif
}