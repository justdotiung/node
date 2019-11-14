
document.querySelector('.ajaxsend').addEventListener('click', () => { 
    const email = document.querySelector(".email").value; 
    const password = document.querySelector(".pw").value; 
    
    const user = {
        'email' : email,
        'pw' : password
    }

    //sendAjax('http://localhost:3000/email/ajax',vlaue); 
    //sendAjaxx('http://localhost:3000/ajax_send_email',vlaue);
    sendAjaxxx('http://localhost:3000/login',user);
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
        // if(result.result !=="ok")
        // return;
        const result = JSON.parse(xhr.responseText);
        document.querySelector(".divc").innerHTML = result.name+'이게된다니';
        console.log(result.name);
    }) 
}
function sendAjaxx(url,data){
    const init = {
        method : 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }
    fetch(url,init)
    .then(res => res.json())
    .then(json =>console.log(json))
    .catch(err => console.log(err))
}

async function sendAjaxxx(url,data){
    const init = {
        method : 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }

    const reqURL= await fetch(url,init);
    const result= await reqURL.json();

    if(result.email)
       window.location.href="/main";
    else
        document.querySelector(".divc").innerHTML =result
    // console.log(result);
}
