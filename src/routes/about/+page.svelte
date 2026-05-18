<script>
  import { base } from '$app/paths';
  import ButtonPair from '$lib/components/Layout/ButtonPair.svelte';
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
  <title>Data Analysis</title>
</svelte:head>

<div class="data-container">
  <ButtonPair buttons={backButtons} className="back-button-wrap" />

  <div class="data-section">
    <h2>Why Marine Park?</h2>
    <p>
      The zip code centered on Marine Park, 11234, records <strong>{formatComplaintValue(data.aboutData.marineParkRow.totalComplaints)}</strong> tree complaints in complaintsAll.csv, placing it <strong>#{data.aboutData.marineParkRow.rank}</strong> citywide among {data.dataset.rankedRows.length} zip code rows.
    </p>
    <p>
      That total is dominated by power-line complaints: the zip recorded <strong>{formatComplaintValue(data.aboutData.marineParkRow.complaintCounts['Hitting Power Line'])}</strong> reports in that category, while {formatComplaintTypeLabel('Hitting Building')} was recorded as <strong>{formatComplaintValue(data.aboutData.marineParkRow.complaintCounts['Hitting Building'])}</strong>.
    </p>
  </div>

  <div class="data-section">
    <h2>Key Findings</h2>

    <div class="stat">
      <div class="stat-label">Marine Park Zip Code 11234</div>
      <div>{formatComplaintValue(data.aboutData.marineParkRow.totalComplaints)} complaints</div>
    </div>

    <div class="stat">
      <div class="stat-label">Citywide rank</div>
      <div>#{data.aboutData.marineParkRow.rank} of {data.dataset.rankedRows.length}</div>
    </div>

    <div class="stat">
      <div class="stat-label">Share of all complaints</div>
      <div>{formatComplaintPercentage(data.aboutData.marineParkShare)}</div>
    </div>

    <p style="margin-top: 20px;">
      Across the full dataset, <strong>{formatComplaintTypeLabel(data.aboutData.topComplaintType)}</strong> is the most common complaint type.
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
        {#each data.dataset.complaintTypes as complaintType}
          <tr>
            <td>{formatComplaintTypeLabel(complaintType)}</td>
            <td>{formatComplaintValue(data.aboutData.overallComplaintTotals[complaintType])}</td>
            <td>{formatComplaintPercentage(data.aboutData.overallComplaintPercentages[complaintType])}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="data-section">
    <h2>Neighborhoods with Highest Complaints</h2>
    <table>
      <thead>
        <tr>
          <th>Zip Code</th>
          <th>Neighborhood</th>
          <th>Borough</th>
          <th>Total Complaints</th>
        </tr>
      </thead>
      <tbody>
        {#each data.aboutData.topRows as row}
          <tr>
            <td>{row.zipCode}</td>
            <td>{row.neighborhood}</td>
            <td>{row.borough}</td>
            <td>{formatComplaintValue(row.totalComplaints)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="data-section">
    <h2>Methodology</h2>
    <p>
      complaintsAll.csv contains one row per zip code and neighborhood label. The compare page searches that file directly, matches a 5-digit zip code exactly, and matches neighborhood names by normalized text so the returned counts are based on the rows that actually match the query.
    </p>
    <p>
      Missing values labeled Data Not Available are excluded from the totals and percentages shown on this page. The incident-level complaintsMarinePark.csv file is also loaded for narrative context and contains {formatComplaintValue(data.aboutData.marineParkIncidentCount)} records.
    </p>
  </div>

  <div class="data-section">
    <h2>Data Quality Notes</h2>
    <ul>
      <li>Totals are calculated from the numeric values in complaintsAll.csv; rows with missing totals are not ranked.</li>
      <li>Category percentages are computed against the full summed complaint total of {formatComplaintValue(data.dataset.totalComplaints)} complaints.</li>
      <li>Marine Park’s 11234 row is the exact source for the story’s neighborhood-specific figures.</li>
      <li>Search results are exact for zip codes and text-normalized for neighborhood names, so no complaint counts are guessed or modeled.</li>
    </ul>
  </div>
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