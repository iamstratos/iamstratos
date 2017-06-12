import React from 'react';
import ReactDOM from 'react-dom';
import Header from './views/components/Header';
import ModuleIntro from './views/components/ModuleIntro';
import BackgroundCanvas from './views/components/BackgroundCanvas';
import Timeline from './views/components/Timeline';
import PropTypes from 'prop-types';

// Load SASS
import '../sass/app.sass';




class App extends React.Component {
    render(){
        return (
            <div>
              <BackgroundCanvas />
              <Timeline />
              <Header />
              <ModuleIntro />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);