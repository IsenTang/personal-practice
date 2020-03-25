import Welcome from '../Views/Welcome/Welcome';
import DrumKit from '../Views/DrumKit/DrumKit';

/* router config */
const config = [
   {
      name:      'welcome',
      path:      '/',
      exact:     true,
      component: Welcome
   },
   {
      name:      'drumkit',
      path:      '/drumkit',
      exact:     true,
      component: DrumKit
   }
];

export default config;