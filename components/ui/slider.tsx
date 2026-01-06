"use client";

import * as React from "react";

import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      className={cn(
        "flex relative items-center w-full select-none data-vertical:min-h-40 touch-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track
        className="overflow-hidden relative rounded-none bg-muted data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1 grow"
        data-slot="slider-track"
      >
        <SliderPrimitive.Range
          className="absolute select-none bg-primary data-horizontal:h-full data-vertical:w-full"
          data-slot="slider-range"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="border-ring ring-ring/50 relative size-3 rounded-none border bg-white transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-1 focus-visible:ring-1 focus-visible:outline-hidden active:ring-1 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
          data-slot="slider-thumb"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
