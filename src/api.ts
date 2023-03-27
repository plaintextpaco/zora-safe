import { ERC20_ABI, ERC20_FAUCET_ABI } from './abis'
import { Interface } from 'ethers'
import { Token, Recipient } from './types'

const faucetInterface: Interface = new Interface(ERC20_FAUCET_ABI)
const tokenInterface: Interface = new Interface(ERC20_ABI)

export async function buildApproval(token: Token, recipients: Array<Recipient>): Promise<string> {
  return tokenInterface.encodeFunctionData('approve', [
    token.faucetAddress,
    // hardcoded decimals
    recipients.reduce((acc, it) => acc + BigInt(it.amount), BigInt(0)) * BigInt(10) ** BigInt(18),
  ])
}

export async function buildMint(recipient: Recipient, lockTime: number, strategy: string): Promise<string> {
  return faucetInterface.encodeFunctionData('mint', [
    recipient.address,
    // hardcoded decimals
    BigInt(recipient.amount) * BigInt(10) ** BigInt(18),
    BigInt(lockTime) * BigInt(24 * 60 * 60),
    strategy,
    false,
  ])
}
