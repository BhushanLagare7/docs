/**
 * @file Navigation bar component for the document editor page.
 * Provides file operations, editing controls, and user management features.
 * @module app/documents/[documentId]/navbar
 */

"use client";

import { BsFilePdf } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useMutation } from "convex/react";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useEditorStore } from "@/store/use-editor-store";

import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Avatars } from "./avatars";
import { DocumentInput } from "./document-input";
import { Inbox } from "./inbox";

/**
 * Props for the Navbar component.
 * @interface NavbarProps
 * @property {Doc<"documents">} data - The document data object
 */
interface NavbarProps {
  data: Doc<"documents">;
}

/**
 * Navigation bar component for the document editor.
 * Provides comprehensive document management features including:
 * - File menu (save, new document, rename, remove, print)
 * - Edit menu (undo, redo)
 * - Insert menu (tables)
 * - Format menu (text styling)
 * - User avatars and inbox notifications
 * - Organization switcher and user button
 *
 * @param {NavbarProps} props - The component props
 * @param {Doc<"documents">} props.data - The document data object
 * @returns {JSX.Element} The rendered navigation bar
 */
export const Navbar = ({ data }: NavbarProps) => {
  const router = useRouter();
  const { editor } = useEditorStore();

  const mutation = useMutation(api.documents.create);

  /**
   * Creates a new untitled document and navigates to it.
   *
   * @async
   * @returns {Promise<void>}
   */
  const onNewDocument = async () => {
    try {
      const documentId = await mutation({
        title: "Untitled Document",
        initialContent: "",
      });
      toast.success("Document created successfully");
      router.push(`/documents/${documentId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create document");
    }
  };

  /**
   * Inserts a table with the specified dimensions into the editor.
   *
   * @param {Object} dimensions - The table dimensions
   * @param {number} dimensions.rows - Number of rows
   * @param {number} dimensions.cols - Number of columns
   */
  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  /**
   * Downloads a blob as a file with the specified filename.
   *
   * @param {Blob} blob - The blob to download
   * @param {string} fileName - The name for the downloaded file
   */
  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Saves the document content as a JSON file.
   */
  const onSaveJson = () => {
    if (!editor) return;

    const json = editor.getJSON();
    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    onDownload(blob, `${data.title}.json`);
  };

  /**
   * Saves the document content as an HTML file.
   */
  const onSaveHtml = () => {
    if (!editor) return;

    const html = editor.getHTML();
    const blob = new Blob([html], { type: "text/html" });
    onDownload(blob, `${data.title}.html`);
  };

  /**
   * Saves the document content as a plain text file.
   */
  const onSaveText = () => {
    if (!editor) return;

    const text = editor.getText();
    const blob = new Blob([text], { type: "text/plain" });
    onDownload(blob, `${data.title}.txt`);
  };

  /**
   * Saves the document content as a PDF file.
   */
  const onSavePdf = () => {
    if (!editor) return;

    const html = editor.getHTML();
    const blob = new Blob([html], { type: "application/pdf" });
    onDownload(blob, `${data.title}.pdf`);
  };

  return (
    <nav className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image alt="Logo" height={36} src="/logo.svg" width={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput id={data._id} title={data.title} />
          <div className="flex">
            <Menubar className="p-0 h-auto bg-transparent border-none shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="mr-2 size-4" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileJsonIcon className="mr-2 size-4" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHtml}>
                        <GlobeIcon className="mr-2 size-4" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={onSavePdf}>
                        <BsFilePdf className="mr-2 size-4" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="mr-2 size-4" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="mr-2 size-4" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <FilePenIcon className="mr-2 size-4" />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog documentId={data._id}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <TrashIcon className="mr-2 size-4" />
                      Remove
                    </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="mr-2 size-4" />
                    Print <MenubarShortcut>&#8984;P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="mr-2 size-4" />
                    Undo <MenubarShortcut>&#8984;Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="mr-2 size-4" />
                    Redo <MenubarShortcut>&#8984;Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 1, cols: 1 })}
                      >
                        1 X 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        2 X 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 3, cols: 3 })}
                      >
                        3 X 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 4, cols: 4 })}
                      >
                        4 X 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="mr-2 size-4" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="mr-2 size-4" />
                        Bold <MenubarShortcut>&#8984;B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="mr-2 size-4" />
                        Italic <MenubarShortcut>&#8984;I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="mr-2 size-4" />
                        Underline <MenubarShortcut>&#8984;U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="mr-2 size-4" />
                        Strikethrough{" "}
                        <MenubarShortcut>&#8984; &#x21E7; S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="mr-2 size-4" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};
