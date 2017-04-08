const ROOT = APP_SETTINGS.environment === 'development' ? '' : '/player';

const routes = {
	HOME: ROOT === '' ? '/' : ROOT,
	SEARCH: `${ROOT}/search`,
	PLAYLIST: `${ROOT}/playlist`,
	FAVORITES: `${ROOT}/favorites`
};

export default routes;