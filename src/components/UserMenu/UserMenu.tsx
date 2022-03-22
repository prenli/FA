import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import { ReactComponent as UserCircleIcon } from "../../assets/user-circle.svg";
import { keycloakService } from "../../services/keycloakService";

const menuItems = [
  {
    labelTranslationKey: "Logout",
    action: () => keycloakService.onAuthLogout(),
  },
];

export const UserMenu = () => {
  const { t } = useTranslation();
  return (
    <Menu as="div" className="inline-block relative">
      <Menu.Button>
        <div className="py-1 rounded cursor-pointer h-[40px] w-[32px]">
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
      >
        <Menu.Items className="absolute right-0 z-10 py-1 w-52 bg-white rounded-md divide-y divide-gray-100 ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              label={t(item.labelTranslationKey)}
              action={item.action}
            />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface MenuItemProps {
  label: string;
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
