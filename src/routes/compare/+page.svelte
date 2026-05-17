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
  <title>Compare Neighborhoods and Zip Codes - Tree Complaints</title>
</svelte:head>

<div class="zip-comparison-tool">
  <ButtonPair buttons={backButtons} className="back-button-wrap" />

  <h1>Compare Complaints by Neighborhood or Zip Code</h1>
  <p>
    Search by a 5-digit zip code or neighborhood name to see total tree complaints,
    complaint breakdowns, and how the area ranks citywide.
  </p>

  <div class="search-section">
    <label for="zip-code-input">Enter Your Zip Code or Neighborhood:</label>
    <div class="search-input-wrap">
      <input
        type="text"
        id="zip-code-input"
        class="zip-code-input"
        placeholder="e.g., 11203 or Marine Park"
        autocomplete="off"
      />
      <div id="suggestions-box" class="suggestions-box" style="display:none;"></div>
    </div>
    <button id="search-btn" class="search-btn" type="button">Search</button>
  </div>

  <div id="results-section" class="results-section">
    <div class="results-content">
      <h2 id="zip-code-header">Zip Code 11203</h2>
      <p id="result-subheader" class="result-subheader">Marine Park • Brooklyn</p>
      <div id="result-tags" class="result-tags">
        <span class="result-tag">11203</span>
        <span class="result-tag">Marine Park</span>
        <span class="result-tag">Brooklyn</span>
      </div>

      <div class="result-card total-complaints">
        <div class="result-label">Total Tree Complaints</div>
        <div id="total-complaints" class="result-value">1,245</div>
      </div>

      <div class="result-card ranking">
        <div class="result-label">City Ranking</div>
        <div id="ranking-value" class="result-value">#1 of 7</div>
        <div id="ranking-detail" class="result-detail">Top 14.3% among zip codes</div>
      </div>

      <div class="complaints-by-type">
        <h3>Complaints by Type</h3>
        <div id="complaints-list" class="complaints-list">
          <div class="complaint-section-card">
            <div class="complaint-section-header">
              <span class="complaint-section-title">Blocking Street</span>
              <span class="complaint-section-total">312 complaints (25.1%)</span>
            </div>
            <div class="complaint-type-bar">
              <div class="complaint-type-bar-fill" style="width: 25.1%"></div>
            </div>
          </div>

          <div class="complaint-section-card">
            <div class="complaint-section-header">
              <span class="complaint-section-title">Dead Branches in Tree</span>
              <span class="complaint-section-total">284 complaints (22.8%)</span>
            </div>
            <div class="complaint-type-bar">
              <div class="complaint-type-bar-fill" style="width: 22.8%"></div>
            </div>
          </div>

          <div class="complaint-section-card">
            <div class="complaint-section-header">
              <span class="complaint-section-title">Clear Street Light</span>
              <span class="complaint-section-total">Data Not Available</span>
            </div>
            <div class="complaint-type-bar">
              <div class="complaint-type-bar-fill" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>

      <button id="search-again-btn" class="search-again-btn" type="button">
        Search Another Neighborhood or Zip Code
      </button>
    </div>
  </div>

  <div id="error-section" class="error-section" style="display:none;">
    <p id="error-message"></p>
  </div>

  <div id="no-results-section" class="no-results-section" style="display:none;">
    <p id="no-results-message">No data found for this neighborhood or zip code. Please try another.</p>
  </div>
</div>

<style lang="scss">
  .results-section {
    display: block;
  }

  .zip-comparison-tool {
    margin-top: 24px;
  }
</style>
