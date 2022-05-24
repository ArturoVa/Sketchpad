const divSketchpad = document.getElementById('sketchpad');
const leftContainer = document.getElementById('left-container');
const sizeSlider = document.getElementById('box-size');
const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');
const rainbowMode = document.getElementById('checkbox-1');
const eraseMode = document.getElementById('checkbox-2');
const clearButton = document.getElementById('clear-box');
const colorDisplayText = document.getElementById('color-display')

const sliderList = document.querySelectorAll('.button-content');
/**Append data set */
for(let i =0; i<sliderList.length; i++){
    const counterDiv= document.createElement('div');    
    counterDiv.dataset.value =  i;         
    sliderList[i].appendChild(counterDiv);   
}

const sizeSliderContainer = document.querySelectorAll('.button-content')[0];
const redSliderContainer = document.querySelectorAll('.button-content')[1];
const greenSliderContainer = document.querySelectorAll('.button-content')[2];
const blueSliderContainer = document.querySelectorAll('.button-content')[3];

const sizeSliderCounter = document.querySelector('[data-value="0"]');
const redSliderCounter = document.querySelector('[data-value="1"]');
const greenSliderCounter = document.querySelector('[data-value="2"]');
const blueSliderCounter = document.querySelector('[data-value="3"]');

//-------------
/* Create the grid*/
function createGrid(size=16){
    /* Set the attribute of the size, and adapts depending on the size that the user wants */
    divSketchpad.setAttribute('style',`display: grid; grid-template-columns: repeat(${size},${(100/size)}%);`)
    /**Creates grid, it goes row by row */
    
    for(let i = 0; i <size; i++){
        for(let j = 0; j<size; j++){

            
            const divElement= document.createElement('div');    /** Creates a new div for each space */
            divElement.dataset.type =  'grid-element';          /** Adds the data attribute (in this case [data-type='grid-element']) */
            divSketchpad.appendChild(divElement);               /** Appends the newly created div with the data attribute to the sketchpad div */
        }
    }
}

/** Random color generator */
function randomColor(){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`
}

/* Painting function */
function paint(e, color='black'){
    /*Event e is triggered when mouse is clicked */
    if(e.buttons){ //here e.buttons throws 1 when primary button (left-click) is triggered and 0 when not pressed
        if(e.target.dataset.type === 'grid-element'){ //Check if the data-type of the clicked element is a grid-element 

            e.target.style.backgroundColor = color; // changes bg color of selected element to black when true

        }
    }
}

function getValue(input){
    return input.value;
}

function eraseGrid(){
    divSketchpad.innerHTML= "";
}

function resizeGrid(newValue){
    eraseGrid();
    createGrid(newValue);
}


function sliderValues(sliderElement,sliderElementCounter, maxValue){
    if(getValue(sliderElement)>maxValue){
        sliderElement=maxValue; // prevents manipulating hmtl file from adding more than the admited value
        sliderElementCounter.textContent=getValue(sliderElement);
    }
    else if (getValue(sliderElement)<0){
        sliderElement=0;
        sliderElementCounter.textContent=getValue(sliderElement);
    }
    else{
        sliderElementCounter.textContent=getValue(sliderElement);
    }
}

function updateColor(){
    rgb = `rgb(${getValue(redSlider)},${getValue(greenSlider)},${getValue(blueSlider)})`;
    colorDisplay.style.cssText = 'background-color:'+rgb+'; height:30px; width:30px; border:2px solid white; margin-left:5%;';
}



//------------- 

createGrid();

console.log(rainbowMode.checked)

/* Display values of the sliders */
sizeSliderCounter.textContent=getValue(sizeSlider);
redSliderCounter.textContent=getValue(redSlider);
greenSliderCounter.textContent=getValue(greenSlider);
blueSliderCounter.textContent=getValue(blueSlider);
let rgb = `rgb(${getValue(redSlider)},${getValue(greenSlider)},${getValue(blueSlider)})`;
const colorDisplay = document.createElement('div');
colorDisplay.style.cssText = 'background-color:'+rgb+'; height:30px; width:30px; border:2px solid white; margin-left:5%;';
colorDisplayText.appendChild(colorDisplay);



/* Update values */
sizeSliderContainer.addEventListener('click',()=>{
    if(getValue(sizeSlider)>100){
        sizeSlider=100;
        resizeGrid(getValue(sizeSlider));
    }
    resizeGrid(getValue(sizeSlider));
    sliderValues(sizeSlider,sizeSliderCounter,100);
});

redSliderContainer.addEventListener('click',()=>{
    sliderValues(redSlider,redSliderCounter,255);
    updateColor();
});

greenSliderContainer.addEventListener('click',()=>{
    sliderValues(greenSlider,greenSliderCounter,255);
    updateColor();
});

blueSliderContainer.addEventListener('click',()=>{
    sliderValues(blueSlider,blueSliderCounter,255);
    updateColor();
});

/** First check if clicked, if true, then when moving the pointer it will paint the current event target */
divSketchpad.addEventListener('mousedown',(e)=>{ //this EventListener triggers when clicked
    if(e.buttons){ // 1 when clicked, 0 if not
        divSketchpad.addEventListener('mouseover',(e)=>{ // add other event listener that triggers when moving the mousepointer
            if(rainbowMode.checked && eraseMode.checked){ // if both rainbow and erase are checked returns to false
                alert("No, don't do that, you are not funny.")
                rainbowMode.checked = false;
                eraseMode.checked = false;
            }
            else if(rainbowMode.checked){
                paint(e,randomColor());
            }
            else if(eraseMode.checked){
                paint(e, 'rgb(255, 228, 196)')
            }
            else{
                paint(e,`rgb(${getValue(redSlider)},${getValue(greenSlider)},${getValue(blueSlider)})`); 
            }
        })
    }
})

clearButton.addEventListener('click', ()=> resizeGrid(getValue(sizeSlider)))