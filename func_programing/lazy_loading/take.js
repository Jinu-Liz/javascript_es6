const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs);

const curry = f => (a, ...arg) => arg.length ? f(a, ...arg) : (...arg) => f(a, ...arg);

const log = a => console.log(a);

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }

  return res;
};

const L = {};
L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
}

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

const take = curry((limit, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == limit) return res;
  }

  return res;
});

/**
 * range의 경우, 우선 인자의 크기만큼 Array를 만든 후,
 * 거기서 limit만큼을 잘라내어 가져오지만,
 * L.range의 경우에 limit만큼이 되면 끝나게 되므로 훨씬 효율적이다.
 *
 * 즉, 인자 크기만큼 Array를 만드는 것을 미루다가,
 * 다음 연산에 의해 실행되면서 필요한 만큼만 사용하고 종료할 수 있다.
 *
 * 기존에는 순환하는 방법이 제각각이었으나,
 * JS에서 공식적으로 이터레이터/제너레이터가 생기면서
 * 이것을 기준으로 순환하는 것이 기준이 되었다.
 */
console.time('');
go(
    range(1000000),
    take(5),
    reduce(add),
    log
)
console.timeEnd('');

console.time('');
go(
    L.range(1000000),
    take(5),
    reduce(add),
    log
)
console.timeEnd('');