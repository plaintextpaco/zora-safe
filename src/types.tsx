export type Recipient = { address: string; amount: number }

export type Token = {
  address: string
  faucetAddress: string
}

export type NetworkConfig = {
  linearStrategy: string
  tokens: {
    DAI: Token
  }
}
