import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link href="/documents/1" className="underline text-primary">
        Documents 1
      </Link>
    </div>
  );
};

export default Page;
