"use client";

import { templates } from "@/constants/templates";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const TemplatesGallery = () => {
  const isCreating = false;

  return (
    <div className="bg-[#F1F3F4] dark:bg-[#1F1F1F]">
      <div className="flex flex-col gap-y-4 px-16 py-6 mx-auto max-w-7xl">
        <h3 className="font-medium">Start a new Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
              >
                <div
                  className={cn(
                    "aspect-3/4 flex flex-col gap-y-2.5",
                    isCreating && "opacity-50 pointer-events-none"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => {}}
                    aria-label={`Create document from ${template.label} template`}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="flex flex-col gap-y-4 justify-center items-center rounded-sm border transition size-full hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900 bg-background"
                  />
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
