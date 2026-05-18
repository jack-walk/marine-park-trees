<script>
  import { base } from '$app/paths';
  import ButtonPair from '$lib/components/Layout/ButtonPair.svelte';
  import ComplaintsAddressMap from '$lib/components/Maps/ComplaintsAddressMap.svelte';
  import {
    formatComplaintPercentage,
    formatComplaintValue,
    formatComplaintTypeLabel,
  } from '$lib/complaints-data.js';

  let { data } = $props();

  const backButtons = [
    {
      label: '← Back to Article',
      href: `${base}/`,
      className: 'back-btn',
    },
  ];
</script>

<svelte:head>
  <title>About the data</title>
</svelte:head>

<div class="data-container">
  <ButtonPair buttons={backButtons} className="back-button-wrap" />

  <div class="data-section">

    <h2>Repeat offenders</h2>
    <p>
      Since January 2023, 41 addresses in zip code 11234 have had 5 or more complaints over
      tree maintenance issues. Here is a map of some of the trees that have raised the most
      concern from residents.
    </p>
    <h3 class="map-title"><b>Addresses with 5+ complaints since 2023:</b></h3>
    <ComplaintsAddressMap incidents={data.dataset.marineParkIncidents} />

  </div>

  <div class="data-section">
    <h2>Calculating zip code data</h2>
    <p>
      This project uses <a href="https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2020-to-Present/erm2-nwe9/about_data" target="_blank" rel="noreferrer">
        311 service request data</a> to calculate the number of tree maintenance complaints filed in each zip code. The full 
        dataset was filtered to include complaints over tree maintenance filed since 2023, and then was further filtered to
         determine subtypes of each complaint for each zip code. These calculations were used to inform the data visualizations on <a href="/">the main page</a>,
          and the search tool on the <a href="/compare">compare page</a>.
    </p>
  </div>

<section>
	<header>
		<figure class="banner">
			<img
				src={`${base}/photos/wires2.JPG`}
				alt="Wires cut through a large tree."
			/>
			<figcaption class="bannerCaption">Power lines run through a tree. (Photo: Jack Walker)</figcaption>
		</figure>
	</header>
</section>

  <div class="data-section">
    <h2>What if it's one person calling again and again?</h2>
    <p>
      To ensure outliers who frequently called 311 did not skew the dataset, results were filtered by individual address. Few 
      addresses were reported more than 20 times, which indicates a variety of complaints across the board, and fewer instances
      of a single tree garnering an outsized number of complaints, skewing the dataset.
    </p>
  </div>

  <div class="data-section">
    <h2>Why Marine Park?</h2>
    <p>
      Zip code 11234 encompasses the neighborhood of Marine Park, but also all or some of
      the neighborhoods of Mill Basin, Old Mill Basin, Flatlands and Bergen Beach, according
      to a <a href="https://www.nytimes.com/interactive/2023/upshot/extremely-detailed-nyc-neighborhood-map.html">
         neighborhood map</a> by <i>The New York Times</i>.
    </p>
      <p>For this story, I focused on Marine Park because of recent reporting on tree maintenance issues
       there. I used the neighborhood as a stand-in for the wider zip code for ease of
       understanding for general readers. Most issues touched on in this story hold true for
       surrounding areas as well.
    </p>
    </div>

<section>
	<header>
		<figure class="banner">
			<img
				src={`${base}/photos/sidewalk.JPG`}
				alt="Tree roots unearth a sidewalk tile."
			/>
			<figcaption class="bannerCaption">Roots unearth a sidewalk in Marine Park. (Photo: Jack Walker)</figcaption>
		</figure>
	</header>
</section>

</div>

<style lang="scss">
  .data-container {
    max-width: 980px;
    margin: 24px auto 40px;
    padding: 0 20px;
  }

  .data-section {
    margin: 30px 0;
    padding: 20px;
    background-color: #f5f5f5;
    border-left: 4px solid #566500;
  }

  .data-section h2 {
    color: #566500;
    margin-top: 0;
  }

  :global(.back-button-wrap) {
    width: 100%;
    max-width: none;
    margin: 0 0 18px;
    padding: 0;
  }

  .stat {
    font-size: 24px;
    font-weight: bold;
    color: #566500;
    margin: 10px 0;
  }

  .stat-label {
    font-size: 14px;
    color: #666;
  }

  .map-title {
    margin: 18px 0 12px;
    text-align: left;
    color: var(--color-text);
    font-size: var(--font-size-lg);
    line-height: var(--leading-heading);
    font-weight: var(--font-weight-bold);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  table th,
  table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  table th {
    background-color: #566500;
    color: white;
  }

  table tr:hover {
    background-color: #f9f9f9;
  }
</style>
<!--
<script>
  import { base } from '$app/paths';
  import ButtonPair from '$lib/components/Layout/ButtonPair.svelte';

  const backButtons = [
    {
      label: '← Back to Article',
      href: `${base}/`,
      className: 'back-btn',
    },
  ];
</script>

<svelte:head>
  <title>Data Analysis</title>
</svelte:head>

<div class="data-container">
  <ButtonPair buttons={backButtons} className="back-button-wrap" />

  <div class="data-section">
    <h2>Why Marine Park?</h2>
    <p>
      Tktk.
    </p>
  </div>

  <div class="data-section">
    <h2>Key Findings</h2>

    <div class="stat">
      <div class="stat-label">Tktk</div>
      <div>Tktk</div>
    </div>

    <div class="stat">
      <div class="stat-label">Tktk</div>
      <div>Tktk</div>
    </div>

    <div class="stat">
      <div class="stat-label">Tktk</div>
      <div>Tktk</div>
    </div>

    <p style="margin-top: 20px;">
      Tktk.
    </p>
  </div>

  <div class="data-section">
    <h2>Complaints by Category</h2>
    <table>
      <thead>
        <tr>
          <th>Complaint Type</th>
          <th>Count</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="data-section">
    <h2>Neighborhoods with Highest Complaints</h2>
    <table>
      <thead>
        <tr>
          <th>Neighborhood</th>
          <th>Total Complaints</th>
          <th>Avg. Resolution (days)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
        <tr>
          <td>Tktk</td>
          <td>Tktk</td>
          <td>Tktk</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="data-section">
    <h2>Methodology</h2>
    <p>
      Tktk.
    </p>
  </div>

  <div class="data-section">
    <h2>Data Quality Notes</h2>
    <ul>
      <li>Tktk.</li>
      <li>Tktk.</li>
      <li>Tktk.</li>
      <li>Tktk.</li>
    </ul>
  </div>
</div>

<style lang="scss">
  .data-container {
    max-width: 800px;
    margin: 24px auto 40px;
    padding: 0 20px 50px 20px;
  }

  .data-section {
    margin: 30px 0;
    padding: 20px;
    background-color: #f5f5f5;
    border-left: 4px solid #566500;
  }

  .data-section h2 {
    color: #566500;
    margin-top: 0;
  }

  .stat {
    font-size: 24px;
    font-weight: bold;
    color: #566500;
    margin: 10px 0;
  }

  .stat-label {
    font-size: 14px;
    color: #666;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  table th,
  table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  table th {
    background-color: #566500;
    color: white;
  }

  table tr:hover {
    background-color: #f9f9f9;
  }
</style>
-->