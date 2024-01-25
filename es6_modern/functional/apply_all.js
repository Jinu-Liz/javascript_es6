const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000},
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000},
  { name: '바지', price: 25000 }
];

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }

  return res;
}

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
};

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

/**
 * reduce를 사용할 때, add를 하면서 축약해 나갈 것.
 * add를 하기 위해서는 iterator가 적용되는 숫자의 집합 (like Array)가 와야하고
 * 그를 위해 map으로 숫자의 집합을 생성하는데
 * filter를 통하여 조건을 걸어 생성하여 처리.
 */
console.log(
    reduce(
        add,
        map(
            p => p.price,
            filter(p => p.price < 20000, products)
        )
    )
);

// 같은 결과.
console.log(
    reduce(
        add,
        filter(
            p => p < 20000,
            map(p => p.price, products)
        )
    )
);