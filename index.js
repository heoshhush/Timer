// --- 변수 선언 --- //

const startButton = document.querySelector('.startButton');
    startButton.setAttribute('data-id','startButton');
const stopButton = document.querySelector('.stopButton');
    stopButton.setAttribute('data-id','stopButton');
const resetButton = document.querySelector('.resetButton');
    resetButton.setAttribute('data-id','resetButton');
const recordButton = document.querySelector('.recordButton');
    recordButton.setAttribute('data-id','recordButton');
const timer = document.querySelector('.timer');
const record = document.querySelector('.timer__record');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const milSeconds = document.querySelector('.milSeconds');

// ---- 시계 작동에 필요한 변수 선언 --- //
let i = 00;
let j = 00;
let k = 00;
let count


// ----- 밀리세컨 단위 카운트 --- //

function countMilSeconds(){
    milSeconds.innerText = `${ i < 10 ? `0${i}` : `${i}`}`;
    i++
    if(i == 100){
        i = 00;
        milSeconds.innerText = '00';
        countSeconds()
    }
}
// ----- 초 단위 카운트 --- //
function countSeconds(){
    j++
    seconds.innerText = `${j < 10 ? `0${j}` : `${j}`}`;
    if(j === 60){
        j = 00;
        seconds.innerText = '00';
        countMinutes();
    }
}
// ----- 분 단위 카운트 --- //
function countMinutes(){
    k++
    minutes.innerText = `${k < 10 ? `0${k}` : `${k}`}`;
}

// ---- 카운트 시작 함수 --//
function startCount(){
count = setInterval(()=>countMilSeconds(),10);
}
// --- 카운트 중지 함수 ---//
function stopCount(){
    clearInterval(count);
}

// --- 버튼 생성 및 버튼별 기능 삽입 --- //
timer.addEventListener('click', (event)=>{
    const dataset = event.target.dataset
    const records = document.querySelectorAll('.newRecord');

    
    if(dataset.id == 'startButton'){
        startCount();
        startButton.classList.add('invisible');
        stopButton.classList.add('visible');
        resetButton.classList.add('visible');
        recordButton.classList.add('visible');
    } else if(dataset.id == 'stopButton'){
        stopCount();
        startButton.classList.remove('invisible');
        stopButton.classList.remove('visible');
    } else if(dataset.id == 'resetButton'){
        i = 00; 
        milSeconds.innerText = '00';
        j = 00;
        seconds.innerText = '00';
        k = 00;
        minutes.innerText = '00';
        records.forEach((record) => record.parentNode.remove());
        stopCount();
        startButton.classList.remove('invisible');
        stopButton.classList.remove('visible');
    } else if(dataset.id == 'recordButton'){
        const newRecordRow = document.createElement('li');
        newRecordRow.setAttribute('class','newRecordRow');
        const newRecord = document.createElement('div');
        newRecord.setAttribute('class','newRecord')
        newRecord.innerText = `${minutes.innerText}:${seconds.innerText}:${milSeconds.innerText}`
        const recordDelBtn = document.createElement('button');
        recordDelBtn.innerText = '✖'
        recordDelBtn.setAttribute('data-type','delBtn');
        recordDelBtn.setAttribute('class','recordDelBtn');

        newRecordRow.appendChild(newRecord);
        newRecordRow.appendChild(recordDelBtn);
        record.appendChild(newRecordRow);

        if(records.length == 3){
           records[0].parentNode.remove()
        }
    }
    else if(dataset.type == 'delBtn'){
        event.target.parentNode.remove();
        }
        
    })


