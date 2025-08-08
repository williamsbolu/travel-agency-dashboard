import { Outlet, redirect, useNavigation } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { FiLoader } from "react-icons/fi";
import { MobileSidebar, NavItems } from "components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

// Allows us to prefetch data we need on the page on the client: there is also the server version that is "loader"
export async function clientLoader() {
  try {
    const user = await account.get();

    console.log({ adminUser: user });

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);

    // Only admin users should access the dashboard
    if (existingUser?.status === "user") {
      return redirect("/");
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error in clientLoader", e);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className="admin-layout">
      <MobileSidebar />

      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="children">
        {isNavigating ? (
          <div className="h-full flex items-center justify-center">
            <span className="">
              <FiLoader className="animate-spin size-7" />
            </span>
          </div>
        ) : (
          <Outlet />
        )}
      </aside>
    </div>
  );
};

export default AdminLayout;
