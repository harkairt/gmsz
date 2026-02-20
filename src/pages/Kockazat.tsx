import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import CollapsibleSection from '../components/CollapsibleSection';
import ExpandableStep from '../components/ExpandableStep';
import { kockazatKezeles, kockazatFelmeres } from '../data/content';

const LABELS = ['K1', 'K2', 'K3', 'K4', 'K5'] as const;
const HIGHLIGHTED_CELLS: [number, number][] = [
  [0, 3], // K1 sor, K4 oszlop
  [3, 1], // K4 sor, K2 oszlop
  [1, 0], // K2 sor, K1 oszlop
];

function isHighlighted(row: number, col: number) {
  return HIGHLIGHTED_CELLS.some(([r, c]) => r === row && c === col);
}

function RiskMatrix() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const recalc = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const gridRect = grid.getBoundingClientRect();
    setSvgSize({ w: gridRect.width, h: gridRect.height });

    // Find cell centers for highlighted cells
    const centers = HIGHLIGHTED_CELLS.map(([row, col]) => {
      // Grid has 6 columns (1 header + 5 data), 6 rows (1 header + 5 data)
      // Cell index in children: skip header row (6 elements), then for each data row skip the row header
      const cellIndex = (row + 1) * 6 + (col + 1);
      const cell = grid.children[cellIndex] as HTMLElement | undefined;
      if (!cell) return null;
      const cellRect = cell.getBoundingClientRect();
      return {
        x: cellRect.left - gridRect.left + cellRect.width / 2,
        y: cellRect.top - gridRect.top + cellRect.height / 2,
      };
    });

    if (centers.some((c) => !c)) return;
    const pts = centers as { x: number; y: number }[];

    // Connect: 0->1, 1->2, 2->0 (triangle)
    setLines([
      { x1: pts[0].x, y1: pts[0].y, x2: pts[1].x, y2: pts[1].y },
      { x1: pts[1].x, y1: pts[1].y, x2: pts[2].x, y2: pts[2].y },
      { x1: pts[2].x, y1: pts[2].y, x2: pts[0].x, y2: pts[0].y },
    ]);
  }, []);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (gridRef.current) ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, [recalc]);

  return (
    <div className="pt-4">
      <p className="text-text-secondary text-center mb-8">
        {kockazatKezeles.matrix.description}
      </p>

      <div className="relative max-w-2xl mx-auto">
        {/* 6x6 grid: 1 empty corner + 5 col headers, then 5 rows of (header + 5 cells) */}
        <div
          ref={gridRef}
          className="grid gap-1"
          style={{ gridTemplateColumns: 'auto repeat(5, 1fr)' }}
        >
          {/* Corner */}
          <div />
          {/* Column headers */}
          {LABELS.map((label) => (
            <div
              key={`col-${label}`}
              className="text-center text-sm font-semibold text-accent-cyan py-2"
            >
              {label}
            </div>
          ))}

          {/* Data rows */}
          {LABELS.map((rowLabel, rowIdx) => (
            <React.Fragment key={rowLabel}>
              {/* Row header */}
              <div className="text-sm font-semibold text-accent-cyan flex items-center justify-end pr-3">
                {rowLabel}
              </div>
              {/* Cells */}
              {LABELS.map((_colLabel, colIdx) => {
                const isDiag = rowIdx === colIdx;
                const isHl = isHighlighted(rowIdx, colIdx);
                return (
                  <div
                    key={`cell-${rowIdx}-${colIdx}`}
                    className={`
                      aspect-square rounded-md flex items-center justify-center
                      transition-colors duration-200
                      ${isDiag ? 'bg-gray-200 border border-gray-300' : ''}
                      ${isHl ? 'bg-secondary-pink/25 border-2 border-secondary-pink shadow-md shadow-secondary-pink/20' : ''}
                      ${!isDiag && !isHl ? 'bg-background-muted border border-border' : ''}
                    `}
                  >
                    {isHl && (
                      <div className="w-3 h-3 rounded-full bg-secondary-pink" />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* SVG overlay for triangle */}
        {lines.length > 0 && (
          <svg
            className="absolute top-0 left-0 pointer-events-none"
            width={svgSize.w}
            height={svgSize.h}
          >
            {lines.map((line, i) => (
              <motion.path
                key={i}
                d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
                stroke="#DB2777"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="6 4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}

type ColId = 'kockazat' | 'valoszinoseg' | 'hatas' | 'nyersSuly' | 'suly' | 'erosseg';

const RELEVANCE_MAP: Record<string, ColId[]> = {
  nyersSuly: ['valoszinoseg', 'hatas'],
  erosseg: ['valoszinoseg', 'suly'],
  suly: ['nyersSuly'],
};

type SortState = 'none' | 'asc' | 'desc';

function RiskAssessmentTable() {
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [sortState, setSortState] = useState<SortState>('none');

  const highlightedCols = useMemo(() => {
    if (!hoveredCol || !RELEVANCE_MAP[hoveredCol]) return new Set<string>();
    return new Set<string>([hoveredCol, ...RELEVANCE_MAP[hoveredCol]]);
  }, [hoveredCol]);

  const sortedRows = useMemo(() => {
    const rows = [...kockazatFelmeres.rows];
    if (sortState === 'asc') rows.sort((a, b) => a.suly - b.suly);
    if (sortState === 'desc') rows.sort((a, b) => b.suly - a.suly);
    return rows;
  }, [sortState]);

  const cycleSortState = () => {
    setSortState((prev) => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  };

  const sortIcon = sortState === 'asc' ? '▲' : sortState === 'desc' ? '▼' : '⇅';

  const thClass = (col: ColId, extra?: string) =>
    `p-3 text-center text-sm font-medium transition-colors duration-200 ${
      highlightedCols.has(col) ? 'bg-accent-cyan/15 text-accent-cyan' : 'text-text-secondary'
    } ${extra || ''}`;

  const tdHighlight = (col: ColId) =>
    highlightedCols.has(col) ? 'bg-accent-cyan/10' : '';

  const formatCurrency = (value: number) =>
    value.toLocaleString('hu-HU') + ' Ft';

  return (
    <div className="pt-4">
      <p className="text-text-secondary text-center mb-6">
        {kockazatFelmeres.description}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr>
              <th className={thClass('kockazat', 'text-left')}>Kockázat</th>
              <th
                className={thClass('valoszinoseg')}
                onMouseEnter={() => setHoveredCol('valoszinoseg')}
                onMouseLeave={() => setHoveredCol(null)}
              >
                Valószínűség (0–1)
              </th>
              <th
                className={thClass('hatas')}
                onMouseEnter={() => setHoveredCol('hatas')}
                onMouseLeave={() => setHoveredCol(null)}
              >
                Hatás
              </th>
              <th
                className={thClass('nyersSuly')}
                onMouseEnter={() => setHoveredCol('nyersSuly')}
                onMouseLeave={() => setHoveredCol(null)}
              >
                Nyers súly
              </th>
              <th
                className={thClass('suly', 'cursor-pointer select-none')}
                onMouseEnter={() => setHoveredCol('suly')}
                onMouseLeave={() => setHoveredCol(null)}
                onClick={cycleSortState}
              >
                Súly (0–10) <span className="ml-1">{sortIcon}</span>
              </th>
              <th
                className={thClass('erosseg')}
                onMouseEnter={() => setHoveredCol('erosseg')}
                onMouseLeave={() => setHoveredCol(null)}
              >
                Kockázat erőssége
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => {
              const nyersSuly = row.valoszinoseg * row.hatasErtek;
              const erosseg = row.valoszinoseg * row.suly;
              const badgeColor =
                row.suly >= 7
                  ? 'bg-secondary-pink/20 text-secondary-pink'
                  : row.suly >= 3
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-gray-100 text-gray-500';

              return (
                <tr
                  key={row.nev}
                  className={i % 2 === 1 ? 'bg-background-muted/20' : ''}
                >
                  <td className={`p-3 text-sm font-medium text-text-primary ${tdHighlight('kockazat')}`}>
                    {row.nev}
                  </td>
                  <td className={`p-3 text-center text-sm ${tdHighlight('valoszinoseg')}`}>
                    {row.valoszinoseg.toLocaleString('hu-HU')}
                  </td>
                  <td className={`p-3 text-center text-sm ${tdHighlight('hatas')}`}>
                    {row.hatasLabel}
                  </td>
                  <td className={`p-3 text-center text-sm ${tdHighlight('nyersSuly')}`}>
                    {formatCurrency(nyersSuly)}
                  </td>
                  <td className={`p-3 text-center text-sm ${tdHighlight('suly')}`}>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${badgeColor}`}>
                      {row.suly}
                    </span>
                  </td>
                  <td className={`p-3 text-center text-sm font-semibold ${tdHighlight('erosseg')}`}>
                    {erosseg.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-border">
              <td colSpan={6} className="p-3 text-xs text-text-secondary italic">
                Nyers súly = Valószínűség × Hatás (Ft) &nbsp;|&nbsp; Kockázat erőssége = Valószínűség × Súly (0–10)
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default function Kockazat() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Kockázatkezelés</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A kockázatok szisztematikus azonosítása és kezelése a módszertani
            gondolkodás segítségével.
          </p>
        </motion.div>

        {/* Process flow - collapsible with expandable steps inside */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <CollapsibleSection title={kockazatKezeles.title} defaultOpen={false}>
            <div className="pt-4 space-y-3">
              {kockazatKezeles.steps.map((step, index) => (
                <ExpandableStep
                  key={index}
                  stepNumber={index + 1}
                  title={step.split(' - ')[0] || step}
                  description={step.split(' - ')[1] || step}
                  defaultOpen={false}
                />
              ))}
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Risk assessment table - collapsible section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16"
        >
          <CollapsibleSection title={kockazatFelmeres.title} defaultOpen={false}>
            <RiskAssessmentTable />
          </CollapsibleSection>
        </motion.div>

        {/* Risk matrix - collapsible section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <CollapsibleSection title={kockazatKezeles.matrix.title} defaultOpen={false}>
            <RiskMatrix />
          </CollapsibleSection>
        </motion.div>

        {/* Key takeaway - always visible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </PageTransition>
  );
}
