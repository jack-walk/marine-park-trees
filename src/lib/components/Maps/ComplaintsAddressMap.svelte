<!--
@component
ComplaintsAddressMap.svelte — Interactive map showing tree complaint addresses

Displays all addresses from Marine Park that have received 5 or more complaints.
Each address is shown as a circle marker, clickable to reveal complaint count.

USAGE EXAMPLE:
<ComplaintsAddressMap incidents={marineParkIncidents} />
-->
<script>
  import Map from './Map.svelte';
  import MapLayer from './MapLayer.svelte';

  let { incidents = [] } = $props();

  /**
   * Aggregate incidents by address and filter to those with 2+ complaints
   */
  const addressCounts = $derived.by(() => {
    const counts = {};

    for (const incident of incidents) {
      const address = incident['Incident Address'];
      const lat = parseFloat(incident.Latitude);
      const lng = parseFloat(incident.Longitude);

      // Skip if missing required fields
      if (!address || !lat || !lng || !Number.isFinite(lat) || !Number.isFinite(lng)) {
        continue;
      }

      if (!counts[address]) {
        counts[address] = {
          address,
          latitude: lat,
          longitude: lng,
          count: 0,
        };
      }
      counts[address].count += 1;
    }

    return Object.values(counts).filter((item) => item.count >= 5);
  });

  /**
   * Convert aggregated data to GeoJSON format for the map
   */
  const geojsonData = $derived.by(() => ({
    type: 'FeatureCollection',
    features: addressCounts.map((item) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.longitude, item.latitude],
      },
      properties: {
        address: item.address,
        count: item.count,
      },
    })),
  }));

  /**
   * Popup template showing address and complaint count
   */
  function popupTemplate(feature) {
    const props = feature.properties;
    return `
      <div style="font-size: 13px; line-height: 1.5;">
        <strong>${props.address}</strong>
        <div style="color: #666; margin-top: 4px;">
          ${props.count} ${props.count === 1 ? 'complaint' : 'complaints'}
        </div>
      </div>
    `;
  }

  // Calculate map center as average of all addresses
  const mapCenter = $derived.by(() => {
    if (addressCounts.length === 0) {
      return { latitude: 40.618, longitude: -73.925 }; // Marine Park default
    }

    const avgLat = addressCounts.reduce((sum, item) => sum + item.latitude, 0) / addressCounts.length;
    const avgLng = addressCounts.reduce((sum, item) => sum + item.longitude, 0) / addressCounts.length;

    return { latitude: avgLat, longitude: avgLng };
  });
</script>

{#if geojsonData.features.length > 0}
  <Map
    latitude={mapCenter.latitude}
    longitude={mapCenter.longitude}
    zoom={13}
  >
    <MapLayer
      id="complaint-addresses"
      type="circle"
      data={geojsonData}
      paint={{
        'circle-radius': 8,
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'count'],
          2,
          '#d4e8d0',
          5,
          '#a8d58f',
          10,
          '#8bb627',
          20,
          '#566500',
        ],
        'circle-opacity': 0.8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-opacity': 1,
      }}
      popup={popupTemplate}
    />
  </Map>
{:else}
  <p style="text-align: center; color: #666; padding: 20px;">
    No addresses with 5+ complaints found.
  </p>
{/if}

<style lang="scss">
  /* Styles inherited from parent */
</style>
