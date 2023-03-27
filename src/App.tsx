import React, { useState } from 'react'
import styled from 'styled-components'
import { Title } from '@gnosis.pm/safe-react-components'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk'
import { AddressInput, TextFieldInput, Button } from '@gnosis.pm/safe-react-components'
import { buildApproval, buildMint } from './api'
import { Recipient } from './types'
import addresses from './addresses'

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const FormBox = styled.div`
  padding: 1 rem;
`
const SafeApp = (): React.ReactElement => {
  const [recipients, setRecipients] = useState<Array<Recipient>>([])
  const [newRecipientAddress, setNewRecipientAddress] = useState<string>('')
  const [newRecipientAmount, setNewRecipientAmount] = useState<number>(0)
  const { sdk, safe } = useSafeAppsSDK()
  const [lockTime, setLockTime] = useState<number>(0)

  async function handleTransfer(): Promise<void> {
    const approve: BaseTransaction = {
      value: '0',
      to: goerli.tokens.DAI.address,
      data: await buildApproval(goerli.tokens.DAI, recipients),
    }
    const mints = recipients.map(async (re) => {
      return {
        value: '0',
        to: goerli.tokens.DAI.faucetAddress,
        data: await buildMint(re, lockTime, goerli.linearStrategy),
      }
    })

    const ret = await sdk.txs.send({ txs: await Promise.all([approve, ...mints]) })

    console.log(ret)
  }

  function appendRecipient(r: Recipient) {
    setRecipients([...recipients, r])
    setNewRecipientAmount(0)
    setNewRecipientAddress('')
  }

  if (safe.chainId !== 5) {
    return <Title size="xl"> Unsupported network, this only works on goerli </Title>
  }
  const goerli = addresses['5']

  return (
    <Container>
      <Title size="lg">Create batch of token streams: </Title>
      <div>
        <Title size="sm">using safe: {safe.safeAddress}</Title>
        <Title size="sm">network: {safe.chainId}</Title>
      </div>
      <FormBox>
        <Row>
          <AddressInput
            label="Token"
            name="Token to stream"
            address={goerli.tokens.DAI.address}
            onChangeAddress={function () {
              /*noop*/
            }}
            disabled
          />
        </Row>
        <Row>
          <AddressInput
            label="Strategy"
            name="strategy for all the streams"
            address={goerli.linearStrategy}
            onChangeAddress={function () {
              /*noop*/
            }}
            disabled
          />
        </Row>
        <Row>
          <TextFieldInput
            id="lockTime"
            name="lockTime"
            label="lock time (days)"
            type="number"
            onChange={(e) => setLockTime(parseInt(e.target.value))}
            value={lockTime}
          />
        </Row>
        {recipients.map(RecipientRow)}
        <div style={{ display: 'flex', alignItems: 'center', padding: '1em 0' }}>
          <AddressInput
            label="recipient"
            name="stream recipient"
            address={newRecipientAddress}
            onChangeAddress={(e) => {
              setNewRecipientAddress(e)
            }}
          />
          <TextFieldInput
            id="amount"
            name="amount"
            label="amount"
            type="number"
            onChange={(e) => {
              setNewRecipientAmount(parseInt(e.target.value))
            }}
            value={newRecipientAmount}
          />
          <Button
            onClick={() => appendRecipient({ amount: newRecipientAmount, address: newRecipientAddress })}
            style={{ display: 'block', margin: '0 1em' }}
            size="md"
          >
            + add
          </Button>
        </div>
        <Button disabled={recipients.length === 0 || lockTime === 0 ? true : false} onClick={handleTransfer} size="lg">
          {' '}
          Build Transaction{' '}
        </Button>
      </FormBox>
    </Container>
  )
}

function Row({ children }: { children: JSX.Element | Array<JSX.Element> }) {
  return <div style={{ padding: '0.5em 0' }}>{children}</div>
}

function RecipientRow({ address, amount }: Recipient): JSX.Element {
  return (
    <div key={`recipient-${address}`} style={{ display: 'flex', alignItems: 'center', padding: '1em 0' }}>
      <AddressInput
        id={`recipient-${address}`}
        name="stream recipient"
        label="stream recipient"
        address={address}
        onChangeAddress={function () {
          /*noop*/
        }}
        disabled
      />
      <TextFieldInput
        id={`amount-${address}`}
        name="lockTime"
        label="lock time (days)"
        type="number"
        disabled
        onChange={function () {
          /*noop*/
        }}
        value={amount}
      />
    </div>
  )
}

export default SafeApp
