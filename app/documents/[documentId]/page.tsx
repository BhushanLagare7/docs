import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-custom-1">
      <div className="flex fixed top-0 right-0 left-0 z-10 flex-col gap-y-2 px-4 pt-2 bg-custom-1 print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:p-0">
        <Editor />
      </div>
    </div>
  );
};

export default DocumentIdPage;
