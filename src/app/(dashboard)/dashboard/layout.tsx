import { ReactQueryProvider } from "./ReactQueryProvider";
import { RestaurantProvider } from "../context/RestaurantContext";
import { UserProvider } from "../context/UserContext";
import { MenuProvider } from "../context/MenuContext";
import { CategorieProvider } from "../context/CategoriesContext";
import { ItemsProvider } from "../context/ItemsContext";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <UserProvider>
        <RestaurantProvider>
          <MenuProvider>
            <CategorieProvider>
              <ItemsProvider>
                {children}
              </ItemsProvider>
            </CategorieProvider>
          </MenuProvider>
        </RestaurantProvider>
      </UserProvider>
    </ReactQueryProvider>
  );
}
