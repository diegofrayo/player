export default class PlyrImplementation {

   setup(configuration) {

      const setupConfig = {
         autoplay: false,
         controls: [],
         displayDuration: false,
         hideControls: true,
         volume: 10,
      };

      this.player = new Plyr(
         document.getElementById(configuration.container_id),
         setupConfig
      );
   }

   loadSong(song) {
      this.player.source = {
         type: 'video',
         sources: [
            {
               src: song.source_id,
               provider: 'youtube',
            },
         ],
      };
   }

   play() {
      this.player.play();
   }

   pause() {
      this.player.pause();
   }

   stop() {
      this.player.stop();
   }

   getState() {
      return this.player.paused ? 'PAUSED' : 'PLAYING';
   }

   getDuration() {
      return this.player.duration;
   }

   getVolume() {
      return this.player.volume;
   }

   setVolume() {
      this.player.config.muted = false;
      this.player.config.volume = 1;
      this.player.increaseVolume(1);
   }

   getMute() {
      return this.player.config.muted;
   }

   setMute() {
      this.player.config.muted = true;
      this.player.config.volume = 0;
      this.player.decreaseVolume(1);
   }

   getPosition() {
      return this.player.currentTime;
   }

   setPosition(position) {
      this.player.currentTime = position;
   }

   configureCallbacks(callbacks) {
      this.player.on('ended', callbacks.complete);
      this.player.on('error', callbacks.error);
      this.player.on('pause', callbacks.pause);
      this.player.on('play', callbacks.play);
      this.player.on('ready', callbacks.ready);
      this.player.on('seeked', callbacks.seek);
      this.player.on('timeupdate', callbacks.time);
   }

}
