import { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ReactComponent as LogoutIcon } from "assets/logout.svg";
import { ReactComponent as UserCircleIcon } from "assets/user-circle.svg";
import classNames from "classnames";
import { TranslationText } from "components";
import { keycloakService } from "services/keycloakService";

const menuItems = [
  {
    label: <TranslationText translationKey="navTab.logout" />,
    action: () => keycloakService.onAuthLogout(),
  },
];

export const UserMenu = () => {
  return (
    <Menu as="div" className="grid relative items-center">
      <Menu.Button>
        <div className="w-8 h-8 rounded cursor-pointer">
          <UserCircleIcon className="h-full text-gray-900" />
        </div>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}
      >
        <Menu.Items className="absolute top-full right-0 z-10 py-1 bg-white rounded-md divide-y divide-gray-100 ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none min-w-[120px]">
          {menuItems.map((item, index) => (
            <MenuItem key={index} label={item.label} action={item.action} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface MenuItemProps {
  label: ReactNode;
  action: () => void;
}

const MenuItem = ({ action, label }: MenuItemProps) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={classNames(
          "p-2 group flex items-center w-full text-base font-medium text-gray-900",
          {
            "bg-primary-50": active,
          }
        )}
        onClick={action}
      >
        <LogoutIcon className="mr-2 w-6 h-6" aria-hidden />
        {label}
      </button>
    )}
  </Menu.Item>
);
