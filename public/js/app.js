
const searchForm = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
   
    msg1.textContent = 'Loading...'
    msg2.textContent = '';

    const location = search.value
    fetch('/weather?address=' + location).then(res => {
        res.json().then(data => {
            console.log(data)
            if (data.error) {
                msg1.textContent = data.error
            }
            else {
               msg1.textContent =  data.forecast
               msg2.textContent =  data.location
            }
        })
    }).catch(err => {
        console.log(err)
    })
})



