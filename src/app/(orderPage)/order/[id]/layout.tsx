import { ReactQueryProvider } from "@/app/(dashboard)/dashboard/ReactQueryProvider";


export default function OrderPage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </div>
  );
}
