import { ElementType as ReactElementType, Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ReactComponent as DepositIcon } from "assets/deposit.svg";
import { ReactComponent as LogoutIcon } from "assets/logout.svg";
import { ReactComponent as UserCircleIcon } from "assets/user-circle.svg";
import { ReactComponent as WithdrawalIcon } from "assets/withdrawal.svg";
import classNames from "classnames";
import { TranslationText } from "components";
import { keycloakService } from "services/keycloakService";

interface MenuActions {
  logout: () => void;
  deposit: () => void;
  withdraw: () => void;
}

const getMenuItems = (menuActions: MenuActions) => [
  {
    label: <TranslationText translationKey="userMenu.deposit" />,
    action: menuActions.deposit,
    Icon: DepositIcon,
  },
  {
    label: <TranslationText translationKey="userMenu.withdraw" />,
    action: menuActions.withdraw,
    Icon: WithdrawalIcon,
  },
  {
    label: <TranslationText translationKey="userMenu.logout" />,
    action: menuActions.logout,
    Icon: LogoutIcon,
  },
];

export const UserMenu = () => {
  const menuActions = {
    logout: () => keycloakService.onAuthLogout(),
    deposit: () => null,
    withdraw: () => null,
  };

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
        <Menu.Items className="absolute top-full right-0 z-10 py-1 bg-white rounded-md divide-y divide-gray-100 ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none">
          {getMenuItems(menuActions).map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface MenuItemProps {
  label: ReactNode;
  action: () => void;
  Icon: ReactElementType;
}

const MenuItem = ({ action, label, Icon }: MenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            "p-2 flex gap-2 items-center w-full text-base font-medium text-gray-900",
            {
              "bg-primary-50": active,
            }
          )}
          onClick={action}
        >
          <Icon className="w-6 h-6" aria-hidden />
          <span className="text-left whitespace-nowrap grow">{label}</span>
        </button>
      )}
    </Menu.Item>
  );
};
