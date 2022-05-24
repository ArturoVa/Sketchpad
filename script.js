const divSketchpad = document.getElementById('sketchpad')

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


/* Painting function */
function paint(e){
    /*Event e is triggered when mouse is clicked */
    if(e.buttons){ //here e.buttons throws 1 when primary button (left-click) is triggered and 0 when not pressed
        if(e.target.dataset.type === 'grid-element'){ //Check if the data-type of the clicked element is a grid-element 

            e.target.style.backgroundColor = 'black'; // changes bg color of selected element to black when true

        }
    }
}



createGrid(); 
/** First check if clicked, if true, then when moving the pointer it will paint the current event target */
divSketchpad.addEventListener('mousedown',(e)=>{ //this EventListener triggers when clicked
    if(e.buttons){ // 1 when clicked, 0 if not
        divSketchpad.addEventListener('mouseover',(e)=>{ // add other event listener that triggers when moving the mousepointer
            paint(e); 
        })
    }
})





