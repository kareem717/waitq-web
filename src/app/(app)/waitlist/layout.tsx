export default async function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 md:mt-16 md:px-24">
      {children}
    </div>
  );
}
