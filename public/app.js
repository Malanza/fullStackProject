const btn = document.querySelector('#btn');
const body = document.querySelector('body');
const btn_container = document.querySelector('#btn-container');
const submit = document.querySelector('#submit');
const dlt = document.createElement('button');
const save = document.querySelector('#save');
const minutes = document.querySelector('#minutes-container');
const inputWorkout = document.getElementById('inputWorkout');
const inputDate = document.getElementById('inputDate');
const inputDuration = document.getElementById('inputDuration');
const insertionPoint = document.getElementById("insertionPoint");

const workoutContainer = document.querySelector('#workout-container');
const datesContainer = document.querySelector('#dates-container');
const durationContainer = document.querySelector('#duration-container');
getAll()
postData()
deleteData()

//patchData()
function getAll(){
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
        // const dlt = document.createElement('button');
        // dlt.textContent = 'x'
        // dlt.id = workoutId;
        // dlt.className = 'delete';
      
        
     
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
        const id_1 = workouts.id = id;
        const changes = workouts.contentEditable = true;
        workouts.append(element);
        workoutContainer.append(workouts)
        patchData(id_1,workouts)
       
    }
    
    
    function datesDivs(element,id){
        const date = document.createElement('div');
        const id_2 = date.id = id;
        const changes = date.contentEditable = true;
        date.className = "date-container";
        date.append(element);
        datesContainer.append(date);
        patchData2(id_2,date)
    }
    function durationDivs(element,id){
        const container = document.createElement('div');
        const BtnContainer = document.createElement('div');
       
        const dlt_id = container.id = id;
        const changes = container.contentEditable = true;
        container.className = 'duration';
        container.append(`${element} `);
        const dlt = document.createElement('button');
        dlt.innerText = 'x';
        dlt.id = dlt_id;
        dlt.className ='delete';
        BtnContainer.append(dlt);
        //container.append(BtnContainer);
        btn_container.append(BtnContainer);
        durationContainer.append(container);
        const minutesDiv = document.createElement('div');
        minutesDiv.id = dlt_id;
        minutesDiv.innerText = 'minutes'
        minutes.append(minutesDiv);
        deleteData(dlt_id,dlt) 
        //patchData2(dlt_id)
        patchData3(dlt_id,container)
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


async function patchData(id,workouts){
   save.addEventListener('click', async (e) =>{
    // const duration = document.querySelector('#duration');
    // const date = document.querySelector('.date-container');    
    const inpuData = {
            //date: date.innerText,
          workout: workouts.innerText
           //duration: container.innerText
          };
        
        const response = await fetch(`http://localhost:3000/patch/${id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json;charset=utf-8'
            
        },
        body: JSON.stringify(inpuData)
    })
    
    // const json = await data.json();
    console.log(inpuData);
})
};

async function patchData2(id,date){
    const duration = document.querySelector('#duration');
    //const date = document.querySelector('.date-container');
    save.addEventListener('click', async (e) =>{
         const inpuData = {
            date: date.innerText
           //workout: workouts.innerText
            //duration: duration.innerText
           };
         
         const response = await fetch(`http://localhost:3000/patch/${id}`, {
         method: 'PATCH',
         headers:{
           'Content-Type': 'application/json;charset=utf-8'
             
         },
         body: JSON.stringify(inpuData)
     })
     
     // const json = await data.json();
     console.log(inpuData);
 })
 };

 async function patchData3(id,container){
    save.addEventListener('click', async (e) =>{
        const duration = document.querySelector('.duration'); 
        const inpuData = {
            //date: date.innerText
           //workout: workouts.innerText
            duration: container.innerText
           };
         
         const response =  await fetch(`http://localhost:3000/patch/${id}`, {
         method: 'PATCH',
         headers:{
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(inpuData)
     })
     
     // const json = await data.json();
     console.log(inpuData);
 })
 };


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
