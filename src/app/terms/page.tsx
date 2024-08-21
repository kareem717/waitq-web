import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default async function TermsOfServicePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1>Terms of Service</h1>
    </div>
  );
}