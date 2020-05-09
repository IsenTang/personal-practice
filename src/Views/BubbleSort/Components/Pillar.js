import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* style */
import './style.scss';

/* 柱子 */
function Pillar ({ height,isActive,number }) {

   return (

      <div
         className={ classnames('pillar',{ 'pillar-active':isActive }) }
         style={{ height }}
      >
         { number }
      </div>

   );
}

Pillar.propTypes = {
   height: PropTypes.number.isRequired,
   isActive: PropTypes.bool.isRequired,
   number:PropTypes.number.isRequired
};

export default Pillar;