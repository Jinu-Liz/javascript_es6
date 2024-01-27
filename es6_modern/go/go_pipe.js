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
 * 코드를 값으로 다루어 표현력 높이기
 * 함수를 차례로 돌면서 실행시킨다.
 */
const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs);

go (
    add(0, 1),
    a => a + 1,
    a => a + 10,
    a => a + 100,
    a => console.log(a)
);

const func = pipe(
    (a, b) => a + b,
    a => a + 10,
    a => a + 100
);

console.log(func(0, 1));



console.log(
    reduce(
        add,
        map(
            p => p.price,
            filter(p => p.price < 20000, products)
        )
    )
);

// go를 이용하여 위 코드의 가독성 향상
go(
    products,
    products => filter(p => p.price < 20000, products),
    products => map(p => p.price, products),
    prices => reduce(add, prices),
    a => console.log(a)
)