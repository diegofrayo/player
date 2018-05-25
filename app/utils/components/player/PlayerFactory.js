// import JWPlayerImplementation from 'utils/components/player/JWPlayerImplementation';
import PlyrImplementation from 'utils/components/player/PlyrImplementation';

export default class PlayerFactory {

   createInstance(className) {
      // if (className === 'JWPlayerImplementation') {
      //    this.playerInstance = new JWPlayerImplementation();
      // }
      if (className === 'PlyrImplementation') {
         this.playerInstance = new PlyrImplementation();
      }

      return this.playerInstance;
   }

   getInstance() {
      return this.playerInstance;
   }

}
