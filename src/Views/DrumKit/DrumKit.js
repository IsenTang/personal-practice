import React,{ useRef,useState } from 'react';
import { useMount } from 'react-use';
import _ from 'lodash';
import  uuidv4  from 'uuid/v4';

/* config */
import keys from './config.json';

/* sounds */
import clap from '../../Assets/drumkit/sounds/clap.wav';
import hihat from '../../Assets/drumkit/sounds/hihat.wav';
import kick from '../../Assets/drumkit/sounds/kick.wav';
import openhat from '../../Assets/drumkit/sounds/openhat.wav';

/* componets */
import DrumButton from './Components/DrumButton';

/* style */
import './style.scss';

/* https://github.com/soyaine/JavaScript30/tree/master/01%20-%20JavaScript%20Drum%20Kit */
function DrumKit () {

   const clapRef = useRef(null);
   const hihatRef = useRef(null);
   const kickRef = useRef(null);
   const openhatRef = useRef(null);

   const [ code , setCode ] = useState(null);

   useMount(()=>{

      /* 增加监听键盘键入事件 */
      window.addEventListener('keypress',(e)=>{

         controlDrumkit(e.keyCode);
      });
   });

   /* 渲染drum keys */
   function renderKeys (){

      return _.map(keys,(item)=>{

         return (
            <DrumButton
               keyName={ item.key }
               music={ item.music }
               on={ item.code === code }
               key={ uuidv4() }
            />);
      });
   }

   /* 引入audio */
   function addAudios (){

      return (
         <div>
            <audio src={ clap } ref={ clapRef }/>
            <audio src={ hihat } ref={ hihatRef }/>
            <audio src={ kick } ref={ kickRef }/>
            <audio src={ openhat } ref={ openhatRef }/>
         </div>);
   }

   /* 控制播放 */
   function controlDrumkit (code){

      /* 停止所有audio */
      stopAudio();

      setCode(code);
      switch (code) {

      /* A */
      case 97:

         if(!isPlaying(clapRef)){
            clapRef.current.play();
         }

         break;
      /* S */
      case 115:

         if(!isPlaying(hihatRef)){
            hihatRef.current.play();
         }

         break;

      /* D */
      case 100:

         if(!isPlaying(kickRef)){
            kickRef.current.play();
         }

         break;

      /* F */
      case 102:

         if(!isPlaying(openhatRef)){
            openhatRef.current.play();
         }
         break;

      default:
         break;
      }

   }

   /* 停止播放 */
   function stopAudio (){

      clapRef.current.pause();
      clapRef.current.currentTime = 0;

      hihatRef.current.pause();
      hihatRef.current.currentTime = 0;

      kickRef.current.pause();
      kickRef.current.currentTime = 0;

      openhatRef.current.pause();
      openhatRef.current.currentTime = 0;
   }

   /* https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error */
   /* 由于play是异步的，防止出现异步错误 */
   function isPlaying (audio){

      return  audio.currentTime > 0 && !audio.paused && !audio.ended
               && audio.readyState > 2;
   }

   return (
      <div className='drum-kit'>
         {renderKeys()}
         {addAudios()}
      </div>
   );
}

export default DrumKit;