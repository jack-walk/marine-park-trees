import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildDataset } from '$lib/complaints-data.js';

const serverRoot = path.dirname(fileURLToPath(import.meta.url));
const complaintsAllPath = path.resolve(serverRoot, '../../../static/data/complaintsAll.csv');
const complaintsMarineParkPath = path.resolve(
  serverRoot,
  '../../../static/data/complaintsMarinePark.csv'
);

let allDatasetPromise;
let marineParkDatasetPromise;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (char === '\r') {
      // Ignore Windows carriage returns.
    } else {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((record) => record.some((value) => value !== ''));
}

async function readDataset(filePath) {
  const text = await readFile(filePath, 'utf8');
  const rows = parseCsv(text);
  const [header, ...body] = rows;

  return body.map((record) =>
    Object.fromEntries(header.map((column, index) => [column, record[index] ?? '']))
  );
}

export async function loadComplaintsAllDataset() {
  if (!allDatasetPromise) {
    allDatasetPromise = readDataset(complaintsAllPath).then(buildDataset);
  }

  return allDatasetPromise;
}

export async function loadMarineParkIncidents() {
  if (!marineParkDatasetPromise) {
    marineParkDatasetPromise = readDataset(complaintsMarineParkPath);
  }

  return marineParkDatasetPromise;
}
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildDataset } from '$lib/complaints-data.js';

const serverRoot = path.dirname(fileURLToPath(import.meta.url));
const complaintsAllPath = path.resolve(serverRoot, '../../../static/data/complaintsAll.csv');
const complaintsMarineParkPath = path.resolve(
  serverRoot,
  '../../../static/data/complaintsMarinePark.csv'
);

let allDatasetPromise;
let marineParkDatasetPromise;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (char === '\r') {
      // Ignore Windows carriage returns.
    } else {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((record) => record.some((value) => value !== ''));
}

async function readDataset(filePath) {
  const text = await readFile(filePath, 'utf8');
  const rows = parseCsv(text);
  const [header, ...body] = rows;

  return body.map((record) =>
    Object.fromEntries(header.map((column, index) => [column, record[index] ?? '']))
  );
}

export async function loadComplaintsAllDataset() {
  if (!allDatasetPromise) {
    allDatasetPromise = readDataset(complaintsAllPath).then(buildDataset);
  }

  return allDatasetPromise;
}

export async function loadMarineParkIncidents() {
  if (!marineParkDatasetPromise) {
    marineParkDatasetPromise = readDataset(complaintsMarineParkPath);
  }

  return marineParkDatasetPromise;
}
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const COMPLAINT_TYPES = [
  'Blocking Street',
  'Clear Street Light',
  'Dead Branches in Tree',
  'Hitting Building',
  'Hitting Power Line',
  'Traffic Sign or Signal Blocked',
];

const serverRoot = path.dirname(fileURLToPath(import.meta.url));
const complaintsAllPath = path.resolve(serverRoot, '../../../static/data/complaintsAll.csv');
const complaintsMarineParkPath = path.resolve(
  serverRoot,
  '../../../static/data/complaintsMarinePark.csv'
);

let allDatasetPromise;
let marineParkDatasetPromise;

function parseCsv(text) {
  const rows = [];
  let row = [];
  import { readFile } from 'node:fs/promises';
  import path from 'node:path';
  import { fileURLToPath } from 'node:url';

  import { buildDataset } from '$lib/complaints-data.js';

  const serverRoot = path.dirname(fileURLToPath(import.meta.url));
  const complaintsAllPath = path.resolve(serverRoot, '../../../static/data/complaintsAll.csv');
  const complaintsMarineParkPath = path.resolve(
    serverRoot,
    '../../../static/data/complaintsMarinePark.csv'
  );

  let allDatasetPromise;
  let marineParkDatasetPromise;

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let inQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const nextChar = text[index + 1];

      if (inQuotes) {
        if (char === '"' && nextChar === '"') {
          cell += '"';
          index += 1;
        } else if (char === '"') {
          inQuotes = false;
        } else {
          cell += char;
        }
        continue;
      }

      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(cell);
        cell = '';
      } else if (char === '\n') {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
      } else if (char === '\r') {
        // Ignore Windows carriage returns.
      } else {
        cell += char;
      }
    }

    if (cell.length || row.length) {
      row.push(cell);
      rows.push(row);
    }

    return rows.filter((record) => record.some((value) => value !== ''));
  }

  async function readDataset(filePath) {
    const text = await readFile(filePath, 'utf8');
    const rows = parseCsv(text);
    const [header, ...body] = rows;

    return body.map((record) =>
      Object.fromEntries(header.map((column, index) => [column, record[index] ?? '']))
    );
  }

  export async function loadComplaintsAllDataset() {
    if (!allDatasetPromise) {
      allDatasetPromise = readDataset(complaintsAllPath).then(buildDataset);
    }

    return allDatasetPromise;
  }

  export async function loadMarineParkIncidents() {
    if (!marineParkDatasetPromise) {
      marineParkDatasetPromise = readDataset(complaintsMarineParkPath);
    }

    return marineParkDatasetPromise;
  }
    neighborhood: String(rawRow.Neighborhood ?? '').trim(),
