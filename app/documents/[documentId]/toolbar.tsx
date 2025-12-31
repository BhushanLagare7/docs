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

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

interface ToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
}

const ToolbarButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      title={label}
      className={cn(
        "flex justify-center items-center h-7 text-sm rounded-sm min-w-7 hover:bg-muted-foreground/30",
        isActive && "bg-muted-foreground/30"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

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
        onClick: () => console.log("TODO: Add Comment"),
        // isActive: false // TODO: Enable this functionality
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
    <div className="px-2.5 py-2 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto bg-custom-4 dark:bg-custom-3">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      {/* TODO: Font Family */}
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      {/* TODO: Heading */}
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      {/* TODO: Font Size */}
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* TODO: Text Color */}
      {/* TODO: Highlight Color */}
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300 dark:bg-neutral-500"
      />
      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line Height */}
      {/* TODO: List */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
