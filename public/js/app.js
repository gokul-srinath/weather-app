
console.log("This is client side javascript")




const form=document.querySelector('form');
const search = document.querySelector('input')

const msgone=document.querySelector('#msg-1')
const msgtwo=document.querySelector('#msg-2')


form.addEventListener('submit',(event)=>{
    
    
    msgone.textContent='Loading...'
    msgtwo.textContent=''
    event.preventDefault()

    const address=search.value
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
           { 
            msgone.textContent=(data.error)
        }
        else{
            msgone.textContent=data.location
            msgtwo.textContent=(data.forecast)+'°C'
        }
    })
})
})