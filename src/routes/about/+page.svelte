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

<ButtonPair buttons={backButtons} className="back-button-wrap" />

<div class="data-container">
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
  .back-button-wrap {
    margin-top: 30px;
  }

  .data-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
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