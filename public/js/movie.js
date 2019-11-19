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
            url = "/movie";
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
            url = "/movie";
            method = "POST";
            const inputs = [].slice.call(document.querySelector("form").elements);
            console.log(inputs[0]);
            data = inputs.reduce((pre, next) =>{
                pre[next.name] = next.value;
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
            url = "/movie/"+li.getElementsByTagName("input")[0].value;
            method = "GET";
            fn = (result) =>{
                if(result.result ===1 && result.data.title){
                    showResult.innerHTML = result.data[0].title;
                }else{
                    showResult.innerHTML = "영화가 없습니다.";
                }
            }
            break;

        case "delete-d":
            url = "/movie/"+li.getElementsByTagName("input")[0].value;
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
            url = "/movie/";
            method = "PUT";
           const inputss = [].slice.call(document.querySelector("form").elements);
            data = inputss.reduce((pre, next) =>{
                pre[next.name] = next.value;
                return pre;
            },{});
            fn = (result) =>{
                if(result.result ===1){
                    showResult.innerHTML = " 영화 데이터 변경";
                }else{
                    showResult.innerHTML = "영화변경 실패";
                }
            }
            break;
        default:
            console.log("default");
            break;
        }
        sendAjax(url,method,data,fn);
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
        