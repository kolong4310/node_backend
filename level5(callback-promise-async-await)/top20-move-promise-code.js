const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";


axios
    .get(url)    //get요청
    .then((result)=> {
        if(result.status !=200){    //상태가 200이 아니면 에러
            throw new Error("요청에 실패했습니다!");
        }

        if(result.data){    //3.result.data가 있으면 결과를 반환
            return result.data;
        }
        
        throw new Error("데이터 없습니다!");    //data가 없으면 에러
    })
    .then((data)=>{ //4에서는 3에서 받은 데이터 처리
        if(!data.articleList || data.articleList.size ==0){ //크기가 0이면 에러
            throw new Error("데이터가 없습니다.!"); //data가 없으면 erorr
        }

        return data.articleList;    //6.영화 리스트 반환
    })
    .then((articles)=>{
        return articles.map((article,idx)=>{   //7.영화 리스트를 제목과 순위 정보로 분리
            return {title:article.title, rank:idx +1};
        });
    })
    .then((results)=>{
        for(let movieInfo of results){  // 받은 영화 리스트 정보 출력
            console.log(`[${movieInfo.rank}위] ${movieInfo.title}`)
        }
    })
    .catch((err) =>{
        console.log("<<에러발생>>");
        console.log(err);
    })
