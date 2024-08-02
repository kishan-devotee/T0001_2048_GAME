const gameZone = document.querySelector('.boxes')
const randomSpaces = [];

const createBox = (x, y) => {
    const box = document.createElement('div');
    box.style.position = 'absolute';
    box.id = `${x + 1},${y + 1}`;
    box.className = "boxArea";
    box.style.width = "110px";
    box.style.height = "110px";
    box.style.left = `${x * 110}px`;
    box.style.top = `${y * 110}px`;
    return box;
};

    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const box = createBox(i, j);
            gameZone.appendChild(box);
        }
    }

document.addEventListener('keyup',(event) => {
    const key = event.key.toLowerCase();
    if (key === "arrowleft")  gameEngine("Left");
    if (key === "arrowright")  gameEngine("Right");
    if (key === "arrowup")  gameEngine("Up");
    if (key === "arrowdown")  gameEngine("Down");
    });
    
    const gameEngine = (direction) => {
        const boxArea = document.querySelectorAll('.box')
        console.log(boxArea[0]);
        
    if (direction === "Left") {
        createBoxElement()
        boxArea.forEach((box, index, array) => {
            let [x,y] = box.id;
            
        })
    }
    if (direction === "Right") {
        createBoxElement()
    }
    if (direction === "Up") {
        createBoxElement()
    }
    if (direction === "Down") {
        createBoxElement()   
    } 
}

const createBoxElement = () => {
    let x =  Math.floor(Math.random() *5)
    let y = Math.floor(Math.random() *5)

    const Area =  document.getElementById(`${x},${y}`)
    if(randomSpaces.includes(`${x},${y}`) && Area.innerHTML) return createBoxElement()
    
    randomSpaces.push(`${x},${y}`)
    const box = document.createElement("div");
    box.className = "box"
    box.id = `${x},${y}`
    box.style.position = "absolute";
    box.textContent = "2"
    Area?.appendChild(box);
}

createBoxElement()
createBoxElement()