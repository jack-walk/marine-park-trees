import {
  buildAboutData,
} from '$lib/complaints-data.js';
import {
  loadComplaintsAllDataset,
  loadMarineParkIncidents,
} from '$lib/server/complaints-data-loader.js';

export async function load() {
  const [dataset, marineParkIncidents] = await Promise.all([
    loadComplaintsAllDataset(),
    loadMarineParkIncidents(),
  ]);

  return {
    dataset: {
      ...dataset,
      marineParkIncidents,
    },
    aboutData: buildAboutData(dataset, marineParkIncidents),
  };
}
