import Welcome from '../Views/Welcome/Welcome';
import DrumKit from '../Views/DrumKit/DrumKit';
import Resume from '../Views/Resume/Resume';
import BubbleSort from '../Views/BubbleSort/BubbleSort';

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
   },
   {
      name:      'resume',
      path:      '/resume',
      exact:     true,
      component: Resume
   },
   {
      name:      'bubbleSort',
      path:      '/bubbleSort',
      exact:     true,
      component: BubbleSort
   }
];

export default config;