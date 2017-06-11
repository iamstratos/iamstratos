import React from 'react';
import ReactDOM from 'react-dom';

// Load SASS
import '../sass/app.sass';



const Headline = () => {
  return <h1>React Cheat Sheet</h1>
}

const Intro = () => {
  return (
    <div>
      <Headline />
      <p>Welcome to the React world!</p>
      <Greetings name="World" />
    </div>
  )
}

// Component that receives props
const Greetings = (props) => {
  return <p>You will love it {props.name}.</p>
}

ReactDOM.render(
  <Intro />,
  document.getElementById('root')
);