import { DateTime } from 'https://cdn.skypack.dev/luxon'
const age = datepicker('.birthdate',  {id : 1});

const button = document.getElementById('button')
button.addEventListener('click', function(e){
    e.preventDefault()
    let  age_men = document.querySelector('.birthdate').value
    const result = document.getElementById('result')
    if(!age_men){
        result.innerText ='Fill the birthdate!'
        return
    }
    let dateObj = DateTime.fromJSDate(new Date(age_men));
    
    if (!dateObj.isValid) {
        result.innerText = 'Invalid date format!'
        return
    }
    const now = DateTime.now()
    if(dateObj.year > now.year || dateObj.year == now.year && dateObj.month > now.month ||
        dateObj.year == now.year && dateObj.month === now.month && dateObj.day > now.day
    ){
        result.innerText = 'Birthdate cannot be greater than the current date!'
        return
    }
    const { years, months } = DateTime.now().diff(dateObj, ['years', 'months']).toObject();
    result.innerHTML = `You are <b>${Math.floor(years)} years ${Math.floor(months)} months</b> old`;
});