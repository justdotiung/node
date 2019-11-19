document.querySelector('.show-wrap').addEventListener("click",(e) =>{
    let url, method, data, fn ;
    const target = e.target;
    const li = target.closest('LI');
    const showResult = li.querySelector(".show-result");
    const type = li.className;
    
    console.log(type);
    if(target.tagName != 'BUTTON') return;

    switch(type){
        
        case "get-all":
            url = "/movies";
            method = "GET";
            fn = (result) =>{
                if(result.result ===1 ) {
                    
                    let titles = result.data.reduce((pre,next) => {
                        pre += "<li>"+next.title+"</li>"
                        return pre;
                    },"");
                     showResult.innerHTML = "<ul>" + titles + "</ul>";
                }else{
                    showResult.innerHTML ="list not found";
                }
            }
            break;

            case "post":
                url = "/movies";
                method = "POST";
                const inputs = [].slice.call(document.querySelector("form").elements);
                console.log(inputs[0]);
                data = inputs.reduce((pre, next) =>{
                    pre[next.name] = next.value;
                   // console.log(pre);
                    return pre;
                },{});
                fn = (result) =>{
                    if(result.result ===1){
                        showResult.innerHTML = "새로운 영화 데이터 추가";
                    }else{
                        showResult.innerHTML = "영화추가 실패";
                    }
                }
                break;
                
            case "get-id":
                url = "/movies/"+li.getElementsByTagName("input")[0].value;
                method = "Get";
                console.log(url)
                fn = (result) =>{
                    console.log(result.data);
                    if(result.result ===1 ){
                         showResult.innerHTML = result.data;
                    }else{
                      showResult.innerHTML = "영화가 없습니다.";
                    }
            }
            break;

        case "delete-d":
            url = "/movies/"+li.getElementsByTagName("input")[0].value;
            method ="DELETE";
            fn = (result) =>{
                if(result.result ===1 ){
                    showResult.innerHTML = "선택한영화" + result.data+ "가 잘 삭제됐습니다";
                }else{
                    showResult.innerHTML = "해당영화가 없습니다";
                }
            }
            break;

        case "update-id":
            url = "/movies/"+li.getElementsByTagName("input")[0].value;
            method = "PUT";
            data = {
                title : li.getElementsByTagName("input")[0].value,
                type  : li.getElementsByTagName("input")[1].value,
                grade : li.getElementsByTagName("input")[2].value,
                actor : li.getElementsByTagName("input")[3].value
            
            } 
            console.log(li.getElementsByTagName("input")[0].value);
            fn = (result) =>{
                console.log(result.result)
                if(result.result === 1){
                    showResult.innerHTML = " 영화 데이터 변경";
                }else{
                    showResult.innerHTML = "영화변경 실패";
                }
            }
            break;
        case "get-min":
            url = "/movies?min="+9;
            method = "GET";
         
            fn = (result) =>{
                if(result.result === 1 ) {
                    
                    let titles = result.data.reduce((pre,next) => {
                        pre += "<li>"+next.title+"</li>"
                        return pre;
                    },"");
                     showResult.innerHTML = "<ul>" + titles + "</ul>";
                }else{
                    showResult.innerHTML ="list not found";
                }
            }
            break;

        default:
            console.log("default");
            break;
        }
        //sendAjax(url,method,data,fn);
        //sendAjaxx(url,method,data,fn);
        sendAjaxxx(url,method,data,fn);
});
            
const sendAjax = (url,method,data,fn) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method,url);
    
    if(data){
        data = JSON.stringify(data);
        xhr.setRequestHeader('Content-Type', "application/json");
    }else
    data = null;
    xhr.send(data);
    
    xhr.addEventListener('load',() => {
        const result = JSON.parse(xhr.responseText);
        fn(result);
    });
}

function sendAjaxx(url,method,data,fn){
    const init = {
        method : method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }
    fetch(url,init)
    .then(res => res.json())
    .then(result =>fn(result))
    .catch(err => console.log(err))
}

async function sendAjaxxx(url,method,data,fn){
    const init = {
        method : method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }

    const reqURL= await fetch(url,init);
    const result= await reqURL.json();
    
    fn(result);
}    