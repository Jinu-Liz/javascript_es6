const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000},
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000},
  { name: '바지', price: 25000 }
];

/**
 * curry
 * 1. 이 함수에서 사용할 인자를 대신 받아본다.
 * 2. 이 함수에 인자가 2개 이상일 때, 받아둔 함수를 즉시 실행하고 아니라면 함수를 리턴한다.
 * 3. 그 이후에 들어올 값들을 받은 후, 함수를 실행하는 함수.
 */
const curry = f => (a, ...arg) => arg.length ? f(a, ...arg) : (...arg) => f(a, ...arg);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }

  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
});

const reduce = curry((f, acc, iter) => {

  // 인자 2개만 받아도 동작하도록 구성
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

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

/**
 * go를 이용하여 위 코드의 가독성 향상
 * 위의 코드는 안쪽에서부터 바깥쪽으로 나아가면서 코드를 읽어야 하지만,
 * 개선된 코드는 위에서 아래로 읽으면 된다.
 */
go(
    products,
    products => filter(p => p.price < 20000, products),
    products => map(p => p.price, products),
    prices => reduce(add, prices),
    a => console.log(a)
)

const mult = curry((a, b) => a * b);
console.log(mult(3)(2));

// 함수를 미리 만들어두고 사용
const mult2 = mult(3);
console.log(mult2(10));
console.log(mult2(5));
console.log(mult2(3));


/**
 * 함수들에 curry를 적용하게 되면 인자를 분리시킬 수 있음.
 */
go(
    products,
    products => filter(p => p.price < 20000)(products),
    products => map(p => p.price)(products),
    prices => reduce(add)(prices),
    a => console.log(a)
)

/**
 * 함수를 부분적으로 사용하는 curry함수를 이용하여 코드를 줄일 수 있음.
 */
go(
    products,
    filter(p => p.price < 20000),
    map(p => p.price),
    reduce(add),
    a => console.log(a)
)


/**
 * 함수를 조합하여 중복 제거
 */
const totalPrice = pipe(
    map(p => p.price),
    reduce(add)
);

go(
    products,
    filter(p => p.price < 20000),
    totalPrice,
    a => console.log(a)
);

go(
    products,
    filter(p => p.price >= 20000),
    totalPrice,
    a => console.log(a)
);


/**
 * filter 조건을 받아 totalPrice까지 실행하는 함수
 * 이렇듯 함수를 조합하여 함수를 만들어 쓸 수 있다.
 */
const baseTotalPrice = condition => pipe(
    filter(condition),
    totalPrice
);

go(
    products,
    baseTotalPrice(p => p.price < 20000),
    a => console.log(a)
);

go(
    products,
    baseTotalPrice(p => p.price >= 20000),
    a => console.log(a)
);