const btn = document.querySelector('#btn');
const body = document.querySelector('body');
const workoutContainer = document.querySelector('#workout-container');
const datesContainer = document.querySelector('#dates-container');
const durationContainer = document.querySelector('#duration-container');
getOne()

function getOne(){
    btn.addEventListener('click', fetchData)
}



async function fetchData(){
    const data = await fetch(`http://localhost:3000/get`);
    const json = await data.json()
    const cardio = json;
    for (let i = 0; i < cardio.length; i++) {
        const workouts = cardio[i].workout;
        const dates = cardio[i].date;
        const time = cardio[i].duration;
        workoutsDivs(workouts);
        datesDivs(dates)
        durationDivs(time)
    }
}

function workoutsDivs(element){
    const workouts = document.createElement('div');
    workouts.id = 'workouts';
    workouts.append(element);
    workoutContainer.append(workouts)
}


function datesDivs(element){
    const container = document.createElement('div');
    container.id = 'dates';
    container.append(element);
    datesContainer.append(container);
}
function durationDivs(element){
    const container = document.createElement('div');
    container.id = 'duration';
    container.append(element);
    durationContainer.append(container);
}