import {
  loadComplaintsAllDataset,
} from '$lib/server/complaints-data-loader.js';

export async function load() {
  const dataset = await loadComplaintsAllDataset();

  return {
    dataset,
    sinceDateLabel: 'Jan. 1, 2023',
  };
}
