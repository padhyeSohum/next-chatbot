import { useState } from 'react';

export default function About() {
 const [ mycounter, setCounter ] = useState(10);
  return (
    <div>
        current count: {mycounter}
        <button onClick={()=> setCounter(mycounter+10) }>Add</button>
    </div>

  );


}