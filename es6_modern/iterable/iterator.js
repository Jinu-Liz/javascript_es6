/*
* Array를 통해 알아보기
* */
const arr = [1, 2, 3]
console.log (arr[Symbol.iterator]);
// arr[Symbol.iterator] = null;

/**
 * Array에서 Symbol.iterator를 null로 비워버리면 동작하지 않는다.
 * 따라서, foreach문과 연관이 있을 수 있다고 생각할 수 있다.
 */
for (const a of arr) console.log(a);

// iterator에서 next를 하면 다음 값을 얻게 되고, 이는 유지되는 것을 알 수 있다.
const iterator = arr[Symbol.iterator]();
console.log(iterator.next());
for (const a of iterator) console.log(a);   // 앞에서 next를 했기 때문에 2부터 시작함.
/*
* Set을 통해 알아보기
* */
const set = new Set([1, 2, 3]);
console.log (set[Symbol.iterator]);
for (const a of set) console.log(a);


/*
* Map을 통해 알아보기
* */
const map = new Map([['a', 1], ['b', 2], ['c', 3],]);
console.log (map[Symbol.iterator]);
for (const a of map) console.log(a);
for (const a of map.keys()) console.log(a);
for (const a of map.values()) console.log(a);
for (const a of map.entries()) console.log(a);

/**
 * ## 이터러블 / 이터레이터 프로토콜
 * - 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
 * - 이터레이터 : { value, done } 객체를 리턴하는 next() 를 가진 값
 * - 이터러블 / 이터레이터 프로토콜 : 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
 */


const a = [1, 2];
console.log(([...a, ...[3, 4]])); // array 2개를 하나로 합침
console.log([...a, ...arr, ...set, ...map]);

/**
 * iterator를 null로 만들면 에러 발생.
 * 전개연산자도 iterator를 사용.
 */
a[Symbol.iterator] = null;
console.log(([...a, ...[3, 4]]));