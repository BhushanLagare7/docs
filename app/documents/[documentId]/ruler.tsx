/**
 * @file Document margin ruler component.
 * Provides draggable margin markers for adjusting left and right document margins.
 * @module app/documents/[documentId]/ruler
 */

import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

import { useMutation, useStorage } from "@liveblocks/react";

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

/**
 * Array of marker positions for the ruler graduations.
 * @constant {number[]}
 */
const markers = Array.from({ length: 83 }, (_, index) => index);

/**
 * A ruler component for adjusting document margins.
 * Displays a visual ruler with draggable left and right margin markers.
 * Margins are synced in real-time via Liveblocks storage.
 *
 * @returns {JSX.Element} The rendered ruler component
 */
export const Ruler = () => {
  const leftMargin =
    useStorage((storage) => storage.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  const setLeftMargin = useMutation(
    ({ storage }, position: number) => storage.set("leftMargin", position),
    []
  );
  const rightMargin =
    useStorage((storage) => storage.rightMargin) ?? RIGHT_MARGIN_DEFAULT;
  const setRightMargin = useMutation(
    ({ storage }, position: number) => storage.set("rightMargin", position),
    []
  );

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  /**
   * Initiates left margin dragging.
   */
  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  /**
   * Initiates right margin dragging.
   */
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  /**
   * Handles mouse movement during margin dragging.
   * Constrains margin positions to valid ranges and maintains minimum space between margins.
   *
   * @param {React.MouseEvent} event - The mouse move event
   */
  const handleMouseMove = (event: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MINIMUM_SPACE_BETWEEN_MARGINS = 100;

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = event.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition =
            PAGE_WIDTH - rightMargin - MINIMUM_SPACE_BETWEEN_MARGINS;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition =
            PAGE_WIDTH - (leftMargin + MINIMUM_SPACE_BETWEEN_MARGINS);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  /**
   * Stops all margin dragging operations.
   */
  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  /**
   * Resets the left margin to its default value.
   */
  const handleLeftDoubleClick = () => {
    setLeftMargin(LEFT_MARGIN_DEFAULT);
  };

  /**
   * Resets the right margin to its default value.
   */
  const handleRightDoubleClick = () => {
    setRightMargin(RIGHT_MARGIN_DEFAULT);
  };

  return (
    <div
      ref={rulerRef}
      aria-label="Document margins"
      className="flex relative items-end h-6 border-b border-gray-300 select-none print:hidden w-[816px] mx-auto"
      role="toolbar"
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="relative w-full h-full" id="ruler-container">
        <Marker
          isDragging={isDraggingLeft}
          isLeft={true}
          position={leftMargin}
          onDoubleClick={handleLeftDoubleClick}
          onMouseDown={handleLeftMouseDown}
        />
        <Marker
          isDragging={isDraggingRight}
          isLeft={false}
          position={rightMargin}
          onDoubleClick={handleRightDoubleClick}
          onMouseDown={handleRightMouseDown}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-px h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-px h-1.5 bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-px h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Props for the Marker component.
 * @interface MarkerProps
 * @property {number} position - The position of the marker in pixels
 * @property {boolean} isLeft - Whether this is the left margin marker
 * @property {boolean} isDragging - Whether the marker is currently being dragged
 * @property {function} onMouseDown - Callback when mouse down on the marker
 * @property {function} onDoubleClick - Callback when double-clicking the marker
 */
interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

/**
 * A draggable margin marker component.
 * Displays a caret icon that can be dragged to adjust document margins.
 * Shows a vertical guide line when being dragged.
 *
 * @param {MarkerProps} props - The component props
 * @param {number} props.position - Position in pixels from the edge
 * @param {boolean} props.isLeft - Whether this is the left margin marker
 * @param {boolean} props.isDragging - Current dragging state
 * @param {function} props.onMouseDown - Mouse down event handler
 * @param {function} props.onDoubleClick - Double click event handler
 * @returns {JSX.Element} The rendered marker component
 */
const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 -ml-2 w-4 h-full cursor-ew-resize z-5 group"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
    >
      <FaCaretDown className="absolute top-0 left-1/2 h-full transform -translate-x-1/2 fill-primary" />
      <div
        className="absolute top-4 left-1/2 transform -translate-x-1/2"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "var(--primary)",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
