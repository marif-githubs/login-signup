
function login() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("lo").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("si").style.display = "block";
}
function signup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("si").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("lo").style.display = "block";
}



const sform = document.querySelector('#signupForm');
sform.addEventListener("submit", event => {
    event.preventDefault();

    const formdata = new FormData(sform);
    // console.log(formdata);
    const data = Object.fromEntries(formdata);
    if (data.password == data.conformpassword) {
        console.log(data);
    fetch(`/signup-post`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            const data = res.json();
            console.log(data);

            //if (mes.message == 'email already exist') {
            document.getElementById('message').innerHTML = data.message;
            document.getElementById('message').style.color = 'red';
            sform.reset();

        }) // Corrected: added parentheses to call the method
        // .then(data => console.log(data))
        .catch(error => {
            console.log(error);
        });
        document.getElementById('message').innerHTML = 'Signup Successful';
        document.getElementById('message').style.color = 'green';
        sform.reset();
    } else {
        document.getElementById('message').innerHTML = 'Password/ConformPassword Not Same';
        document.getElementById('message').style.color = 'red';
        sform.reset();
    }

});

function sendData(data) {
    
}

const lform = document.getElementById('loginForm');
lform.addEventListener('submit', event => {
    event.preventDefault();
    const formdata = new FormData(lform);
    const data = Object.fromEntries(formdata);
    console.log(data);
    fetch('/login', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {

            const mes = res.json();
            document.getElementById('loginmessage').innerHTML = mes.message;
            document.getElementById('loginmessage').style.color = 'red';
        }).catch(error => {
            console.log(error);
        });
});
// const form = document.getElementById("signupForm");
// form.addEventListener("submit",async (e) => {
//     e.preventDefault();
//     console.log("e",e.target);
//     const formData=new FormData(form);
//     console.log(formData);
//     const payload = new URLSearchParams(formData);
//     console.log('payload',payload);
//     console.log("SAAD ");
//     const req=await fetch('/signup-post',{
//     method:"POST",
//     headers:{
//         "Content-Type":"application/json"
//     },
//     body: JSON.stringify([...payload]),
//      })
//    const data=await req.json();
//    console.log(data)
// })