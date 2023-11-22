import { ReactQueryProvider } from "./ReactQueryProvider";
import { RestaurantProvider } from "./RestaurantContext";


export default function Dashboard({ children }: { children: React.ReactNode }) {

  return (
    <ReactQueryProvider>
      <RestaurantProvider>
        {children}
      </RestaurantProvider>
    </ReactQueryProvider>
  );
}
