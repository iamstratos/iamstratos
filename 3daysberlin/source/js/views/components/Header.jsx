import React from 'react';
// import PropTypes from 'prop-types';

class Header extends React.Component {
	render()
	{
		return (
			<div className='Header'>
				<h1>Visit Berlin</h1>
				<div className='rightSide'>
					{this.renderSocialIcons()}
					<div className='menu'>
					</div>
				</div>
			</div>
		)
	}
	
	renderSocialIcons()
	{
	  return (
		<div className='social'>
			{ this.renderSocialIcon("instagram", "#") }
			{ this.renderSocialIcon("youtube", "#") }
		</div>
	  );
	}

	renderSocialIcon(iconClass, url)
	{
	  if (!iconClass) { return null; }
	  return (
		<a className={`social__link ${iconClass}`} href={url} target='_blank'>
			<i className={`icon icon--${iconClass}`} />
			<div className='social__link__text'>{ iconClass }</div>
		</a>
	  );
	}
}

export default Header