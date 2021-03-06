export default class JWPlayerImplementation {

   setup(configuration) {

      const setupConfig = {
         key: 'h97SPVY9oEJMHKhqc2vKipwiGipeHUoFkXLNNA',
         controls: false,
         file: `https://www.youtube.com/watch?v=${configuration.source_id}`,
         height: '100%',
         skin: {
            name: 'custom-skin',
         },
         width: '100%',
      };

      jwplayer.key = setupConfig.key;
      this.player = jwplayer(configuration.container_id).setup(setupConfig);
   }

   loadSong(song) {
      this.player.load([
         {
            file: `https://www.youtube.com/watch?v=${song.source_id}`,
         },
      ]);
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
      return this.player.getState().toUpperCase();
   }

   getDuration() {
      return this.player.getDuration();
   }

   getVolume() {
      return this.player.getVolume();
   }

   setVolume(value) {
      this.player.setVolume(value);
   }

   getMute() {
      return this.player.getMute();
   }

   setMute() {
      this.player.setMute();
   }

   getPosition() {
      return this.player.getPosition();
   }

   setPosition(position) {
      this.player.seek(position);
   }

   configureCallbacks(callbacks) {
      this.player.on('complete', callbacks.complete);
      this.player.on('error', callbacks.error);
      this.player.on('pause', callbacks.pause);
      this.player.on('play', callbacks.play);
      this.player.on('ready', callbacks.ready);
      this.player.on('seek', callbacks.seek);
      this.player.on('time', callbacks.time);
   }

}
