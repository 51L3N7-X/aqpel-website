import { ReactQueryProvider } from "./ReactQueryProvider";
import { RestaurantProvider } from "../context/RestaurantContext";
import { UserProvider } from "../context/UserContext";
import { MenuProvider } from "../context/MenuContext";
import { CategorieProvider } from "../context/CategoriesContext";
import { ItemsProvider } from "../context/ItemsContext";
import { TablesProvider } from "../context/TablesContext";
import { useRouter } from "next/navigation";
import { KitchenProvider } from "../context/KitchenContext";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <UserProvider>
        <RestaurantProvider>
          <TablesProvider>
            <KitchenProvider>
              <MenuProvider>
                <CategorieProvider>
                  <ItemsProvider>{children}</ItemsProvider>
                </CategorieProvider>
              </MenuProvider>
            </KitchenProvider>
          </TablesProvider>
        </RestaurantProvider>
      </UserProvider>
    </ReactQueryProvider>
  );
}
