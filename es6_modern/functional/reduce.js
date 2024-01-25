const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000},
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000},
  { name: '바지', price: 25000 }
];

const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total += n;
}

console.log(total);

const reduce = (f, acc, iter) => {

  // 인자 2개만 받아도 동작하도록 구성
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
};

const add = (a, b) => a + b;
console.log(reduce(add, 0, nums));

console.log(reduce(add, nums));

console.log(add(add(add(add(add(0, 1), 2), 3), 4), 5));   // 위의 로직이 재귀하면서 이런 식으로 됨

/**
 * 보조함수를 통하여 어떻게 축약할지를 위임하기 때문에,
 * 복잡한 구조의 데이터를 축약해나감에 어려움이 없다.
 */
console.log(reduce(
    (total_price, products) => total_price + products.price,
    0,
    products
));