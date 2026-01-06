"use client";

import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  type LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import { useEditorStore } from "@/store/use-editor-store";

import { AlignButton } from "@/components/toolbar/align-button";
import { FontFamilyButton } from "@/components/toolbar/font-family-button";
import { FontSizeButton } from "@/components/toolbar/font-size-button";
import { HeadingLevelButton } from "@/components/toolbar/heading-level-button";
import { HighlightColorButton } from "@/components/toolbar/highlight-color-button";
import { ImageButton } from "@/components/toolbar/image-button";
import { LineHeightButton } from "@/components/toolbar/line-height-button";
import { LinkButton } from "@/components/toolbar/link-button";
import { ListButton } from "@/components/toolbar/list-button";
import { TextColorButton } from "@/components/toolbar/text-color-button";
import { ToolbarButton } from "@/components/toolbar/toolbar-button";
import { Separator } from "@/components/ui/separator";

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div
      role="toolbar"
      aria-label="Editor formatting toolbar"
      className="px-2.5 py-2 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto bg-custom-4 dark:bg-custom-3"
    >
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      <FontFamilyButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      <HeadingLevelButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      <FontSizeButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
