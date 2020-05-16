import React,{ useState,useEffect,useRef } from 'react';
import { useMount } from 'react-use';
import marked from 'marked';

/* style */
import './style.scss';
import './github-markdown.css';

/* 简历 */
function Resume () {

   /* 是否添加markdown样式 */
   const [ isMarkdown,setIsMarkdown ] = useState(false);

   const [ style,setStyle ] = useState('');

   const [ markdownClass, setMarkdownClass ] = useState('');

   const [ resume, setResume ] = useState('');

   const leftContentRef = useRef();

   /* 间隔时间  */
   const interval = 10;

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
  padding: 2px;
  border: 1px solid;
  margin: 5px;
  overflow: auto;
  width: calc((100vw - 256px - 10px)/2); 
  height: 90vh;
}
/* It looks like a  command-line tool now , right ?
/* Let me finish my resume~
* ====================================================
* First of all , I need a paper.
*/
.rightContent {
  position: fixed; right: 0; top: 64px;
  padding: .5em;  
  margin: 5px;
  width: calc((100vw - 256px - 10px)/2); 
  height: 90vh; 
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

   const resumeContent = [ `
## MyResume

### Name : *Yichao Tang*
### Gender : *male*
### Email : *3104255643@qq.com*
### Education : Nanjing University of Posts and Telecommunication` ];

   useMount(()=>{
      showContent();
   });

   useEffect(() => {

      /* 定时打字 */
      const timer = setTimeout(()=>{showContent();},interval);

      /* 清除定时器 */
      return () => { clearTimeout(timer); };

   }, [ style,resume ]);

   /* 执行markdown解析 */
   function getIsMarked (){

      setIsMarkdown(true);
   }

   /* 添加markdown github样式 */
   function getMarkedStyle (){

      setMarkdownClass('markdown-body');
   }

   /* 显示 */
   function showContent (){

      /* 获取信息数组下标 */
      let { index,part } = getIndex();

      /* 左边为样式部分，右边为简历部分 */
      let content = part === 0 ? styleContent : resumeContent;

      /* 左边 */

      /* 总长度 */
      let totalLength = part === 0 ? styleContent.slice(0,index + 1).join('').length :
         resumeContent.slice(0,index + 1).join('').length;

      /* 现在所在的位置 */
      let currentIndex = part === 0 ? style.length - styleContent.slice(0,index).join('').length :
         resume.length - resumeContent.slice(0,index).join('').length;

      /* 如果相同，返回，去下一个内容 */
      if(currentIndex === totalLength ){

         return;
      }

      /* 塞入对应字符 */
      if(part === 0){
         setStyle(style + content[index].substring(currentIndex,currentIndex + 1));
      }else{
         setResume(resume + content[index].substring(currentIndex,currentIndex + 1));
      }

      /* 自动滚动到底部 */
      leftContentRef.current.scrollTop = leftContentRef.current.scrollHeight;

   }

   /* 获取整体信息数组下标 */
   function getIndex (){

      const length = style.length;

      /* 0代表左边，1代表右边 */
      let part = 0;
      let index = 0;

      if(length < styleContent.slice(0,1).join('').length){
         index = 0;
      }else if(length >= styleContent.slice(0,1).join('').length && length < styleContent.slice(0,2).join('').length){
         index = 1;
      }else if(length >= styleContent.slice(0,2).join('').length && length < styleContent.slice(0,3).join('').length){
         index = 2;
      }else if(length >= styleContent.slice(0,3).join('').length && length < styleContent.slice(0,4).join('').length){
         part = 1;
         index = 0;
      }

      if(resume.length >= resumeContent[0].length){
         part = 0;
         index = 3;
      }

      if(length >= styleContent.slice(0,4).join('').length){
         if(!isMarkdown){
            getIsMarked();
         }
         index = 4;
      }

      if(length >= styleContent.slice(0,5).join('').length){

         if(markdownClass === ''){
            getMarkedStyle();
         }
         index = 5;
      }

      return { part,index };
   }

   return (
      <div>
         <div className='leftContent' ref={ leftContentRef }><pre>{style}</pre></div>
         <div className='rightContent'>
            <code className={ markdownClass } dangerouslySetInnerHTML={{ __html: isMarkdown ? marked(resume) : resume }}></code>
         </div>
         <style>{style}</style>
      </div>
   );
}

export default Resume;