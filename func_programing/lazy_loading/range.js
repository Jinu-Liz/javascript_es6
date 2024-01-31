const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs);

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


// range

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    console.log(i, 'range');
    res.push(i);
  }

  return res;
};

console.log(range(5));
// [0, 1, 2, 3, 4]

console.log(range(2));
// [0, 1]

var list = range(4);
console.log(list);
console.log(reduce(add, list));



// 느긋한 L.range
const L = {};
L.range = function *(l) {
  console.log('hi~!');
  let i = -1;
  while (++i < l) {
    console.log(i, 'L.range');
    yield i;
  }
}

var list = L.range(4);
console.log(list);
console.log(list.next());
console.log(list.next());
console.log(list.next());
console.log(list.next());

/**
 * range의 경우, 함수 실행 즉시 모두 실행되어 모든 log가 찍히지만,
 * L.range의 경우에 next()를 통해 이터레이터를 실행시켜야 동작하므로
 * 실행을 해야 log가 찍힌다.
 *
 * hi~! 의 경우에 맨 처음 실행에만 찍힌다.
 *
 * 만일 const a = [0, 1, 2]라는 배열이 있고, 배열을 통해 무언가 결과물을 도출하려고 한다면
 * 이 a라는 배열은 사용되기 전까지는 굳이 배열의 형태를 띄고 있지 않아도 상관 없다.
 * 따라서, 평가가 완전히 끝나지 않은 상태로 기다리고 있다가
 * 실제로 필요한 곳에서 평가가 이루어져 값을 꺼내도록 된다.
 * ex) reduce(add, L.range(4)) <- reduce에서 평가가 이루어지기 전 대기.
 */