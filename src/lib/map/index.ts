import { MapProvider } from './map-provider';
import { MarkerManager } from './marker-manager';
import type { MapOptions } from './types';
import { ZoomController } from './zoom-controller';

/**
 * LocationMap is a facade that composes MapProvider, ZoomController, and MarkerManager.
 *
 * This class maintains backward compatibility with the original LocationMap API
 * while internally using the refactored, SRP-compliant modules.
 *
 * Single Responsibility: Coordinate and compose map-related services.
 */
export default class LocationMap {
	DOM: {
		containerId: string;
	};

	private mapProvider: MapProvider;
	private zoomController: ZoomController;
	private markerManager: MarkerManager;
	private mapContainer: HTMLElement | null = null;

	defaultOptions: MapOptions = {
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

		this.mapProvider = new MapProvider();
		this.zoomController = new ZoomController(this.defaultOptions);
		this.markerManager = new MarkerManager(this.defaultOptions);

		this.init();
	}

	/**
	 * Initialize the map and its components.
	 */
	private init(): void {
		this.mapContainer = document.getElementById(this.DOM.containerId);

		if (!this.mapContainer) {
			return;
		}

		const map = this.mapProvider.initialize(this.DOM.containerId, this.defaultOptions);

		map.on('load', () => this.onMapLoad());
	}

	/**
	 * Handle map load event by initializing markers and zoom controls.
	 */
	private onMapLoad(): void {
		const map = this.mapProvider.getMap();

		if (!map) {
			return;
		}

		this.markerManager.showNavigationControls();
		const markerCreated = this.markerManager.createMarker(map);

		if (markerCreated) {
			this.zoomController.initialize(map);
		}
	}

	/**
	 * Clean up all resources and remove event listeners.
	 */
	destroy(): void {
		this.zoomController.destroy();
		this.mapProvider.destroy();

		if (this.mapContainer) {
			this.mapContainer.remove();
			this.mapContainer = null;
		}
	}

	/**
	 * Get the underlying MapLibre GL map instance.
	 * Provided for backward compatibility.
	 *
	 * @returns The map instance or null
	 */
	get map() {
		return this.mapProvider.getMap();
	}

	/**
	 * Get zoom in button reference.
	 * Provided for backward compatibility (though direct access is discouraged).
	 */
	get zoomInButton() {
		return document.getElementById('zoom-in-button') as HTMLButtonElement | null;
	}

	/**
	 * Get zoom out button reference.
	 * Provided for backward compatibility (though direct access is discouraged).
	 */
	get zoomOutButton() {
		return document.getElementById('zoom-out-button') as HTMLButtonElement | null;
	}
}

// Re-export types for consumers
export type { MapOptions, MapDOMElements, MapElements, MapState } from './types';
