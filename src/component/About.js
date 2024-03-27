import React, { useContext, useEffect } from 'react';
import noteContext from '../context/noteContext1';
const About = () => {
    const a=useContext(noteContext)
    useEffect(()=>{
      a.update()
    },[])
    
  return (
    <div>
      about {a.state.name}----{a.state.age}
    </div>
  );
}

export default About;
