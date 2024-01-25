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