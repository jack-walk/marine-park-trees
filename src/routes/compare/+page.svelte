<script>
  import { base } from '$app/paths';
  import ButtonPair from '$lib/components/Layout/ButtonPair.svelte';
  import {
    COMPLAINT_TYPES,
    formatComplaintPercentage,
    formatComplaintValue,
    normalizeText,
    searchComplaintDataset,
  } from '$lib/complaints-data.js';

  const backButtons = [
    {
      label: '← Back to Article',
      href: `${base}/`,
      className: 'back-btn',
    },
  ];

  let { data } = $props();

  let query = $state('');
  let submittedQuery = $state('');

  const searchResult = $derived(searchComplaintDataset(data.dataset, submittedQuery));

  const suggestions = $derived.by(() => {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      return [];
    }

    const seen = new Set();
    const matches = [];

    for (const row of data.dataset.rows) {
      if (!row.searchableText.includes(normalizedQuery)) {
        continue;
      }

      if (seen.has(row.zipCode)) {
        continue;
      }

      seen.add(row.zipCode);
      matches.push({
        value: row.zipCode,
        label: `Zip Code ${row.zipCode}`,
        detail: `${row.neighborhood} • ${row.borough}`,
      });

      if (matches.length === 6) {
        break;
      }
    }

    return matches;
  });

  function submitSearch(value = query) {
    submittedQuery = value.trim();
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitSearch(query);
  }

  function selectSuggestion(value) {
    query = value;
    submitSearch(value);
  }

  function complaintPercent(count, total) {
    if (!Number.isFinite(count) || !Number.isFinite(total) || total === 0) {
      return null;
    }

    return (count / total) * 100;
  }

  function complaintWidth(count, total) {
    const percentage = complaintPercent(count, total);
    return percentage == null ? 0 : percentage;
  }
</script>

<svelte:head>
  <title>Compare Neighborhoods and Zip Codes - Tree Complaints</title>
</svelte:head>

