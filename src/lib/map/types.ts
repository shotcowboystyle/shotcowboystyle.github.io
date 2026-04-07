import type maplibregl from 'maplibre-gl';

/**
 * Configuration options for the map.
 */
export interface MapOptions {
	ACCESS_TOKEN: string;
	LONGITUDE_LATITUDE: [number, number];
	MAX_ZOOM: number;
	MIN_ZOOM: number;
	ZOOM_LEVEL_STEP_AMOUNT: number;
}

/**
 * DOM element IDs used by the map components.
 */
export interface MapDOMElements {
	containerId: string;
}

/**
 * Reference to map-related DOM elements.
 */
export interface MapElements {
	container: HTMLElement | null;
	navigationControls: HTMLElement | null;
	marker: HTMLElement | null;
	zoomInButton: HTMLButtonElement | null;
	zoomOutButton: HTMLButtonElement | null;
}

/**
 * Map instance state.
 */
export interface MapState {
	map: maplibregl.Map | null;
	elements: MapElements;
	options: MapOptions;
}
