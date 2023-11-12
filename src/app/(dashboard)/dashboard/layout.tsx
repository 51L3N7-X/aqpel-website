import { ReactQueryProvider } from "./ReactQueryProvider";


export default function Dashboard({ children }: { children: React.ReactNode }) {

  return (
    
      <ReactQueryProvider>{children}</ReactQueryProvider>
    
  );
}
