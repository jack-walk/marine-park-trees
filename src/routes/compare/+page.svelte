<script>
  import { base } from '$app/paths';
  import ButtonPair from '$lib/components/Layout/ButtonPair.svelte';
  import {
    COMPLAINT_TYPES,
    formatComplaintPercentage,
    formatComplaintValue,
    formatComplaintTypeLabel,
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
    }

    return matches;
  });

  function submitSearch(value = query) {
    submittedQuery = value.trim();
  }

  function selectSuggestion(value) {
    query = value;
    submitSearch(value);
  }

  $effect(() => {
    if (submittedQuery && normalizeText(query) !== normalizeText(submittedQuery)) {
      submittedQuery = '';
    }
  });

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

  function availableComplaintTypes(row) {
    return COMPLAINT_TYPES.filter((type) => Number.isFinite(row.complaintCounts[type]));
  }
</script>

<svelte:head>
  <title>Compare tree complaints by NYC zip code</title>
</svelte:head>

<div class="zip-comparison-tool">
  <ButtonPair buttons={backButtons} className="back-button-wrap" />

  <h1>How does my neighborhood compare?</h1>
  <p>
    Zip code 11234, which includes the neighborhood of Marine Park, files more 311 complaints 
    <a href="https://jack-walk.github.io/marine-park-trees/">over tree maintenance issues</a> 
    than any other neighborhood in New York City. See how many tree complaints your neighborhood has filed with the city's 311 service line since 2020.
  </p>

  <div class="search-section">
    <label for="zip-code-input">Enter your zip code or neighborhood.</label>
    <div class="search-input-wrap">
      <input
        type="text"
        id="zip-code-input"
        class="zip-code-input"
        placeholder="e.g., 11234 or Marine Park"
        autocomplete="off"
        bind:value={query}
      />

      {#if suggestions.length && !submittedQuery}
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
  </div>

  {#if searchResult}
    <div class="results-section">
      <div class="results-content">
        <section class="zip-result-card zip-result-card--summary">
          <div class="zip-result-summary">
            <div>
              <div class="zip-result-kicker">Your Zip Code</div>
              <h2 class="zip-result-title">{searchResult.summaryLabel}</h2>
            </div>

            <div class="zip-result-meta">
              <div class="zip-result-total">{formatComplaintValue(searchResult.summaryTotalComplaints)}</div>
              <div class="zip-result-meta-label">Total complaints</div>
              <div class="zip-result-meta-since">since {data.sinceDateLabel}</div>
            </div>
          </div>

          {#if searchResult.summaryTags.length}
            <div class="result-tags">
              {#each searchResult.summaryTags.slice(0, 6) as tag (tag)}
                <span class="result-tag">{tag}</span>
              {/each}
            </div>
          {/if}

          <div class="complaints-by-type">
            <h3>Complaints by Type</h3>
            <div class="complaints-list">
              {#each COMPLAINT_TYPES as complaintType}
                {@const count = searchResult.summaryComplaintCounts[complaintType]}
                {@const width = complaintWidth(count, searchResult.summaryTotalComplaints)}

                <div class="complaint-section-card">
                  <div class="complaint-section-header">
                    <span class="complaint-section-title">{formatComplaintTypeLabel(complaintType)}</span>
                    <span class="complaint-section-total">
                      {#if Number.isFinite(count)}
                        {formatComplaintValue(count)} complaints
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

          <p class="zip-result-citation">
            Figures from New York City&rsquo;s database of <a href="https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2020-to-Present/erm2-nwe9/about_data" target="_blank" rel="noreferrer">311 service requests</a>. Complaints were filed between Jan. 1, 2023 and May 4, 2026.
          </p>
        </section>

        {#if searchResult.groups.length > 1}
          <div class="search-results-list">
            {#each searchResult.groups as group (group.key)}
              <section class="zip-result-card zip-result-card--nested">
                <div class="zip-result-summary">
                  <div>
                    <div class="zip-result-kicker">
                      {group.rows.length > 1 ? 'Your neighborhood' : 'Zip code row'}
                    </div>
                    <h3 class="zip-result-title">{group.label}</h3>
                  </div>

                  <div class="zip-result-meta">
                    <div class="zip-result-total">{formatComplaintValue(group.totalComplaints)}</div>
                    <div class="zip-result-meta-label">Total complaints</div>
                    <div class="zip-result-meta-since">since {data.sinceDateLabel}</div>
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
                          <span class="complaint-section-title">{formatComplaintTypeLabel(complaintType)}</span>
                          <span class="complaint-section-total">
                            {#if Number.isFinite(count)}
                              {formatComplaintValue(count)} complaints
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
                      {@const visibleComplaintTypes = availableComplaintTypes(row)}

                      {#if visibleComplaintTypes.length}
                        <div class="complaint-section-card">
                          <div class="complaint-section-header">
                            <span class="complaint-section-title">Zip Code {row.zipCode}</span>
                            <span class="complaint-section-total">
                              {formatComplaintValue(row.totalComplaints)} complaints
                            </span>
                          </div>

                          <div class="complaint-subitems">
                            {#each visibleComplaintTypes as complaintType}
                              <div class="complaint-subitem">
                                <span class="complaint-subitem-label">{formatComplaintTypeLabel(complaintType)}</span>
                                <span class="complaint-subitem-value">
                                  {formatComplaintValue(row.complaintCounts[complaintType])}
                                </span>
                              </div>
                            {/each}
                          </div>
                        </div>
                      {:else}
                        <div class="complaint-section-card complaint-section-card--no-data">
                          <div class="complaint-section-header">
                            <span class="complaint-section-title">Zip Code {row.zipCode}</span>
                            <span class="complaint-section-total no-data">Data not available</span>
                          </div>
                        </div>
                      {/if}
                    {/each}
                  </div>
                {/if}

                <p class="zip-result-citation">
                  Figures from New York City&rsquo;s database of <a href="https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2020-to-Present/erm2-nwe9/about_data" target="_blank" rel="noreferrer">311 service requests</a> filed between Jan. 1, 2023 and May 4, 2026.
                </p>
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
  {/if}
</div>
