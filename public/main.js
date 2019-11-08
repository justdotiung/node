
document.querySelector('.ajaxsend').addEventListener('click', () => { 
    const inputdata = document.querySelector(".email"); 
    const vlaue = inputdata.value;
    
    //sendAjax('http://localhost:3000/ajax_send_email',vlaue); 
    // sendAjaxx('http://localhost:3000/ajax_send_email',vlaue);
    sendAjaxxx('http://localhost:3000/ajax_send_email',vlaue);
});


function sendAjax(url, data){
    let datas = {'email' : data}; //보내는 데이터 
    datas = JSON.stringify(datas); //문자열로 보내야 에러안남 
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', url); //보내는 방식 설정 
    xhr.setRequestHeader('Content-Type', "application/json"); //서버로 보낼때 어떤 타입인지 명시 
    xhr.send(datas); //ajax보내고 받아오는 부분. 
       
    xhr.addEventListener('load', function(){
        console.log(xhr.responseText);
    }) 
}
function sendAjaxx(url,data){
    const datas = {'email' :data};
    const init = {
        method : 'POST',
        body: JSON.stringify(datas),
        headers: {
            'Content-Type': "application/json"
        }
    }
    fetch(url,init)
    .then(res=> res.json())
    .then(json =>console.log(json.body.email))
    .catch(err => console.log(err))
}

async function sendAjaxxx(url,data){
    const datas = {'email' :data};
    const init = {
        method : 'POST',
        body: JSON.stringify(datas),
        headers: {
            'Content-Type': "application/json"
        }
    }

    const reqURL= await fetch(url,init);
    const result= await reqURL.json();
   
    if(result.result !=="ok")
        return;
    document.querySelector(".divc").innerHTML = result.email+'이게된다니';
    console.log(result);
}
