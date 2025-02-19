import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [snake, setSnake] = useState(new Snake());

  useEffect(() => {
    setSnake(new Snake());
  }, [])

  return (
       <Grid snake={snake}/>
  )
}


function Grid(snake: Snake) {
    
    const gridsize = 20;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridsize}, 1fr)`, gap: '1px', width: '400px', height: '400px' }}>
        {
            Array.from({length: gridsize * gridsize}).map((_, index) => {
                const row = Math.floor(index/gridsize);
                const col = index % gridsize;
                const snake_fill = snake.snake.body.includes({x: col, y: row});
                console.log(col)
                console.log(row)
                console.log(snake_fill)
                return (
                    <Square row={row} col={col} snake_fill={snake_fill}/>
                )
            })
        }
        </div>
    );
};

function Square(row: number, col: number, snake_fill: bool) {

    return (
       <div   
        style={{
              width: '20px',
              height: '20px', // Adjust height as needed
              background: snake_fill ? 'black': 'white',
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
