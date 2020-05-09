import React,{ useState } from 'react';
import { useMount } from 'react-use';

/* 简历 */
function Resume () {

   /* 是否添加markdown样式 */
   const [ isMarkdown,setIsMarkdown ] = useState(false);

   const [ style,setStyle ] = useState('');

   /* 间隔时间  */
   const interval = 50;

   const styleContent = [
      `/* Hello, My name is Yichao Tang, you can call me Isen 
* This is how I write my resume
* It is base on react. I use create-react-app to build the scaffold.
* I hope you like it~
* ===================================================
*/`,`/* This interface is not like development interface.
/* So , let me beautify the interface ^_^
*/`,`
{
  -webkit-transition: all .3s;
  transition: all .3s;
}
html {
  color: #5CACEE; background: #030303; 
}
.leftContent {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* It looks like a  command-line tool now , right ?
/* Let me finish my resume~
* ====================================================
* First of all , I need a paper.
*/
.rightContent {
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh; 
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* Now, I got a white paper. 
* Let me start~~
*/`,`/*As you see, it wirte by markdown grammar.
/*Let me translated into HTML by using marked package.*/
/*Let us start~*/
/*....1....*/
/*....2....*/
/*....3....*/
/*.action!.*/`,`
/*Emmmmmmmmmmmmmmmm......*/
/*It is not pretty right?*/
/*So I use css to beautify my resume. I used github-markdown-css.*/
/*Let us start~*/
/*....1....*/
/*....2....*/
/*....3....*/
/*...go!...*/`,
      '/*And here we are.*/?'
   ];

   useMount(()=>{

   });

   /* 增加样式 */
   function addStyle (val){

      setStyle(style + val);
   }

   function showLeftContent (content){

      /* 本次更新后style的总长度 */
      let len = 0;
      if(style.length === 0){
         len = content.length;
      }else{
         len = style.length + content.length;
      }

      /* style现在的总长度 */
      let lastIndex = style.length;
      return new Promise((resolve,reject)=>{
         const getLeftContnet = () => {
            let currentIndex = style.length - lastIndex;
            if (currentIndex < len - lastIndex){

               setStyle(style + content.substring(currentIndex,currentIndex + 1));
               setTimeout(getLeftContnet,this.interval);
            }

         };
         getLeftContnet();
      });
   }
   return (
      <div>Resume</div>
   );
}

export default Resume;