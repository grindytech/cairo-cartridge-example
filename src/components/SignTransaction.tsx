import { useAccount, useExplorer } from '@starknet-react/core'
import { useCallback, useState } from 'react'
import { CallData, cairo } from 'starknet';

const STRK_TOKEN_ADDRESS =
  '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

  const VRF_PROVIDER = '0x51fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f';
  const STAGE_VRF_ADDRESS = '0x269982169dd4c24938b0054b25b30e2bf110b37ad7d35a15ce8d905a427d749';

export const SignTransaction = () => {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const { account } = useAccount()
  const explorer = useExplorer()
  const [txnHash, setTxnHash] = useState<string>()

  const execute = useCallback(
    async () => {
      if (!account) return
      setSubmitted(true)
      setTxnHash(undefined)

      const amount = '0x4563918244F40000'; // 5 STRK

      try {
        const result = await account.execute([
          {
            contractAddress: STRK_TOKEN_ADDRESS,
            entrypoint: 'approve',
            calldata: [STAGE_VRF_ADDRESS, amount, '0x0'],
          },
          {
            contractAddress: VRF_PROVIDER,
            entrypoint: 'request_random',
            calldata: CallData.compile({
              caller: STAGE_VRF_ADDRESS,
              source: { type: 0, address: account.address },
            }),
          },
          {
            contractAddress: STAGE_VRF_ADDRESS,
            entrypoint: 'buy',
            calldata: CallData.compile({
              mintAmount: cairo.uint256(1),
              merkleProof: [], // No whitelist in this example
            }),
          },
        ])

        setTxnHash(result.transaction_hash)
      } catch (e) {
        console.error(e)
      } finally {
        setSubmitted(false)
      }



    },
    [account],
  )

  if (!account) return null

  return (
    <div>
      <h2>Mint NFTs</h2>
      <button onClick={() => execute()} disabled={submitted}>
        Mint NFTs
      </button>
      {txnHash && (
        <p>
          Transaction hash:{' '}
          <a
            href={explorer.transaction(txnHash)}
            target="blank"
            rel="noreferrer"
          >
            {txnHash}
          </a>
        </p>
      )}
    </div>
  )
}