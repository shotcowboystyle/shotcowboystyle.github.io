import maplibregl from 'maplibre-gl';
import type { MapOptions } from './types';

/**
 * MapProvider is responsible for creating and managing the MapLibre GL instance.
 *
 * Single Responsibility: Map initialization and configuration.
 */
export class MapProvider {
	private map: maplibregl.Map | null = null;

	/**
	 * Initialize a new MapLibre GL map instance.
	 *
	 * @param containerId - The HTML element ID where the map will be rendered
	 * @param options - Map configuration options
	 * @returns The initialized MapLibre GL map instance
	 */
	initialize(containerId: string, options: MapOptions): maplibregl.Map {
		if (this.map) {
			return this.map;
		}

		this.map = new maplibregl.Map({
			container: containerId,
			style: `/geojson/portfolio_location_map.json?key=${options.ACCESS_TOKEN}`,
			center: options.LONGITUDE_LATITUDE ?? [0, 0],
			zoom: 12,
			maxZoom: options.MAX_ZOOM,
			minZoom: options.MIN_ZOOM,
			attributionControl: false,
			scrollZoom: false,
			interactive: false,
		});

		return this.map;
	}

	/**
	 * Get the current map instance.
	 *
	 * @returns The MapLibre GL map instance or null if not initialized
	 */
	getMap(): maplibregl.Map | null {
		return this.map;
	}

	/**
	 * Destroy the map instance and clean up resources.
	 */
	destroy(): void {
		if (this.map) {
			this.map.remove();
			this.map = null;
		}
	}
}
