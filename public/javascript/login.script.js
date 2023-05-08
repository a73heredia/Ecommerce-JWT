(function(){
    const formLogin = document.getElementById('form-login')
    const inputMail = document.getElementById('email')
    const inputPassword = document.getElementById('password')

    formLogin.addEventListener('submit', async(event) => {
        event.preventDefault();

        const data = {
            email: inputMail.value,
            password: inputPassword.value
        }

        fetch('api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if(data.success){
                localStorage.setItem('token', data.access_token)
               window.location.href = 'private.html'
            }else{
                alert(data.message)
            }
        })
        .catch((error) => {
            console.log('Error', error);
        })
    })
})()