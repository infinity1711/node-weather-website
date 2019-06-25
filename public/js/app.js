
const searchForm = document.querySelector('form')
const search = document.querySelector('input')


searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('#msg1').textContent = ''
    document.querySelector('#msg2').textContent = ''

    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then(res => {
        res.json().then(data => {
            console.log(data)
            if (data.error) {
                document.querySelector('#msg1').textContent = data.error
            }
            else {
                document.querySelector('#msg1').textContent =  data.forecast
                document.querySelector('#msg2').textContent =  data.address +', '+ data.location
            }
        })
    }).catch(err => {
        console.log(err)
    })
})



