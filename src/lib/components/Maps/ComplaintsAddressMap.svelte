<!--
@component
ComplaintsAddressMap.svelte — Interactive map showing tree complaint addresses

Displays all addresses from Marine Park that have received 5 or more complaints.
Each address is shown as a small tree marker, clickable to reveal complaint count.

USAGE EXAMPLE:
<ComplaintsAddressMap incidents={marineParkIncidents} />
-->
<script>
  import Map from './Map.svelte';
  import MapLayer from './MapLayer.svelte';

  let { incidents = [] } = $props();

  /**
   * Aggregate incidents by address and filter to those with 5+ complaints
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
    width={760}
    height={570}
  >
    <MapLayer
      id="complaint-addresses"
      type="symbol"
      data={geojsonData}
      images={[
        { id: 'tree-marker-2', kind: 'tree', color: '#d4e8d0' },
        { id: 'tree-marker-5', kind: 'tree', color: '#a8d58f' },
        { id: 'tree-marker-10', kind: 'tree', color: '#8bb627' },
        { id: 'tree-marker-20', kind: 'tree', color: '#566500' },
      ]}
      layout={{
        'icon-image': [
          'case',
          ['>=', ['get', 'count'], 20],
          'tree-marker-20',
          ['>=', ['get', 'count'], 10],
          'tree-marker-10',
          ['>=', ['get', 'count'], 5],
          'tree-marker-5',
          'tree-marker-2',
        ],
        'icon-size': 0.7,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-anchor': 'bottom',
        'icon-offset': [0, -1],
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
