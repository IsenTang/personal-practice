import React,{ useState,useRef } from 'react';
import { useMount } from 'react-use';
import classnames from 'classnames';
import _ from 'lodash';

/* components */
import Tag from './Components/Tag';

/* style */
import './style.scss';

function TagCloud () {

   const [ tagComponets,setTagComponents ] = useState(null);

   const containerRef = useRef();

   /* 初始化标签 */
   const tags = [ 'java', 'javscript', 'C', 'C++', '前端', 'React', 'Vue', 'redux', '写作', '程序员', '编程' ];

   /* 球体半径 */
   const RADIUS = 200;

   /* 焦距 */
   const fallLength = RADIUS * 1.5;

   useMount(()=>{

   });

   /* 初始化标签云 */
   function initCloud (){

      return _.map(tags,(tag,index)=>{

         /* 获取球面平均分布点 */
         let k = -1 + (2 * (index + 1) - 1) / tags.length;
         let a = Math.acos(k);
         let b = a * Math.sqrt(tags.length * Math.PI);

         /* 获取球面坐标 */
         let x = RADIUS * Math.sin(a) * Math.cos(b);
         let y = RADIUS * Math.sin(a) * Math.sin(b);
         let z = RADIUS * Math.cos(a);

         return (<Tag { ...calcTags(x,y,z) } content={ tag }/>);
      });
   }

   /* 计算标签云位置 */
   function calcTags (x,y,z){

      const data = {};

      var scale = fallLength / (fallLength - z);
      var alpha = (z + RADIUS) / (2 * RADIUS);
      data.fontSize = 15 * scale + 'px';
      data.opacity = alpha + 0.5;
      data.filter = 'alpha(opacity = ' + (alpha + 0.5) * 100 + ')';
      data.zIndex = parseInt(scale * 100);
      data.left = x + 'px';
      data.top = y + 'px';
      data.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);

      return data;
   }

   return (
      <div>
         <div className={ classnames('vertical-horizontally','main-height') } >

            <div className={ classnames('tagCloud-container') } ref={ containerRef }>

               {initCloud()}
            </div>

         </div>
      </div>
   );
}

export default TagCloud;