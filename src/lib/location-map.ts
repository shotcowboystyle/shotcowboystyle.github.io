import maplibregl from 'maplibre-gl';

export default class LocationMap {
	DOM: {
		containerId: string;
	};

	mapContainer: HTMLElement | null = null;
	map: maplibregl.Map | null = null;
	zoomInButton: HTMLButtonElement | null = null;
	zoomOutButton: HTMLButtonElement | null = null;

	defaultOptions: {
		ACCESS_TOKEN: string;
		LONGITUDE_LATITUDE: [number, number];
		MAX_ZOOM: number;
		MIN_ZOOM: number;
		ZOOM_LEVEL_STEP_AMOUNT: number;
	} = {
		ACCESS_TOKEN: import.meta.env.PUBLIC_MAPLIBRE_TILES_API_KEY,
		LONGITUDE_LATITUDE: [-79.942368, 32.796824],
		MAX_ZOOM: 12,
		MIN_ZOOM: 6,
		ZOOM_LEVEL_STEP_AMOUNT: 3,
	};

	constructor() {
		this.DOM = {
			containerId: 'location-map',
		};

		this.init();
	}

	init() {
		this.mapContainer = document.getElementById(this.DOM.containerId);
		if (this.mapContainer && !this.map) {
			this.map = new maplibregl.Map({
				container: this.DOM.containerId,
				style: `/geojson/portfolio_location_map.json?key=${this.defaultOptions.ACCESS_TOKEN}`,
				center: this.defaultOptions.LONGITUDE_LATITUDE ?? [0, 0],
				zoom: 12,
				maxZoom: this.defaultOptions.MAX_ZOOM,
				minZoom: this.defaultOptions.MIN_ZOOM,
				attributionControl: false,
				scrollZoom: false,
				interactive: false,
			});

			this.map.on('load', () => this.onMapLoad());
		}
	}

	onMapLoad() {
		const mapNavigationControls = document.getElementById('map-nav-controls');
		if (mapNavigationControls) {
			mapNavigationControls.classList.remove('hidden');
		}

		const mapMarker = document.getElementById('map-marker');
		if (mapMarker && this.map) {
			mapMarker.classList.remove('hidden');
			new maplibregl.Marker({ element: mapMarker })
				.setLngLat(this.defaultOptions.LONGITUDE_LATITUDE)
				.addTo(this.map);

			if (!this.zoomInButton) {
				this.zoomInButton = document.getElementById('zoom-in-button') as HTMLButtonElement;
				if (this.zoomInButton) {
					this.zoomInButton.addEventListener('click', () => this.zoomIn(), false);
				}
			}

			if (!this.zoomOutButton) {
				this.zoomOutButton = document.getElementById('zoom-out-button') as HTMLButtonElement;
				if (this.zoomOutButton) {
					this.zoomOutButton.addEventListener('click', () => this.zoomOut(), false);
				}
			}
		}
	}

	zoomIn() {
		if (this.map != null) {
			const currentZoomLevel = this.map.getZoom();
			if (currentZoomLevel === this.defaultOptions.MAX_ZOOM) {
				return;
			} else {
				const newZoomLevel = currentZoomLevel + this.defaultOptions.ZOOM_LEVEL_STEP_AMOUNT;

				this.map?.zoomTo(newZoomLevel);

				if (
					newZoomLevel === this.defaultOptions.MAX_ZOOM &&
					this.zoomInButton &&
					!this.zoomInButton.disabled
				) {
					this.zoomInButton.disabled = true;
				}

				if (
					newZoomLevel !== this.defaultOptions.MIN_ZOOM &&
					this.zoomOutButton &&
					this.zoomOutButton.disabled
				) {
					this.zoomOutButton.disabled = false;
				}
			}
		}
	}

	zoomOut() {
		if (this.map != null) {
			const currentZoomLevel = this.map.getZoom();
			if (currentZoomLevel === this.defaultOptions.MIN_ZOOM) {
				return;
			} else {
				const newZoomLevel = currentZoomLevel - this.defaultOptions.ZOOM_LEVEL_STEP_AMOUNT;

				this.map?.zoomTo(newZoomLevel);

				if (
					newZoomLevel === this.defaultOptions.MIN_ZOOM &&
					this.zoomOutButton &&
					!this.zoomOutButton.disabled
				) {
					this.zoomOutButton.disabled = true;
				}

				if (
					newZoomLevel !== this.defaultOptions.MAX_ZOOM &&
					this.zoomInButton &&
					this.zoomInButton.disabled
				) {
					this.zoomInButton.disabled = false;
				}
			}
		}
	}

	destroy() {
		if (this.mapContainer) {
			this.mapContainer.remove();
		}

		if (this.map) {
			this.map = null;
		}

		if (this.zoomInButton) {
			this.zoomInButton.removeEventListener('click', () => this.zoomIn(), false);
			this.zoomInButton = null;
		}

		if (this.zoomOutButton) {
			this.zoomOutButton.removeEventListener('click', () => this.zoomOut(), false);
			this.zoomOutButton = null;
		}
	}
}
