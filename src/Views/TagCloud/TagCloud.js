import React,{ useState,useRef } from 'react';
import { useMount,useEvent } from 'react-use';
import classnames from 'classnames';
import _ from 'lodash';
import  uuidV4  from 'uuid/v4';

/* components */
import Tag from './Components/Tag';

/* style */
import './style.scss';

function TagCloud () {

   /* 初始化标签 */
   const tagsNames = [ 'java', 'javscript', 'C', 'C++', '前端', 'React', 'Vue', 'redux', '写作', '程序员', '编程' ];

   /* 球体半径 */
   const RADIUS = 200;

   /* 焦距 */
   const fallLength = RADIUS * 1.5;

   /* 基线 */
   const BASEANGLE = Math.PI / 360;

   const [ angleX,setAngleX ] = useState(BASEANGLE);

   const [ angleY,setAngleY ] = useState(BASEANGLE);

   const [ tags,setTags ] = useState(null);

   const containerRef = useRef();

   useMount(()=>{

      /* 初始化tags */
      setTags(renderTagCloud());

   });

   /* 增加鼠标互动事件 */
   useEvent('mousemove',(e)=>{

      /* 随着鼠标拖动，角度发生变化 */
      const angleX = 2 * (e.clientX / document.body.getBoundingClientRect().width - 0.5) * BASEANGLE;
      const angleY = 2 * (e.clientY / document.body.getBoundingClientRect().height - 0.5) * BASEANGLE;

      setAngleX(angleX);
      setAngleY(angleY);
   });

   /* 渲染标签云 */
   function renderTagCloud (){

      return _.map(tagsNames,(tag,index)=>{

         /* 获取球面平均分布点 */
         let k = -1 + (2 * (index + 1) - 1) / tagsNames.length;
         let a = Math.acos(k);
         let b = a * Math.sqrt(tagsNames.length * Math.PI);

         /* 获取球面坐标 */
         let x = RADIUS * Math.sin(a) * Math.cos(b);
         let y = RADIUS * Math.sin(a) * Math.sin(b);
         let z = RADIUS * Math.cos(a);

         return (<Tag { ...calcTags(x,y,z) } content={ tag } key={ uuidV4() }/>);
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

   /* 绕x轴旋转 */
   function rotateX (){
      let cos = Math.cos(angleX);
      let sin = Math.sin(angleX);

      _.forEach(tags,(tag)=>{

      });
   }

   /* 绕y轴旋转 */
   function rotateY (){
      let cos = Math.cos(angleY);
      let sin = Math.sin(angleY);

   }

   return (
      <div>
         <div className={ classnames('vertical-horizontally','main-height') } >

            <div className={ classnames('tagCloud-container') } ref={ containerRef }>

               {tags}
            </div>

         </div>
      </div>
   );
}

export default TagCloud;