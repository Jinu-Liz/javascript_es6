const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000},
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000},
  { name: '바지', price: 25000 }
]

let names = [];
for (const p of products) {
  names.push(p.name);
}
console.log(names);

let prices = []
for (const p of products) {
  prices.push(p.price);
}
console.log(prices);

/**
 * 추상화를 통해 필드명을 직접 쓰는 것이 아니라,
 * 함수를 받아 해당 함수의 인자로 넘겨서 값을 받도록 한다.
 * 함수를 인자로 받아 해당 함수를 통해 값을 받는 고차 함수.
 */
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }

  return res;
}

console.log(map(p => p.name, products));
console.log(map(p => p.price, products));