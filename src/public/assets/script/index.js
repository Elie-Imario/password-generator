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

    if(passLength > 0){
        PostRequest(PasswordSpecification).then((res) => {
            document.getElementById('GP').innerHTML = res.data
        })
    }
})

document.querySelector('.ico').addEventListener("click", () => {
    const passToCopy = document.getElementById("GP").innerText
    if(passToCopy.length > 0){
        navigator.clipboard.writeText(passToCopy)
        .then(() => {
            const clipboardBtn = document.querySelector('.fa-clipboard')
            const clipboardCheck = document.querySelector('.fa-clipboard-check')
            clipboardBtn.classList.add('hide')
            clipboardCheck.classList.remove('hide')
            setTimeout(()=>{
                clipboardBtn.classList.remove('hide')
                clipboardCheck.classList.add('hide')
            },1500)
        })
        .catch((error) => console.log(error));
    
    }
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