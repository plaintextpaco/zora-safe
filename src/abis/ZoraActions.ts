const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "zoraFactory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "strategy",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "time",
          "type": "uint64"
        },
        {
          "internalType": "address[]",
          "name": "recipients",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "createMultipleStreams",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
export default abi;
