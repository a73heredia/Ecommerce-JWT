(function(){
    const formLogin = document.getElementById('form-reset')
    const inputMail = document.getElementById('email')
    const inputPassword = document.getElementById('password')

    formLogin.addEventListener('submit', async(event) => {
        event.preventDefault()

        const data = {
            email: inputMail.value,
            password: inputPassword.value
        }

        fetch('api/users/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.success){
                window.location.href = 'index.html'
            }
            else{
                alert(data.message)
                window.location.href = 'index.html'
            }

        })
        .catch((error) => {
            console.log('Error', error);
        })
    })
})()