<div class="zip-comparison-tool">
  <ButtonPair buttons={backButtons} className="back-button-wrap" />

  <h1>View tree complaints in your zip code</h1>
  <p>
    See how many 311 complaints over tree maintenance issues have been filed where you live since 2020.
  </p>

  <form class="search-section" onsubmit={handleSubmit}>
    <label for="zip-code-input">Enter your zip code Or neighborhood.</label>
    <div class="search-input-wrap">
      <input
        type="text"
        id="zip-code-input"
        class="zip-code-input"
        placeholder="e.g., 11234 or Marine Park"
        autocomplete="off"
        bind:value={query}
      />

      {#if suggestions.length}
        <div class="suggestions-box">
          {#each suggestions as suggestion (suggestion.value)}
            <button
              type="button"
              class="suggestion-item"
              onclick={() => selectSuggestion(suggestion.value)}
            >
              <span class="suggestion-item-topline">
                <span class="suggestion-item-label">{suggestion.label}</span>
              </span>
              <span class="suggestion-item-detail">{suggestion.detail}</span>
            </button>
          {/each}
        </div>
      {/if}
    </div>
    <button id="search-btn" class="search-btn" type="submit">Search</button>
  </form>

  {#if searchResult}
    <div class="results-section">
      <div class="results-content">
        <section class="zip-result-card zip-result-card--summary">
          <div class="zip-result-summary">
            <div>
              <div class="zip-result-kicker">Search summary</div>
              <h2 class="zip-result-title">{searchResult.summaryLabel}</h2>
              <p class="zip-result-subtitle">{searchResult.summarySubtitle}</p>
            </div>

            <div class="zip-result-meta">
              <div class="zip-result-total">{formatComplaintValue(searchResult.summaryTotalComplaints)}</div>
              <div class="zip-result-meta-label">Total complaints</div>
              {#if searchResult.summaryRank}
                <div class="zip-result-meta-rank">{searchResult.summaryRank.value}</div>
                <div class="zip-result-meta-rank">{searchResult.summaryRank.detail}</div>
              {/if}
            </div>
          </div>

          {#if searchResult.summaryTags.length}
            <div class="result-tags">
              {#each searchResult.summaryTags.slice(0, 6) as tag (tag)}
                <span class="result-tag">{tag}</span>
              {/each}
            </div>
          {/if}

          <p class="search-summary-note">{searchResult.summaryNote}</p>

          <div class="complaints-by-type">
            <h3>Complaints by Type</h3>
            <div class="complaints-list">
              {#each COMPLAINT_TYPES as complaintType}
                {@const count = searchResult.summaryComplaintCounts[complaintType]}
                {@const width = complaintWidth(count, searchResult.summaryTotalComplaints)}

                <div class="complaint-section-card">
                  <div class="complaint-section-header">
                    <span class="complaint-section-title">{complaintType}</span>
                    <span class="complaint-section-total">
                      {#if Number.isFinite(count)}
                        {formatComplaintValue(count)} complaints
                        ({formatComplaintPercentage(complaintPercent(count, searchResult.summaryTotalComplaints))})
                      {:else}
                        Data not available
                      {/if}
                    </span>
                  </div>

                  <div class="complaint-type-bar">
                    <div class="complaint-type-bar-fill" style={`width: ${width}%`}></div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </section>

        {#if searchResult.groups.length > 1}
          <div class="search-results-list">
            {#each searchResult.groups as group (group.key)}
              <section class="zip-result-card zip-result-card--nested">
                <div class="zip-result-summary">
                  <div>
                    <div class="zip-result-kicker">
                      {group.rows.length > 1 ? 'Neighborhood group' : 'Zip code row'}
                    </div>
                    <h3 class="zip-result-title">{group.label}</h3>
                    <p class="zip-result-subtitle">{group.subtitle}</p>
                  </div>

                  <div class="zip-result-meta">
                    <div class="zip-result-total">{formatComplaintValue(group.totalComplaints)}</div>
                    <div class="zip-result-meta-label">Complaints</div>
                    {#if group.rank}
                      <div class="zip-result-meta-rank">{group.rank.value}</div>
                      <div class="zip-result-meta-rank">{group.rank.detail}</div>
                    {/if}
                  </div>
                </div>

                <div class="complaints-by-type">
                  <h3>Complaints by Type</h3>
                  <div class="complaints-list">
                    {#each COMPLAINT_TYPES as complaintType}
                      {@const count = group.complaintCounts[complaintType]}
                      {@const width = complaintWidth(count, group.totalComplaints)}

                      <div class="complaint-section-card">
                        <div class="complaint-section-header">
                          <span class="complaint-section-title">{complaintType}</span>
                          <span class="complaint-section-total">
                            {#if Number.isFinite(count)}
                              {formatComplaintValue(count)} complaints
                              ({formatComplaintPercentage(complaintPercent(count, group.totalComplaints))})
                            {:else}
                              Data not available
                            {/if}
                          </span>
                        </div>

                        <div class="complaint-type-bar">
                          <div class="complaint-type-bar-fill" style={`width: ${width}%`}></div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>

                {#if group.rows.length > 1}
                  <div class="zip-breakdown">
                    <h3>Zip Code Breakdown</h3>
                    {#each group.rows as row (row.zipCode)}
                      <div class="complaint-section-card">
                        <div class="complaint-section-header">
                          <span class="complaint-section-title">Zip Code {row.zipCode}</span>
                          <span class="complaint-section-total">
                            {formatComplaintValue(row.totalComplaints)} complaints
                          </span>
                        </div>

                        <div class="complaint-subitems">
                          {#each COMPLAINT_TYPES as complaintType}
                            <div class="complaint-subitem">
                              <span class="complaint-subitem-label">{complaintType}</span>
                              <span class="complaint-subitem-value">
                                {formatComplaintValue(row.complaintCounts[complaintType])}
                              </span>
                            </div>
                          {/each}
                        </div>
                      </div>
                    {/each}
                  </div>
                {/if}
              </section>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {:else if submittedQuery}
    <div class="no-results-section">
      <p>No data found for this zip code or neighborhood. Please try another search.</p>
    </div>
  {:else}
    <div class="search-help">
      Start with a 5-digit zip code like 11234, or type a neighborhood name like Marine Park.
    </div>
  {/if}
</div>

<style lang="scss">
  .zip-comparison-tool {
    margin-top: 24px;
  }

  .search-help {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
    color: #666;
    font-style: italic;
  }
</style>
