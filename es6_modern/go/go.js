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


// 코드를 값으로 다루어 표현력 높이기
const go = (...args) => reduce((a, f) => f(a), args);

go (
    0,
    a => a + 1,
    a => a + 10,
    a => a + 100,
    a => console.log(a)
);