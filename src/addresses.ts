import { NetworkConfig } from './types'
const addresses: { [chainid: number]: NetworkConfig } = {
  5: {
    linearStrategy: '0xfd36c0b2f508e6afb4c1c66e16b45e2a61a73136',
    tokens: {
      DAI: {
        address: '0x88271d333c72e51516b67f5567c728e702b3eee8',
        faucetAddress: '0xa5923cf8b83a1b05647ae74c6c054ac7fee3813d',
      },
    },
  },
}

export default addresses
