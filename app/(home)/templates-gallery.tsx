"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "convex/react";
import { toast } from "sonner";

import { templates } from "@/constants/templates";
import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const TemplatesGallery = () => {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);

  const create = useMutation(api.documents.create);

  const onTemplateClick = async (title: string, initialContent: string) => {
    setIsCreating(true);
    try {
      const documentId = await create({
        title,
        initialContent,
      });
      toast.success("Document created successfully");
      router.push(`/documents/${documentId}`);
    } catch (error) {
      console.error("Failed to create document", error);
      toast.error("Failed to create document");
    } finally {
      setIsCreating(false);
    }
  };

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
                    aria-label={`Create document from ${template.label} template`}
                    className="flex flex-col gap-y-4 justify-center items-center rounded-sm border transition size-full hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900 bg-background"
                    disabled={isCreating}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() =>
                      onTemplateClick(template.label, template.initialContent)
                    }
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
