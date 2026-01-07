/**
 * @file Toolbar configuration constants.
 * Defines available fonts, headings, alignments, and line heights.
 * @module constants/toolbar
 */

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";

/**
 * Available font families for the editor.
 * @constant
 * @type {Array<{label: string, value: string}>}
 */
export const fonts = [
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
  { label: "Georgia", value: "Georgia" },
  { label: "Verdana", value: "Verdana" },
];

/**
 * Available heading levels including normal text.
 * Value 0 represents normal paragraph text.
 * @constant
 * @type {Array<{label: string, value: number, fontSize: string}>}
 */
export const headings = [
  { label: "Normal Text", value: 0, fontSize: "16px" },
  { label: "Heading 1", value: 1, fontSize: "32px" },
  { label: "Heading 2", value: 2, fontSize: "24px" },
  { label: "Heading 3", value: 3, fontSize: "20px" },
  { label: "Heading 4", value: 4, fontSize: "18px" },
  { label: "Heading 5", value: 5, fontSize: "16px" },
];

/**
 * Available text alignment options with icons.
 * @constant
 * @type {Array<{label: string, value: string, icon: LucideIcon}>}
 */
export const alignments = [
  { label: "Left", value: "left", icon: AlignLeftIcon },
  { label: "Center", value: "center", icon: AlignCenterIcon },
  { label: "Right", value: "right", icon: AlignRightIcon },
  { label: "Justify", value: "justify", icon: AlignJustifyIcon },
];

/**
 * Available line height options.
 * @constant
 * @type {Array<{label: string, value: string}>}
 */
export const lineHeights = [
  { label: "Default", value: "normal" },
  { label: "Single", value: "1" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "Double", value: "2" },
];
