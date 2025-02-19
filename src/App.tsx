import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  return (
       <Grid/>
  )
}


function Grid() {
    
    const gridsize = 20;
    const [snake, setSnake] = useState<Snake>(new Snake());
    const [grid, setGrid] = useState<boolean[][]>(null);

    // onupdate
    useEffect(() => {
        if (!snake) return;
        setGrid(updateGrid())
    }, [snake])

    // onmount
    useEffect(() => {
        setSnake(new Snake())
    }, [])

    const updateGrid = () => {
        return Array.from({length: gridsize * gridsize}).map((_, index) => {
            const row = Math.floor(index/gridsize);
            const col = index % gridsize;
            let snake_fill = snake.body.some(item => item.x === col & item.y === row);
            return snake_fill;
        })

    }

    const render = () => (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridsize}, 1fr)`, gap: '1px', width: '400px', height: '400px' }}>
        {
            grid.map(
                (snake_fill, index) => {
                    const row_idx = Math.floor(index/gridsize);
                    const col_idx = index % gridsize;
                    console.log(snake_fill)
                    return (
                        <Square key={`${row_idx}_${col_idx}`} row={row_idx} col={col_idx} snake_fill={snake_fill}/>
                    )
                }
            )
        }
        </div>
    );

    if (!grid) {
        return (<></>);
    }
    return render();
};

function Square(row: number, col: number, snake_fill: bool) {
    
    const [colour, setColour] = useState("white");

    useEffect(() => {
        setColour(
            snake_fill == true ? "black" : "white"
        )
    },[])

    useEffect(() => {
        console.log(colour)
    })
    return (
       <div   
        style={{
              width: '20px',
              height: '20px', // Adjust height as needed
              background: colour,
              border: '3px solid #ccc', // Optional border
             // Add any other styles or event handlers you need.
        }}
       >
       </div>
    )

}


class Snake {
    length: 5;
    body: {x: number; y: number}[];

    constructor() {
        this.body = [];
        this.init();
    }

    getbody() {
        return this.body
    }

    init() {
        // define head at random spot
        const head = {x: 10, y: 10};
        this.body.push(head);
        
        let curr = head;
        let new_ = this.getRandomAdjacentPosition(curr);
        this.body.push(new_);
        curr = new_;

        curr = head;
        new_ = this.getRandomAdjacentPosition(curr);
        this.body.push(new_);
        curr = new_;

        curr = head;
        new_ = this.getRandomAdjacentPosition(curr);
        this.body.push(new_);
        curr = new_;


        console.log(this.body);

    }

    getRandomAdjacentPosition(position: { x: number; y: number }): { x: number; y: number } {
        const adjacentPositions = [
          { x: position.x + 1, y: position.y }, // Right
          { x: position.x - 1, y: position.y }, // Left
          { x: position.x, y: position.y + 1 }, // Down
          { x: position.x, y: position.y - 1 }, // Up
        ];

        const randomIndex = Math.floor(Math.random() * adjacentPositions.length);
        return adjacentPositions[randomIndex];
      }



}
export default App
