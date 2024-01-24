const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000},
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000},
  { name: '바지', price: 25000 }
];

let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}

console.log(...under20000);

let over20000 = [];
for (const p of products) {
  if (p.price >= 20000) over20000.push(p);
}

console.log(...over20000);


/**
 * 추상화를 통해 필드명을 직접 쓰는 것이 아니라,
 * 함수를 받아 해당 함수의 인자로 넘겨서 값을 받도록 한다.
 * 함수를 인자로 받아 해당 함수를 통해 값을 받는 고차 함수.
 */
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
};

console.log(...filter(p => p.price < 20000, products));
console.log(...filter(p => p.price >= 20000, products));
console.log(filter(n => n % 2, [1, 2, 3, 4]));

// 제너레이터 사용
console.log(filter(n => n % 2, function *() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}()));