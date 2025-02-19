import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
       <Grid/>
  )
}


function Grid() {
    
    const gridsize = 20;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridsize}, 1fr)`, gap: '1px', width: '400px', height: '400px' }}>
        {
            Array.from({length: gridsize * gridsize}).map((_, index) => {
                const col = index % gridsize;
                return (
                    <Square/>
                )
            })
        }
        </div>
    );
};

function Square() {

    return (
       <div   
        style={{
              width: '20px',
              height: '20px', // Adjust height as needed
              border: '3px solid #ccc', // Optional border
             // Add any other styles or event handlers you need.
        }}
       >
       </div>
    )

}

export default App
