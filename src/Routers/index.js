import Welcome from '../Views/Welcome/view';

/* router config */
const config = [
   {
      name:      'welcome',
      path:      '/',
      exact:     true,
      component: Welcome
   }
];

export default config;