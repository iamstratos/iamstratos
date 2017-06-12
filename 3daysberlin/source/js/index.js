import React from 'react';
import ReactDOM from 'react-dom';
import Header from './views/components/Header';
import ModuleIntro from './views/components/ModuleIntro';
import BackgroundCanvas from './views/components/BackgroundCanvas';

// Load SASS
import '../sass/app.sass';




class App extends React.Component {
    render(){
        return (
            <div>
              <Header />
              <ModuleIntro />
              <BackgroundCanvas />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);