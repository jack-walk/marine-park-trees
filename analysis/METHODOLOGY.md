# Methodology — Tree Overgrowth 311 Complaint Analysis

## Overview
This methodology document pertains to two Jupyter notebook files:

- `Tree Overgrowth Data.ipynb` — analyzing the total number of complaints across neighborhoods, time periods, addresses, complaint types and more.
- `Complaints-per-tree.ipynb` — analyzing the total number of 311 complaints per tree for each zip code in New York City.

---

## Data

- `static/data/complaintsAll.csv` and `static/data/complaintsMarinePark.csv` — 311 complaint datasets for all tree overgrowth complaints in the city since 2023 and all those in Marine Park since 2023, respectively.

---

## Analysis

1. Import pandas library and load CSV files into dataframes.
2. Identify recent tree-related 311 calls by filtering by complaint type and year.
3. Normalize and clean text columns (e.g., lowercasing, trimming whitespace,
   removing nulls) so grouping and matching are robust.
4. Remove or disregard duplicate 311 calls if many were filed within a short window.
5. Compute total number of tree 311 complaints per zip code by filtering the tree complaint dataset by zip code.
6. Export as a CSV and import into Datawrapper for analysis. Identify most common zip code.
7. Compute complaints per street to determine any hotspot locations for complaints. Visualize using map component in Svelte.
8. Calculate time between opening and closing of each complaint on average per zip code to see how target zip code compares.
9. In a separate notebook, calculate complaints per tree per zip code using tree census data for each zip code to ensure the findings are not simply the result of one zip code having more trees.