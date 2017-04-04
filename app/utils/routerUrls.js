const ROOT = APP_SETTINGS.environment === 'development' ? '/' : '/player/';

const routes = {
	ROOT,
	SEARCH: function search() {
		return `${this.ROOT}search`;
	},
	PLAYLIST: function playlist() {
		return `${this.ROOT}playlist`;
	},
	FAVORITES: function favorites() {
		return `${this.ROOT}favorites`;
	}
};

export default routes;