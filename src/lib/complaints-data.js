const COMPLAINT_TYPES = [
  'Blocking Street',
  'Clear Street Light',
  'Dead Branches in Tree',
  'Hitting Building',
  'Hitting Power Line',
  'Traffic Sign or Signal Blocked',
];

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

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function normalizeZip(value) {
  return String(value ?? '').replace(/\D/g, '').trim();
}

function parseNumber(value) {
  if (value == null) {
    return null;
  }

  const trimmed = String(value).trim();

  if (!trimmed || trimmed === 'Data Not Available') {
    return null;
  }

  const parsed = Number(trimmed.replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatPercentage(value) {
  return `${value.toFixed(1)}%`;
}

function buildComplaintCounts(row) {
  return Object.fromEntries(
    COMPLAINT_TYPES.map((type) => [type, parseNumber(row[type])])
  );
}

function createRowRecord(rawRow) {
  const totalComplaints = parseNumber(rawRow['Total Complaints']);

  return {
    zipCode: String(rawRow['Zip Code'] ?? '').trim(),
    neighborhood: String(rawRow.Neighborhood ?? '').trim(),
    borough: String(rawRow.Borough ?? '').trim(),
    totalComplaints,
    complaintCounts: buildComplaintCounts(rawRow),
    raw: rawRow,
    searchableText: normalizeText([rawRow['Zip Code'], rawRow.Neighborhood].join(' ')),
  };
}

function aggregateRows(rows) {
  const complaintCounts = Object.fromEntries(COMPLAINT_TYPES.map((type) => [type, 0]));
  let totalComplaints = 0;
  let rowCount = 0;

  for (const row of rows) {
    rowCount += 1;

    if (Number.isFinite(row.totalComplaints)) {
      totalComplaints += row.totalComplaints;
    }

    for (const type of COMPLAINT_TYPES) {
      const value = row.complaintCounts[type];
      if (Number.isFinite(value)) {
        complaintCounts[type] += value;
      }
    }
  }

  return {
    rowCount,
    totalComplaints,
    complaintCounts,
  };
}

function percentOf(part, whole) {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) {
    return null;
  }

  return (part / whole) * 100;
}

function rankLabel(rank, total, noun) {
  if (!Number.isFinite(rank) || !Number.isFinite(total) || rank < 1 || total < 1) {
    return null;
  }

  const suffix = total === 1 ? '' : 's';
  const percentage = (rank / total) * 100;

  return {
    value: `#${rank} of ${total}`,
    detail: `Top ${percentage.toFixed(1)}% among ${noun}${suffix}`,
  };
}

function buildDataset(rawRows) {
  const rows = rawRows.map(createRowRecord);
  const rowsWithTotals = rows.filter((row) => Number.isFinite(row.totalComplaints));
  const complaintTotals = Object.fromEntries(COMPLAINT_TYPES.map((type) => [type, 0]));

  let totalComplaints = 0;

  for (const row of rowsWithTotals) {
    totalComplaints += row.totalComplaints;

    for (const type of COMPLAINT_TYPES) {
      const value = row.complaintCounts[type];
      if (Number.isFinite(value)) {
        complaintTotals[type] += value;
      }
    }
  }

  const rankedRows = [...rowsWithTotals].sort((left, right) => {
    if (right.totalComplaints !== left.totalComplaints) {
      return right.totalComplaints - left.totalComplaints;
    }

    return left.zipCode.localeCompare(right.zipCode);
  });

  rankedRows.forEach((row, index) => {
    row.rank = index + 1;
  });

  const neighborhoodGroupsMap = new Map();

  for (const row of rows) {
    const key = normalizeText(row.neighborhood);
    if (!key) {
      continue;
    }

    if (!neighborhoodGroupsMap.has(key)) {
      neighborhoodGroupsMap.set(key, {
        key,
        label: row.neighborhood,
        borough: row.borough,
        rows: [],
        totalComplaints: 0,
        complaintCounts: Object.fromEntries(COMPLAINT_TYPES.map((type) => [type, 0])),
      });
    }

    const group = neighborhoodGroupsMap.get(key);
    group.rows.push(row);

    if (Number.isFinite(row.totalComplaints)) {
      group.totalComplaints += row.totalComplaints;
    }

    for (const type of COMPLAINT_TYPES) {
      const value = row.complaintCounts[type];
      if (Number.isFinite(value)) {
        group.complaintCounts[type] += value;
      }
    }
  }

  const neighborhoodGroups = [...neighborhoodGroupsMap.values()].sort((left, right) => {
    if (right.totalComplaints !== left.totalComplaints) {
      return right.totalComplaints - left.totalComplaints;
    }

    return left.label.localeCompare(right.label);
  });

  neighborhoodGroups.forEach((group, index) => {
    group.rank = index + 1;
  });

  const boroughTotals = Object.fromEntries(
    [...new Set(rows.map((row) => row.borough).filter(Boolean))].map((borough) => [
      borough,
      0,
    ])
  );

  for (const row of rowsWithTotals) {
    boroughTotals[row.borough] = (boroughTotals[row.borough] ?? 0) + row.totalComplaints;
  }

  const complaintTypePercentages = Object.fromEntries(
    COMPLAINT_TYPES.map((type) => [type, percentOf(complaintTotals[type], totalComplaints)])
  );

  return {
    rows,
    rowsWithTotals,
    complaintTypes: COMPLAINT_TYPES,
    complaintTotals,
    complaintTypePercentages,
    totalComplaints,
    rowCount: rows.length,
    rankedRows,
    neighborhoodGroups,
    boroughTotals,
    topRows: rankedRows.slice(0, 5),
    marineParkRow: rows.find((row) => row.zipCode === '11234') ?? null,
  };
}

function formatComplaintValue(value) {
  return Number.isFinite(value) ? value.toLocaleString('en-US') : 'Data not available';
}

function formatComplaintPercentage(value) {
  return Number.isFinite(value) ? formatPercentage(value) : 'Data not available';
}

function searchComplaintDataset(dataset, query) {
  const trimmed = String(query ?? '').trim();
  const zipCode = normalizeZip(trimmed);
  const normalizedQuery = normalizeText(trimmed);

  if (!trimmed) {
    return null;
  }

  if (zipCode.length === 5) {
    const row = dataset.rows.find((entry) => entry.zipCode === zipCode);

    if (!row) {
      return null;
    }

    const zipRankLabel = rankLabel(row.rank, dataset.rankedRows.length, 'zip code row');

    return {
      mode: 'zip',
      query: trimmed,
      summaryLabel: `Zip Code ${row.zipCode}`,
      summarySubtitle: `${row.neighborhood} • ${row.borough}`,
      summaryTags: [row.zipCode, row.neighborhood, row.borough],
      summaryTotalComplaints: row.totalComplaints,
      summaryComplaintCounts: row.complaintCounts,
      summaryRank: zipRankLabel,
      summaryNote: row.rank
        ? 'Exact match for one zip code row.'
        : 'Total complaints available for this zip code row.',
      groups: [
        {
          key: row.zipCode,
          label: `Zip Code ${row.zipCode}`,
          subtitle: `${row.neighborhood} • ${row.borough}`,
          borough: row.borough,
          rank: zipRankLabel,
          rows: [row],
        },
      ],
    };
  }

  const matchedRows = dataset.rows.filter((row) => row.searchableText.includes(normalizedQuery));

  if (!matchedRows.length) {
    return null;
  }

  const matchedGroupsMap = new Map();

  for (const row of matchedRows) {
    const groupKey = normalizeText(row.neighborhood);

    if (!matchedGroupsMap.has(groupKey)) {
      matchedGroupsMap.set(groupKey, []);
    }

    matchedGroupsMap.get(groupKey).push(row);
  }

  const groups = [...matchedGroupsMap.entries()]
    .map(([key, rows]) => {
      const neighborhoodGroup = dataset.neighborhoodGroups.find((group) => group.key === key);
      const aggregate = aggregateRows(rows);
      const rank =
        rows.length === 1
          ? rankLabel(rows[0].rank, dataset.rankedRows.length, 'zip code row')
          : rankLabel(
              neighborhoodGroup?.rank,
              dataset.neighborhoodGroups.length,
              'neighborhood group'
            );

      return {
        key,
        label: neighborhoodGroup?.label ?? rows[0].neighborhood,
        subtitle: `${rows[0].borough}${rows.length > 1 ? ` • ${rows.length} zip codes` : ''}`,
        borough: rows[0].borough,
        rank,
        rows,
        totalComplaints: aggregate.totalComplaints,
        complaintCounts: aggregate.complaintCounts,
      };
    })
    .sort((left, right) => {
      if (right.totalComplaints !== left.totalComplaints) {
        return right.totalComplaints - left.totalComplaints;
      }

      return left.label.localeCompare(right.label);
    });

  const aggregate = aggregateRows(matchedRows);
  const summaryRank = groups.length === 1 ? groups[0].rank : null;

  return {
    mode: 'search',
    query: trimmed,
    summaryLabel: `Search results for “${trimmed}”`,
    summarySubtitle:
      groups.length === 1
        ? `${groups[0].label} • ${groups[0].borough}`
        : `${groups.length} matching neighborhood${groups.length === 1 ? '' : 's'}`,
    summaryTags: Array.from(
      new Set(matchedRows.flatMap((row) => [row.zipCode, row.neighborhood, row.borough]))
    ),
    summaryTotalComplaints: aggregate.totalComplaints,
    summaryComplaintCounts: aggregate.complaintCounts,
    summaryRank,
    summaryNote:
      groups.length === 1
        ? 'Exact neighborhood match.'
        : `${matchedRows.length} zip code rows matched this search.`,
    groups,
  };
}

function buildAboutData(dataset, marineParkIncidents = []) {
  const marineParkRow = dataset.marineParkRow;
  const marineParkShare = percentOf(marineParkRow?.totalComplaints ?? null, dataset.totalComplaints);
  const topComplaintType = dataset.complaintTypes.reduce((bestType, type) => {
    if (!bestType) {
      return type;
    }

    return dataset.complaintTotals[type] > dataset.complaintTotals[bestType] ? type : bestType;
  }, null);

  return {
    marineParkRow,
    marineParkShare,
    topComplaintType,
    marineParkIncidentCount: marineParkIncidents.length,
    overallComplaintPercentages: dataset.complaintTypePercentages,
    overallComplaintTotals: dataset.complaintTotals,
    topRows: dataset.topRows,
    boroughTotals: dataset.boroughTotals,
  };
}

export {
  COMPLAINT_TYPES,
  aggregateRows,
  buildAboutData,
  buildDataset,
  formatComplaintPercentage,
  formatComplaintValue,
  normalizeText,
  normalizeZip,
  parseCsv,
  parseNumber,
  percentOf,
  rankLabel,
  searchComplaintDataset,
};
