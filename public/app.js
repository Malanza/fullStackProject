const btn = document.querySelector('#btn');
const body = document.querySelector('body');
getOne()

function getOne(){
    btn.addEventListener('click', fetchData)
}



async function fetchData(){
    const data = await fetch('http://localhost:3000/get');
    const json = await data.json()
    const monday = json[0].workout;
    const workouts = JSON.stringify(monday);
    makeDivs(workouts)
}

function makeDivs(workouts){
    const container = document.createElement('div');
    container.id = 'container';
    container.append(workouts);
    body.append(container);
}