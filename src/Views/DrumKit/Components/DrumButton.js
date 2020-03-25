import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* style */
import './style.scss';

function DrumButton ({ keyName,music,on }) {

   return (
      <div className={ classnames('drum-key',{ 'drum-playing':on }) }>
         <div>
            <div className='drum-key-name'>{ keyName }</div>
            <span className='drum-sound'> { music }</span>
         </div>
      </div>
   );
}

DrumButton.propTypes = {
   keyName: PropTypes.string,
   music:PropTypes.string,
   on:PropTypes.bool
};

export default DrumButton;