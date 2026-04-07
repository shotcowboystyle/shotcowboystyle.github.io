import { EventHandlerRegistry } from '@/utils/disposable';
import type maplibregl from 'maplibre-gl';
import type { MapOptions } from './types';

/**
 * ZoomController manages zoom button interactions and zoom level changes.
 *
 * Single Responsibility: Zoom button handling and zoom level management with proper cleanup.
 */
export class ZoomController {
	private zoomInButton: HTMLButtonElement | null = null;
	private zoomOutButton: HTMLButtonElement | null = null;
	private eventRegistry: EventHandlerRegistry;
	private map: maplibregl.Map | null = null;
	private options: MapOptions;

	constructor(options: MapOptions) {
		this.options = options;
		this.eventRegistry = new EventHandlerRegistry();
	}

	/**
	 * Initialize zoom controls by binding to DOM elements and setting up event listeners.
	 *
	 * @param map - The MapLibre GL map instance to control
	 */
	initialize(map: maplibregl.Map): void {
		this.map = map;

		this.zoomInButton = document.getElementById('zoom-in-button') as HTMLButtonElement;
		this.zoomOutButton = document.getElementById('zoom-out-button') as HTMLButtonElement;

		if (this.zoomInButton) {
			this.eventRegistry.register(this.zoomInButton, 'click', () => this.zoomIn(), false);
		}

		if (this.zoomOutButton) {
			this.eventRegistry.register(this.zoomOutButton, 'click', () => this.zoomOut(), false);
		}
	}

	/**
	 * Zoom in by the configured step amount.
	 * Handles button state updates based on zoom limits.
	 */
	private zoomIn(): void {
		if (!this.map) {
			return;
		}

		const currentZoomLevel = this.map.getZoom();
		if (currentZoomLevel === this.options.MAX_ZOOM) {
			return;
		}

		const newZoomLevel = currentZoomLevel + this.options.ZOOM_LEVEL_STEP_AMOUNT;
		this.map.zoomTo(newZoomLevel);

		this.updateButtonStates(newZoomLevel);
	}

	/**
	 * Zoom out by the configured step amount.
	 * Handles button state updates based on zoom limits.
	 */
	private zoomOut(): void {
		if (!this.map) {
			return;
		}

		const currentZoomLevel = this.map.getZoom();
		if (currentZoomLevel === this.options.MIN_ZOOM) {
			return;
		}

		const newZoomLevel = currentZoomLevel - this.options.ZOOM_LEVEL_STEP_AMOUNT;
		this.map.zoomTo(newZoomLevel);

		this.updateButtonStates(newZoomLevel);
	}

	/**
	 * Update button disabled states based on current zoom level.
	 *
	 * @param zoomLevel - The current zoom level
	 */
	private updateButtonStates(zoomLevel: number): void {
		if (this.zoomInButton) {
			this.zoomInButton.disabled = zoomLevel === this.options.MAX_ZOOM;
		}

		if (this.zoomOutButton) {
			this.zoomOutButton.disabled = zoomLevel === this.options.MIN_ZOOM;
		}
	}

	/**
	 * Clean up event listeners and reset state.
	 */
	destroy(): void {
		this.eventRegistry.dispose();
		this.zoomInButton = null;
		this.zoomOutButton = null;
		this.map = null;
	}
}
