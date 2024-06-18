contract Retirable {
  address payable public receiver;

  constructor(address payable _receiver) {
    receiver = _receiver;
  }

  function retire() external {
    require(msg.sender == receiver);
#ifdef CONFIG_MAINNET
    selfdestruct(receiver);
#else
    receiver.transfer(address(this).balance);
#endif
  }
}