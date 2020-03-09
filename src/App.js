import React,{ useState } from 'react';
import _ from 'lodash';
import { useMount } from 'react-use';
import intl from 'react-intl-universal';
import  uuidV4  from 'uuid/v4';
import { Switch,Redirect,Route } from 'react-router-dom';

import routers from './Routers/index';
import { get,set } from './Common/utils';

import './App.scss';

/* components */
import Loading from './Components/Loading/Loading';

const locales = {
   'en-US': require('./I18n/en-US.json'),
   'zh-CN': require('./I18n/zh-CN.json')
};

function App () {

   const [ initDone,setInitDone ] = useState(false);

   useMount(()=>{

      loadLocales();
   });

   function loadLocales () {

      /* init method will load CLDR locale data according to currentLocale
      react-intl-universal is singleton, so you should init it only once in your app*/
      const lang =  get('language');

      let initLang = 'zh-CN';

      if (!_.isEmpty(lang)) {
         initLang = lang;
      } else {

         /* set language to local storage */
         set('language', initLang);
      }

      intl.init({
         currentLocale: initLang,
         locales
      })
         .then(() => {

            /* After loading CLDR locale data, start to render*/
            setTimeout(()=>{

               setInitDone(true);
            },2000);

         });
   }

   return (
      initDone ?
         <div className="App">
            <Loading/>
            <Switch>
               { renderRouter() }
            </Switch>

         </div> : <Loading showLoading={ true }/>
   );
}

function renderRouter (){

   const array = _.map(routers, (r) => (

      <Route key={ uuidV4() } component={ r.component }
         exact={ !!r.exact }
         path={ r.path }
      />
   ));

   array.push(<Redirect key={ uuidV4() } path="*" exact={ true } to="/Welcome" />);

   return array;
}

export default App;
