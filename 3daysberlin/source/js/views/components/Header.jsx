import React from 'react';

class Header extends React.Component {
    render(){
        return (
            <div className='Header'>
                <h1>Visit Berlin</h1>
                <div className='social'>
                    <a className='instagram' href='#'>
                        <i className='icon icon-instagram' />
                        <p>INSTAGRAM</p>
                    </a>
                    <a className='youtube' href='#'>
                        <i className='icon icon-youtube' />
                        <p>YOUTUBE</p>
                    </a>
                </div>
                <div className='menu'>
                    
                </div>
            </div>
        )
    }
}

export default Header