import maplibregl from 'maplibre-gl';
import type { JSX } from 'solid-js';
import 'maplibre-gl/dist/maplibre-gl.css';
import { onMount } from 'solid-js';
import './location.css';

export type LocationProps = {
	children?: JSX.Element;
};

const ACCESS_TOKEN = import.meta.env.PUBLIC_MAPLIBRE_TILES_API_KEY;

const Location = (props: LocationProps) => {
	const longitude_latitude: [number, number] = [-79.942368, 32.796824];

	onMount(() => {
		const map = new maplibregl.Map({
			container: 'location-map',
			style: `/geojson/portfolio_location_map.json?key=${ACCESS_TOKEN}`,
			center: longitude_latitude ?? [0, 0],
			zoom: 12,
			maxZoom: 12,
			minZoom: 6,
			attributionControl: false,
			scrollZoom: false,
			interactive: false,
		});

		const nav = new maplibregl.NavigationControl({
			showCompass: false,
		});

		map.on('load', () => {
			map.addControl(nav, 'bottom-left');

			const mapMarker = document.getElementById('map-marker')!;
			mapMarker.classList.remove('hidden');
			new maplibregl.Marker({ element: mapMarker }).setLngLat(longitude_latitude).addTo(map);
		});
	});

	return (
		<div id="location-map-wrapper" class="relative h-full w-full">
			<div id="location-map" class="min-h-16 h-full w-full" />
			<div id="map-marker" class="hidden">
				{props.children}
			</div>
		</div>
	);
};

export default Location;
