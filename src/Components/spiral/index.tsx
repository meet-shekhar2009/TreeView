import { useEffect, useState } from 'react';

function Spiral() {
  const row = 5;
  const column = 5;
  let count = 0;
  const arr = new Array(row).fill(null);
  const fArra = arr.map((k) =>
    new Array(column).fill(null).map((k, i) => {
      count++;
      return count;
    })
  );

  useEffect(solve, []);
  function solve() {
    let left = 0;
    let right = column - 1;
    let top = 0;
    let bottom = row - 1;
    let dir = 0;
    while (top <= bottom && left <= right) {
      if (dir == 0) {
        for (let i = left; i <= right; i++) {
          console.log(fArra[top][i]);
        }
        top++;
        dir = 1;
      }
      if (dir == 1) {
        for (let index = top; index <= bottom; index++) {
          const element = fArra[index][right];
          console.log(element);
        }
        right--;
        dir = 2;
      }
      if (dir == 2) {
        for (let index = right; index >= left; index--) {
          const element = fArra[bottom][index];
          console.log(element);
        }
        bottom--;
        dir = 3;
      }

      if (dir == 3) {
        for (let index = bottom; index >= top; index--) {
          const element = fArra[index][left];
          console.log(element);
        }
        left++;
        dir = 0;
      }
    }
  }

  return (
    <>
      {fArra.map((k) => {
        return (
          <div className="s-row">
            {k.map((n) => {
              return <div className="s-col">{n}</div>;
            })}
          </div>
        );
      })}
    </>
  );
}

export default Spiral;
