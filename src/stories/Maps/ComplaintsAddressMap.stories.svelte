<!--
  ComplaintsAddressMap.stories.svelte

  Stories for the ComplaintsAddressMap component.
  Displays an interactive map showing tree complaint addresses in Marine Park.

  Props:
  - incidents: Array of incident records with address, latitude, and longitude
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ComplaintsAddressMap from '$lib/components/Maps/ComplaintsAddressMap.svelte';

  // Sample Marine Park incidents
  const sampleIncidents = [
    {
      'Incident Address': '2239 TROY AVENUE',
      'Latitude': '40.619357024',
      'Longitude': '-73.93274528051',
      'Created Date': '2026-05-02',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '898 EAST 58 STREET',
      'Latitude': '40.6328234825',
      'Longitude': '-73.92063703255',
      'Created Date': '2026-05-02',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '1829 EAST 32 STREET',
      'Latitude': '40.61058445056',
      'Longitude': '-73.9372237319',
      'Created Date': '2026-05-01',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '2224 EAST 66 STREET',
      'Latitude': '40.61514899499',
      'Longitude': '-73.90851614374',
      'Created Date': '2026-04-30',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '1760 HENDRICKSON STREET',
      'Latitude': '40.61648520174',
      'Longitude': '-73.93144427134',
      'Created Date': '2026-04-30',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '1551 EAST 53 STREET',
      'Latitude': '40.62057034025',
      'Longitude': '-73.92411688112',
      'Created Date': '2026-04-29',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '1787 EAST 32 STREET',
      'Latitude': '40.61126282519',
      'Longitude': '-73.93797944237',
      'Created Date': '2026-04-28',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '1601 EAST 34 STREET',
      'Latitude': '40.61611717853',
      'Longitude': '-73.94093571108',
      'Created Date': '2026-04-28',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '1447 EAST 65 STREET',
      'Latitude': '40.61948496166',
      'Longitude': '-73.91460135817',
      'Created Date': '2026-04-28',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '1731 EAST 51 STREET',
      'Latitude': '40.61803522351',
      'Longitude': '-73.9257586844',
      'Created Date': '2026-04-28',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '1344 EAST 69 STREET',
      'Latitude': '40.6229232511',
      'Longitude': '-73.91335056697',
      'Created Date': '2026-04-27',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
    {
      'Incident Address': '5013 AVENUE N',
      'Latitude': '40.6189717662',
      'Longitude': '-73.92664375327',
      'Created Date': '2026-04-26',
      'Problem (formerly Complaint Type)': 'Overgrown Tree/Branches',
    },
  ];

  const { Story } = defineMeta({
    title: 'Maps/ComplaintsAddressMap',
    component: ComplaintsAddressMap,
    tags: ['autodocs'],
    argTypes: {
      incidents: {
        control: false,
        description: 'Array of incident records with address, latitude, and longitude',
      },
    },
  });
</script>

<!-- Default: sample incidents with multiple addresses -->
<Story
  name="Default"
  args={{
    incidents: sampleIncidents,
  }}
/>

<!-- Empty: no incidents shown -->
<Story
  name="Empty"
  args={{
    incidents: [],
  }}
/>
