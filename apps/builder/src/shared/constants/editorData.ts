import type { EditorData } from "@/shared/types";

export const DEFAULT_GRID_CONFIG = {
  columns: 48,
  rows: 48,
  rowHeight: 24,
  gap: 0,
};

export const COLUMN_WIDTH = 40;

export const initialEditorData: EditorData = {
  gridConfig: DEFAULT_GRID_CONFIG,
  sections: [
    {
      id: "section-1",
      name: "Main Section",
      blocks: [
        {
          id: "block-1",
          component: "text",
          position: { x: 6, y: 4, zIndex: 1 },
          size: { width: 18, height: 3 },
          props: {
            children: "Design System Components",
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "#1f2937",
          },
          metadata: {
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
        },
        {
          id: "block-2",
          component: "badge",
          position: { x: 6, y: 10, zIndex: 1 },
          size: { width: 6, height: 2 },
          props: {
            children: "New",
            color: "success",
            size: "md",
          },
          metadata: {
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
        },
        {
          id: "block-4",
          component: "button",
          position: { x: 6, y: 14, zIndex: 1 },
          size: { width: 8, height: 3 },
          props: {
            children: "Primary Button",
            variant: "contained",
            size: "md",
          },
          metadata: {
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
        },
        {
          id: "block-5",
          component: "button",
          position: { x: 16, y: 14, zIndex: 1 },
          size: { width: 8, height: 3 },
          props: {
            children: "Outlined Button",
            variant: "outlined",
            size: "md",
          },
          metadata: {
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
        },
        {
          id: "block-6",
          component: "input",
          position: { x: 6, y: 19, zIndex: 1 },
          size: { width: 18, height: 3 },
          props: {
            placeholder: "Enter your email...",
            type: "email",
            size: "md",
          },
          metadata: {
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
        },
      ],
      metadata: {
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
    },
    {
      id: "section-2",
      name: "Secondary Section",
      blocks: [
        {
          id: "block-7",
          component: "text",
          position: { x: 10, y: 5, zIndex: 1 },
          size: { width: 20, height: 4 },
          props: {
            children: "Welcome to Section 2",
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "left",
            color: "#2563eb",
          },
          metadata: {
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
        },
        {
          id: "block-8",
          component: "button",
          position: { x: 10, y: 11, zIndex: 1 },
          size: { width: 10, height: 3 },
          props: {
            children: "Get Started",
            variant: "contained",
            size: "lg",
          },
          metadata: {
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
        },
        {
          id: "block-9",
          component: "badge",
          position: { x: 22, y: 11, zIndex: 1 },
          size: { width: 8, height: 2 },
          props: {
            children: "Featured",
            color: "primary",
            size: "lg",
          },
          metadata: {
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
        },
      ],
      metadata: {
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
    },
  ],
  metadata: {
    version: "1.0.0",
    lastModified: "2024-01-01T00:00:00.000Z",
    title: "Sample Editor Page",
    description: "Example page with various block types",
  },
};
