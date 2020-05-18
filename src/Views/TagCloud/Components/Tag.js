import React from 'react';
import PropTypes from 'prop-types';

/* 单个标签 */
function Tag ({ content,fontSize,opacity,filter,zIndex,left,top,color }) {

   let style = {
      fontSize,
      opacity,
      filter,
      zIndex,
      left,
      top,
      color,
      display : 'inline-block',
      position : 'absolute',
      height : '50px',
      lineHeight : '50px',
      textDecoration : 'none'
   };

   return (
      <div style={ style }>{content}</div>
   );
}

Tag.propTypes = {
   content:PropTypes.string.isRequired,
   fontSize: PropTypes.string.isRequired, //焦距
   opacity:PropTypes.number.isRequired,
   filter:PropTypes.string.isRequired,//滤镜
   zIndex:PropTypes.number.isRequired,
   color:PropTypes.string.isRequired,
   left:PropTypes.string.isRequired,
   top:PropTypes.string.isRequired,
};

export default Tag;