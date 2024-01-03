import { useState } from 'react';
import { Node } from '../Packages/Tree/types';

interface Props {
  datasource: Node[];
  balance: number;
}

function Detail({ datasource, balance }: Props) {
  function getTotalAmount() {
    return (datasource as any[])
      ?.map((k) => parseFloat(k.amount))
      ?.reduce((a, b) => a + b, 0);
  }

  function ShareOnWhatsapp() {
    const total = getTotalAmount();
    const itemDesc = (datasource as any[])
      .map((k) => `*${k.name}:* ${k.amount}`)
      .join('%0a');
    const finalmessage = `%0a%0a${itemDesc}%0a---------------------
        %0a*Total :* ${total} %0a%0a *Balance :* ${balance} - ${total} = *${
      balance - total
    }*`;
    const url = `https://wa.me?text=${finalmessage}`;
    window.open(url, '_blank')?.focus();
    console.log(url);
  }

  return (
    <>
      <h3>
        Expenses{' '}
        <a onClick={ShareOnWhatsapp}>
          <i className="fa fa-whatsapp"></i>
        </a>
      </h3>

      <div className="detail-width">
        <div className="display-flex bold-text">
          <div className="col-1">Description</div>
          <div className="col-2">Amount</div>
        </div>
        <div>
          {(datasource as any[]).map((k, i) => {
            return (
              <div key={`khs-${i}`} className="display-flex">
                <div className="col-1">
                  {i + 1}. {k.name}
                </div>
                <div className="col-2">{k.amount}</div>
              </div>
            );
          })}
          <div className="display-flex bold-text">
            <div className="col-1">Total</div>
            <div className="col-2">{getTotalAmount()}</div>
          </div>
          <div className="balance">
            Balance {balance} - {getTotalAmount()} ={' '}
            {balance - getTotalAmount()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
