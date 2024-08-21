import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default async function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1>Privacy Policy</h1>
    </div>
  );
}