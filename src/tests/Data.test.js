import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import BigNumber from '$lib/components/Data/BigNumber.svelte';
import { buildDataset, parseCsv, searchComplaintDataset } from '$lib/complaints-data.js';

const complaintsAllPath = path.resolve('static/data/complaintsAll.csv');
const complaintsAllCsv = readFileSync(complaintsAllPath, 'utf8');
const [header, ...rows] = parseCsv(complaintsAllCsv.trim());
const complaintsAllRows = rows.map((row) =>
  Object.fromEntries(header.map((column, index) => [column, row[index] ?? '']))
);
const dataset = buildDataset(complaintsAllRows);

describe('BigNumber', () => {
  it('renders the number and label', () => {
    render(BigNumber, { props: { number: '42%', label: 'Approval Rating' } });
    expect(screen.getByText('42%')).toBeTruthy();
    expect(screen.getByText('Approval Rating')).toBeTruthy();
  });

  it('renders a footnote when provided', () => {
    render(BigNumber, {
      props: {
        number: '$1.2M',
        label: 'Total Budget',
        footnote: 'As of 2024',
      },
    });
    expect(screen.getByText('As of 2024')).toBeTruthy();
  });

  it('does not render a footnote when omitted', () => {
    const { container } = render(BigNumber, {
      props: { number: '100', label: 'Count' },
    });
    expect(container.querySelector('.footnote')).toBeNull();
  });
});

describe('complaints data', () => {
  it('computes the exact overall complaint totals', () => {
    expect(dataset.rowCount).toBe(176);
    expect(dataset.totalComplaints).toBe(116215);
    expect(dataset.complaintTotals['Hitting Building']).toBe(41881);
    expect(dataset.complaintTotals['Hitting Power Line']).toBe(24467);
    expect(dataset.complaintTotals['Blocking Street']).toBe(22763);
  });

  it('finds the exact Marine Park zip code row', () => {
    const result = searchComplaintDataset(dataset, '11234');

    expect(result).toBeTruthy();
    expect(result.summaryLabel).toBe('Zip Code 11234');
    expect(result.summaryTotalComplaints).toBe(2629);
    expect(result.summaryRank.value).toBe('#3 of 174');
    expect(result.groups[0].rows[0].complaintCounts['Hitting Power Line']).toBe(1238);
    expect(result.groups[0].rows[0].complaintCounts['Hitting Building']).toBe(0);
  });

  it('aggregates neighborhood matches precisely', () => {
    const result = searchComplaintDataset(dataset, 'Flatbush');

    expect(result).toBeTruthy();
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].rows).toHaveLength(4);
    expect(result.summaryTotalComplaints).toBe(5473);
    expect(result.summaryRank.value).toBe('#5 of 43');
  });
});
