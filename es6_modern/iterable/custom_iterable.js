const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false }
      }
    }
  }
};

let iterator = iterable[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// iterable에 iterator를 구현하였기 때문에 for-of문 사용 가능
for (const a of iterable) console.log(a);

const arr = [1, 2, 3]
let arrIter = arr[Symbol.iterator]();

/**
 *
 * Array의 경우, iterator가 자기 자신을 반환하기 때문에 변수에 담아 비교하면 true.
 * 자기 자신을 반환하는 iterator를 well-formed iterator라고 한다.
 */
console.log(arrIter[Symbol.iterator]() == arrIter);

for (const a of arr) console.log(a);

// 에러가 난다. 자기 자신을 반환하지 않기 때문.
// let iter = iterable[Symbol.iterator]();
// for (const a of iter) console.log(a);




const iterable2 = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false }
      },
      // 자기 자신을 반환해서 어느 상태이던지 연속하여 실행 가능하게 만든 것이 well-formed iterator의 특징.
      [Symbol.iterator]() { return this; }
    }
  }
};
let iter2 = iterable2[Symbol.iterator]();
for (const a of iter2) console.log(a);