const express = require("express"); //1.express 모듈 불러오기
const app = express();  //2.express를 초기화 후 app할당
const port =3000;

app.get("/",(req,res)=> {   //3. /으로 요청이 오는 경우 실행
    res.setHeader("Content-Type","text/html; charset=utf-8");  //4.헤더값 설정
    res.end("헬로 Express");
});

app.listen(port,()=>{
    console.log(`START SERVER : use ${port}`);
})