import { LogoDiv } from "@/components/logo-div";

export default function QueueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen">
      <LogoDiv className="absolute top-2 left-2 text-3xl md:text-4xl" />
      {children}
    </div>
  );
}