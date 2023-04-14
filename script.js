// initializing all the variables
const HOURS = document.querySelector('.clock #hours');
const MINUTES = document.querySelector('.clock #minutes');
const SECONDS = document.querySelector('.clock #seconds');
const MERIDIEM = document.querySelector('.clock #period');
const SELECT = document.querySelectorAll('select');
const BUTTON = document.querySelector('.button-Add-Alarm');
const ALARMLIST = document.querySelector('.alarm-list');
let DELETE = document.querySelectorAll('.delete');

const inputHours = document.getElementById('hoursInput');
const inputMinutes = document.getElementById('minutesInput');
const inputAMPM = document.getElementById('AMPM');

const alarmSound = new Audio('./Analog-alarm.mp3');
let alarmArray = [];
let alarmObj;
let id = 0;


// append 0 to single digits
const appendZero = ( value) => value < 10 ? "0" + value : value;

// setting options to Hours select input
for(let i = 1; i <= 12; i ++) {
    i = appendZero(i);
    let option = document.createElement('option');
    option.value = i;
    option.text = i;
    SELECT[0].firstElementChild.insertAdjacentElement('afterend', option);
}

// setting options [0 - 59] to minutes input
for(let i = 0; i< 60; i++) {
    i = appendZero(i);
    let option = document.createElement('option');
    option.value = i;
    option.text = i;
    SELECT[1].firstElementChild.insertAdjacentElement('afterend', option);
}

// create alarm Element
const createAlarmElement = (alarmDetails) => {

    let alarmElement = document.createElement('div');
    alarmElement.classList.add('alarm-list-child-div');
    alarmElement.setAttribute('id', `${alarmDetails.id}`);
    alarmElement.innerHTML = `<span>
       ${alarmDetails.alarmAMPM}
    </span>`
    
    let deleteElement = document.createElement('button');
    deleteElement.classList.add('delete-button')
    deleteElement.addEventListener('click', (e) => handleDeleteAlarm(e));
    deleteElement.innerText = "X Delete";
    
    alarmElement.appendChild(deleteElement);
    ALARMLIST.appendChild(alarmElement);
}

// adding delete alarm functionality
const handleDeleteAlarm = (e) => {
  
    //delete from array
    alarmArray = alarmArray.filter((alarm, index) => {
        console.log(typeof String(alarm.id),typeof e.target.parentElement.id);
            return String(alarm.id) !== e.target.parentElement.id
    })

    //delete alarm element
    e.target.parentElement.remove();
    alarmSound.pause();
}

// checking alarm is exists already.
const checkAlarm = (value) => {
    for(i of alarmArray) {
        if(i.alarmAMPM === value) {
            return true;
        }
    }
}

// adding click event to add-alarm button
BUTTON.addEventListener('click', () => {
    const inputHoursValue = inputHours.value;
    const inputMinutesValue = inputMinutes.value;
    //const addAlarm = `${inputHoursValue}:${inputMinutesValue}`;
    const addAlarmAMPM = `${inputHoursValue}:${inputMinutesValue}:${inputAMPM.value}`;
    alarmObj = {};
    
    // validating input
    if(inputHoursValue === "hour" || inputMinutesValue === "minute") {
        alert('Please select hours and minutes')
        return;
    }
    
    // check alarm already exits.
    if(checkAlarm(addAlarmAMPM)) {
        alert(`Alarm already set for ${addAlarmAMPM}`)
        return;
    };
    
    alarmObj.id = Date.now();
    alarmObj.alarmAMPM = addAlarmAMPM;
    alarmArray.push(alarmObj);
    createAlarmElement(alarmObj);
    console.log(alarmArray);
})

// function to display time
const handleDisplayTime = () => {
    const TIME = new Date();
    
    // initializing time variables
    let hours = TIME.getHours() > 12 ? appendZero(TIME.getHours() - 12) : appendZero(TIME.getHours()) 
        ,minutes = appendZero(TIME.getMinutes())
        ,seconds = appendZero(TIME.getSeconds())
        ,ampm = TIME.getHours() > 12  ? "PM" : "AM";

    // Updating the clock
    HOURS.textContent = hours;
    MINUTES.textContent = minutes;
    SECONDS.textContent = seconds;
    MERIDIEM.textContent = ampm;

    //compare time for alarm
    alarmArray.forEach((alarm, index) => {
        if(alarm.alarmAMPM === `${hours}:${minutes}:${ampm}`) {
            console.log("Ringing alarm");
            alarmSound.play();
            //alarmSound.loop();
        }
    })
     
}

// initalizing interval on window load
window.onload = () => {
    setInterval(handleDisplayTime, 1000);
};
