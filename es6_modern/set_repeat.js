// [1] : 전통적인 for 반복문
let ar= ['a','b','c','d','e'];
for (let i = 0; i < ar.length; i++) {
  console.log(ar[i]);
}

console.log('------------------------');

// [2] : forEach() 메서드를 사용한 반복
ar.forEach(value => console.log(value));


// [3] : Set의 다양한 메서드 --> keys(), values()
let testSet3 = new Set(['tiger','lion','dog','cat']);
testSet3.add('hippo');

console.log(testSet3[0]);   // tiger --> undefined

for (let i of testSet3) {   // set의 경우는 in이 아니라 of를 사용
  console.log(i);
}

let arr = [...testSet3];
console.log(arr);

// keys() 메서드 --> iterator 객체 반환 --> next() 메서드

const key_itr = testSet3.keys();

console.log(key_itr.next().value);

// entries() 메서드 --> 쌍으로
let testSet5 = new Set();

testSet5.add('홍길동');
testSet5.add('이순신');
testSet5.add('강감찬');

let entries = testSet5.entries();
for (let i of entries) {
  
}