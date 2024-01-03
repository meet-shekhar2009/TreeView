import { useEffect, useState } from 'react';
import api, { transform } from '../utils';
import useApi from '../../CustomHooks/useApi';

const blancedb = 'common';
const apiBalance = api(blancedb);

interface Props {
  balance: number;
  setBalance: (value: number) => void;
}

interface Table {
  id: string;
  balance: number;
}

function Balance({ balance, setBalance }: Props) {
  const [balanceResponse, setBalanceResponse] = useState<Table>();
  async function handleAddBalance() {
    await apiBalance.create('POST', '/add', { name: 'balance', balance });
  }

  async function handleUpdateBalance() {
    if (balanceResponse) {
      await apiBalance.patch('PATCH', `/patch/${balanceResponse.id}`, {
        balance,
      });
    }
  }

  async function findOne() {
    const result: Table | null = await apiBalance.create('POST', '/findone', {
      name: 'balance',
    });
    if (result) {
      setBalanceResponse(result);
      setBalance(result.balance);
    }
  }

  useEffect(() => {
    findOne();
  }, []);

  return (
    <>
      <h3>Save user Data</h3>
      <h5>
        Balance :
        <input
          type="number"
          className="padding-8 margin-5 btn green-btn"
          value={balance}
          onChange={(e) => setBalance(parseFloat(e.target.value))}
        />
        {!balanceResponse && (
          <button
            className="padding-8 margin-5 btn yellow-btn"
            onClick={handleAddBalance}
          >
            Add
          </button>
        )}
        {balanceResponse && (
          <button
            className="padding-8 margin-5 btn yellow-btn"
            onClick={handleUpdateBalance}
          >
            Update
          </button>
        )}
      </h5>
    </>
  );
}

export default Balance;
