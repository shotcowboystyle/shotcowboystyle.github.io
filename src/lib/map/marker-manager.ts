import maplibregl from 'maplibre-gl';
import type { MapOptions } from './types';

/**
 * MarkerManager handles creation and management of map markers.
 *
 * Single Responsibility: Marker creation and placement on the map.
 */
export class MarkerManager {
	private options: MapOptions;

	constructor(options: MapOptions) {
		this.options = options;
	}

	/**
	 * Create and add a marker to the map.
	 *
	 * @param map - The MapLibre GL map instance
	 * @returns True if marker was created successfully, false otherwise
	 */
	createMarker(map: maplibregl.Map): boolean {
		const markerElement = document.getElementById('map-marker');

		if (!markerElement) {
			return false;
		}

		markerElement.classList.remove('hidden');

		new maplibregl.Marker({ element: markerElement })
			.setLngLat(this.options.LONGITUDE_LATITUDE)
			.addTo(map);

		return true;
	}

	/**
	 * Show navigation controls element.
	 */
	showNavigationControls(): void {
		const navigationControls = document.getElementById('map-nav-controls');

		if (navigationControls) {
			navigationControls.classList.remove('hidden');
		}
	}
}
