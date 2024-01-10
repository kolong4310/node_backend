const DB = [];

function saveDB(user){
    const oldDBSize = DB.length + 1;    // +1 추가시 에러 발생
    DB.push(user);
    console.log(`save ${user.name} to DB`);

    return new Promise((resolve,reject)=>{  //콜백대신 promise 객체반환
        if(DB.length > oldDBSize){
            resolve(user);  //성공시 유저정보 반환
        }else{
            reject(new Error("Save DB Error!"));    //1.실패시 에러 발생
        }
    });
}

function sendEmail(user){
    console.log(`email to ${user.email}`);
    return new Promise((resolve)=>{
        resolve(user);
    });
}

function getResult(user){
    return new Promise((resolve,reject)=> {
        resolve(`success register ${user.name}`);
    });
}

function registerByPromise(user){
    //2.비동기 호출이지만, 순서를 지켜서 실행
    const result = saveDB(user).then(sendEmail).then(getResult)
                    .catch(error => new Error(error))
                    .finally(()=> console.log("완료!!"));
    console.log(result);
    return result;
}

const MyUser = {email: "andy@test.com" , password:"1234" , name:"andy"};

//이전 코드의 결과를 출력하지 않도로 주석처리
// const result = registerByPromise(MyUser);
//결과값이 Promise이므로 then() 메서드에 함수를 넣어서 결괏값을 볼 수 있음
// result.then(console.log);

//기존 코드 하단
const myUser ={email:"andy@test.com",password:"1234",name:"andy"};
allResult = Promise.all([saveDB(myUser),sendEmail(myUser),getResult(myUser)]);
allResult.then(console.log);