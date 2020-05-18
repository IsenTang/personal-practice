import React,{ useState,useEffect } from 'react';
import { useMount } from 'react-use';
import _ from 'lodash';
import  uuidV4  from 'uuid/v4';
import classnames from 'classnames';
import intl from 'react-intl-universal';
import { Button } from '@material-ui/core';

/* componets */
import Pillar from './Components/Pillar';

/* styles */
import './style.scss';

/* utils */
import { sleep } from '../../Common/utils';

function BubbleSort () {

   const [ perHeight,setPerHeight ] = useState(0);

   const [ pillars, setPillar ] = useState(null);

   //设置柱子的最高高度
   const maxHeight = 500;

   //初始化数组
   const array = [ 4,5,3,1,9,2,6 ];

   // mount
   useMount(()=>{

      setPerHeight(getPerHeight(array));

   });

   /* 改变位置，重新渲染 */
   useEffect(() => {

      setPillar(renderPillars());

   }, [ perHeight ]); // eslint-disable-line react-hooks/exhaustive-deps

   // 获取每个柱子的高度
   function getPerHeight (array){

      //获取最大值
      let maxNumber = Math.max(...array);

      //一份大小
      let perHeight = Math.floor(maxHeight / maxNumber);

      return perHeight;
   }

   /* 渲染圆柱体 */
   function renderPillars (actives = []){

      return _.map(array,(item,index)=>{

         return <Pillar key={ uuidV4() } height={  parseInt(item * perHeight) } isActive={ _.includes(actives,index) } number={ item }/>;
      });
   }

   /* 冒泡排序 */
   async function startSort (){

      if(Array.isArray(array)){

         if(array.length < 1){
            return array;
         }

         for(let i = 0; i < array.length - 1; i++){

            for(let j = 0; j < array.length - 1 - i; j++){

               /* 等待0.5s，重新渲染执行动画 */
               await sleep(500);

               setPillar(renderPillars([ j,j + 1 ]));

               if(array[j] <= array[j + 1]){

                  let temp = array[j];

                  array[j] = array[j + 1];

                  array[j + 1] = temp;

               }
            }
         }

         setPillar(renderPillars());
      }
   }

   return (
      <div className={ classnames('vertical-horizontally','bubble-sort-container') }>

         <div className={ classnames('container-row-center','pillars-container') }>
            { pillars }
         </div>

         <div className={ classnames('bubble-sort-button') }>
            <Button variant="contained" color="primary" onClick={ startSort }>{intl.get('start')}</Button>
         </div>
      </div>
   );
}

export default BubbleSort;