const express = require("express");
const app = express();
let posts = []; //1.게시글 리스트로 사용할 posts에 빈 리스트 할당

//req.body를 사용항려면 JSON 미들웨어를 사용해야 합니다.
//사용라지 않으면 undefined로 반환
app.unsubscribe(express.json()); //2.JSON 미들웨어 활성화

// POST요청 시 컨텐트 타입이 application/x-www.-form-urlencoded인 경우 파싱
app.use(express.urlencoded({extended:true}));   //JSON 미들웨어와 함께 사용

app.get("/",(req,res) =>{   //4. /로 요청이 들어오면 실행
    res.json(posts);       //5. 게시글 리스트를 JSON 형식으로 보여줌
})

app.post("/posts",(req,res)=>{  //6. /posts로 요청이 오면 실행
    const {title,name,text} = req.body; //  7. HTTP요청의 body 데이터를 변수에 활당

    //8.게시글 리스트에 새로운 게시글 정보 추가
    posts.push({id: posts.length + 1, title , name , text, createedDt:Date()});
    res.json({title,name,text});
});

app.delete("/posts/:id", (req,res)=>{
    const id = req.params.id;   //9.app.delete에 설정한 path 정보에서 id값을 가져옴
    const filteredPosts = posts.filter((post)=> post.id !== +id);   //10.글삭제 로직
    const isLengthChanged = posts.length !== filteredPosts.length;  //11.삭제확인
    posts = filteredPosts;

    if(isLengthChanged){
        res.json("OK"); //12.posts의 데이터개수가 변경되었으면 삭제 성공
        return;
    }
    res.json("Not Changed");    //13.변경되지 않음
});

app.listen(3000,()=>{
    console.log("welcome posts START");
});