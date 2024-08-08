import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

// _ in _components is a convention to exclude the folder form the url
export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes/>
      </div>
    </div>
  );
};
