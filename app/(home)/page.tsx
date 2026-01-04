import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 right-0 left-0 z-10 p-4 h-16 bg-background">
        <Navbar />
      </div>
      <main className="mt-16">
        <TemplatesGallery />
      </main>
    </div>
  );
};

export default Page;
