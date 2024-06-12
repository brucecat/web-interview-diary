
async function getUser(){
  return await fetch('https://my-json-server.typicode.com/typicode/demo/profile').then(res => res.json());
}

async function m1(){
   // other work
  return await getUser();
}

async function m2(){
  // other work
  return await m1();
}

async function main(){
   // other work
  return await m2();
}



// 要求：消除各个函数的async