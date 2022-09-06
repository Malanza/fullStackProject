const btn = document.querySelector('#btn');
const body = document.querySelector('body');

const submit = document.querySelector('#submit');
const dlt = document.createElement('button');
const inputWorkout = document.getElementById('inputWorkout');
const inputDate = document.getElementById('inputDate');
const inputDuration = document.getElementById('inputDuration');
const insertionPoint = document.getElementById("insertionPoint");
const workoutContainer = document.querySelector('#workout-container');
const datesContainer = document.querySelector('#dates-container');
const durationContainer = document.querySelector('#duration-container');
getOne()
postData()
deleteData()

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
        const workoutId = cardio[i].id
        const dlt = document.createElement('button');
        dlt.textContent = 'x'
        dlt.id = workoutId;
        dlt.className = 'delete';
      
        
     
        //document.getElementById("insertionPoint").innerHTML += "<tr><td>" + workouts + "</td><td>" + dates + "</td><td>" + `${time} minutes` + "</td><td>"+ " <button id= delete>&times;</button>" +"</td></tr>";
        workoutsDivs(workouts,workoutId)
        datesDivs(dates,workoutId)
        durationDivs(time,workoutId)
    }
    
}

function postData(){
    submit.addEventListener('click',fetchPostData)
}

async function fetchPostData(){
    const inpuData = {
      date: inputDate.value,
    workout:inputWorkout.value,
     duration: inputDuration.value
    };
    
    let response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(inpuData)
      });
      let result = await response.json();
      alert(result.message);
      workoutsDivs(inpuData.workout)
      datesDivs(inpuData.date)
      durationDivs(inpuData.duration)
      //document.getElementById("insertionPoint").innerHTML += "<tr><td>" + inpuData.workout + "</td><td>" + inpuData.date + "</td><td>" + `${inpuData.duration} minutes` + "</td><div>"+ " <button id= delete>&times;</button>" +"</div></tr>";
    };
    function workoutsDivs(element,id){
        const workouts = document.createElement('div');
        workouts.id = id;
        workouts.append(element);
        workoutContainer.append(workouts)
    }
    
    
    function datesDivs(element,id){
        const container = document.createElement('div');
        container.id = id;
        container.append(element);
        datesContainer.append(container);
    }
    function durationDivs(element,id){
        const container = document.createElement('div');
        const dlt_id = container.id = id;
        container.append(`${element} minutes`);
        const dlt = document.createElement('button');
        dlt.innerText = 'x';
        
        container.append(dlt);
        durationContainer.append(container);
        deleteData(dlt_id,dlt) 
    }
 
async function deleteData(id,dlt){
    dlt.addEventListener('click', async (e) =>{
        $(`[id=${id}]`).hide();


    const response = {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json;charset=utf-8'
        }
    }
    const data = await fetch(`http://localhost:3000/delete/${id}`, response);
    const json = await data.json();

})
}












// const trWorkout = document.createElement('td')
// trWorkout.textContent = workouts;
// const trDates = document.createElement('td')
// trDates.textContent = dates;
// const trDuration = document.createElement('td')
// trDuration.textContent = time;
// const trDelete = document.createElement('td');
// const td = document.createElement('tr');
// td.append(trWorkout)
// td.append(trDates)
// td.append(trDuration)
// //td.append(dlt);
// insertionPoint.append(td);
