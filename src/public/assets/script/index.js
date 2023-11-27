/* eslint-disable prettier/prettier */
document.querySelector('.btn').addEventListener('click', async () => {
    const passLength = document.getElementById('password-length').value
    const enableUpperCase = document.getElementById('enable-uppercase').checked
    const enableLowerCase = document.getElementById('enable-lowercase').checked
    const enableNumber = document.getElementById('enable-number').checked
    const enableSymbol = document.getElementById('enable-symbol').checked
    
    const PasswordSpecification = {
        passLength,
        enableLowerCase,
        enableUpperCase,
        enableNumber,
        enableSymbol
    }

    PostRequest(PasswordSpecification).then((res) => {
        document.getElementById('GP').innerHTML = res.data;
    })
})

const PostRequest = async(formData)=>{
    return await fetch('http://localhost:3000/generatePassword', {
        method: 'Post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(res=> res.json())
}