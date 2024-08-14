

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center h-full w-full mt-[min(10vw,150px)]">
      {children}
    </main>
  );
}
