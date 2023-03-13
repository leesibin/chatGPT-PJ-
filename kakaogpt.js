require(`dotenv`).config()
const request = require('request')
const REST_API_KEY = process.env.kogpt
// env키 값 = REST API 키
function kogptApi(prompt, max_tokens=32,temperature,top_p,n){
    const url = "https://api.kakaobrain.com/v1/inference/kogpt/generation"
    const headers ={
        "Content-Type": "application/json",
        "Authorization": "KakaoAK" + REST_API_KEY
    }
    const options = {
        url,
        method:'POST',
        body:{
            prompt,
            max_tokens,
            temperature, 
            top_p: top_p,
            n
        },
        headers,
        json:true
    }
    request.post(options,(e,res,body)=>{
        const rst =body
        console.log(rst)
    })
}
const prompt = '둥글게둥글게'
kogptApi(prompt,32,0.5,0.7,1)