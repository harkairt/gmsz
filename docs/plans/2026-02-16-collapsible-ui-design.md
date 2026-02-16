# Collapsible UI Design

**Date:** 2026-02-16
**Status:** Approved

## Problem

The presentation UI displays too much information at once. Content-heavy pages (Alapfogalmak, Tervezés, Kockázat) overwhelm viewers by showing all cards, steps, and visuals simultaneously.

## Solution

Implement a **sectioned collapsible layout** with expandable cards. Content is chunked into digestible pieces that viewers can expand independently at their own pace.

### Design Decisions

| Decision | Choice |
|----------|--------|
| Navigation | Self-paced / scrollable |
| Chunking style | Collapsible/expandable cards |
| Expand mode | Independent (multiple can be open) |
| Visual indicators | No arrows — affordance via hover states and animations |

## Components

### CollapsibleSection

A wrapper component that shows a header (always visible) and content (expandable).

**Props:**
- `title: string` — section header text
- `defaultOpen?: boolean` — whether expanded by default
- `children: ReactNode` — content to show when expanded

**Behavior:**
- Click header to toggle expand/collapse
- Smooth height animation using framer-motion
- No arrow indicators, subtle hover state instead

### ExpandableCard

Refactored Definition component — collapsed by default, shows only term.

**Props:**
- Same as existing Definition: `term`, `definition`, `details?`, `index`
- `defaultOpen?: boolean`

**Behavior:**
- Collapsed: shows only term
- Expanded: shows term + definition + details
- Independent state (no accordion behavior)

## Page Layouts

### Alapfogalmak

1. **Header** — always visible
2. **Formula visual** — always visible (context)
3. **Definition cards** — 5 expandable cards in grid (collapsed by default)
4. **2R section** — CollapsibleSection (collapsed by default)

### Tervezés

1. **Header** — always visible
2. **Tabs** — Sprint / Story (keep existing)
3. **Planning steps** — expandable cards in vertical list (collapsed by default)
4. **Interaction matrix** — CollapsibleSection (collapsed by default)

### Kockázat

1. **Header** — always visible
2. **Process section** — CollapsibleSection containing the 6 steps
3. **Risk matrix** — CollapsibleSection (collapsed by default)
4. **Key takeaway** — always visible (anchor point)

## Animations

- Use framer-motion AnimatePresence for smooth expand/collapse
- Subtle scale/opacity on hover to indicate interactivity
- Staggered reveal when multiple items expand

## Technical Notes

- Create `src/components/CollapsibleSection.tsx`
- Refactor `src/components/Definition.tsx` → `ExpandableCard.tsx`
- Modify existing step Card usage to be expandable
- Keep existing color scheme, typography, and gradient styles
