// 홀수를 만들어내는 generator
function* odds(number) {
  for (let i = 0; i < number; i++) {
    if ( i % 2) yield  i;
  }
}

let iter = odds(10);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

// 무한히 수를 만들어 내지만, next()를 평가할 때 까지만 동작하기 때문에 브라우저가 멈추거나 하는 일은 없음.
function *infinity(i = 0) {
  while (true) yield i++;
}

let infiIter = infinity();
console.log(infiIter.next());
console.log(infiIter.next());
console.log(infiIter.next());
console.log(infiIter.next());
console.log(infiIter.next());

function *infinityOdds(number){
  for (const a of infinity(1)) {
    if (a % 2) yield a;
    if (a == number) return;
  }
}

let infiOddIter = infinityOdds(10);
console.log(infiOddIter.next());
console.log(infiOddIter.next());
console.log(infiOddIter.next());
console.log(infiOddIter.next());
console.log(infiOddIter.next());
console.log(infiOddIter.next());
console.log(infiOddIter.next());
console.log(infiOddIter.next());

function* limit(number, iter) {
  for (const a of iter) {
    yield a;
    if (a == number) return;
  }
}

// 4까지만 돌고 멈춤.
let limitIter = limit(4, [1, 2, 3, 4, 5, 6]);
console.log(limitIter.next());
console.log(limitIter.next());
console.log(limitIter.next());
console.log(limitIter.next());
console.log(limitIter.next());


// 위의 기능 3개를 합침
function *infinityLimitOdds(number){
  for (const a of limit(number, infinity(1))) {
    if (a % 2) yield a;
  }
}

let infiLimitOddIter = infinityLimitOdds(20);
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());
console.log(infiLimitOddIter.next());


/**
 * for-of로 순회 가능
 * 이와 같이 infinityLimitOdds라는 문장(함수)를 생성하여
 * 순회하면서 처리가 가능함.
  */
for (const a of infinityLimitOdds(20)) console.log(a);