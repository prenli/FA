import { ElementType as ReactElementType, Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  Process,
  useGetContactProcesses,
} from "api/flowable/useGetContactProcesses";
import { ReactComponent as DepositIcon } from "assets/deposit.svg";
import { ReactComponent as ProcessIcon } from "assets/external-link.svg";
import { ReactComponent as LogoutIcon } from "assets/logout.svg";
import { ReactComponent as UserCircleIcon } from "assets/user-circle.svg";
import { ReactComponent as WithdrawalIcon } from "assets/withdrawal.svg";
import classNames from "classnames";
import i18n from "i18next";
import { useKeycloak } from "providers/KeycloakProvider";
import { useNavigate, To, NavigateOptions } from "react-router";
import { keycloakService } from "services/keycloakService";
import { useModifiedTranslation } from "../../hooks/useModifiedTranslation";
import { useModal } from "../Modal/useModal";
import { DepositModalContent } from "../MoneyModals/DepositModalContent/DepositModalContent";
import { WithdrawModalContent } from "../MoneyModals/WithdrawModalContent/WithdrawModalContent";

interface MenuActions {
  logout: () => void;
  deposit: () => void;
  withdraw: () => void;
  process: (to: To, options?: NavigateOptions) => void;
}

const getMenuItems = (
  menuActions: MenuActions,
  hasLinkedContact: boolean,
  processes: Process[]
) => {
  if (!hasLinkedContact) {
    return [
      {
        label: i18n.t("userMenu.logout"),
        action: menuActions.logout,
        Icon: LogoutIcon,
      },
    ];
  }
  return [
    ...processes.map((process) => ({
      label: process.name,
      action: () =>
        menuActions.process(`/form/${process.key}`, {
          state: { header: process.name },
        }),
      Icon: ProcessIcon,
      color: "text-primary-600",
    })),
    {
      label: i18n.t("userMenu.deposit"),
      action: menuActions.deposit,
      Icon: DepositIcon,
    },
    {
      label: i18n.t("userMenu.withdraw"),
      action: menuActions.withdraw,
      Icon: WithdrawalIcon,
    },
    {
      label: i18n.t("userMenu.logout"),
      action: menuActions.logout,
      Icon: LogoutIcon,
    },
  ];
};

export const UserMenu = () => {
  const { t } = useModifiedTranslation();
  const { linkedContact } = useKeycloak();
  const navigate = useNavigate();
  const { data: processes = [] } = useGetContactProcesses();
  const {
    Modal,
    onOpen: onDepositModalOpen,
    modalProps: depositModalProps,
    contentProps: depositModalContentProps,
  } = useModal();

  const {
    onOpen: onWithdrawModalOpen,
    modalProps: withdrawModalProps,
    contentProps: withdrawModalContentProps,
  } = useModal();

  const menuActions = {
    logout: () => keycloakService.onAuthLogout(),
    deposit: () => onDepositModalOpen(),
    withdraw: () => onWithdrawModalOpen(),
    process: (to: To, options?: NavigateOptions) => navigate(to, options),
  };
  return (
    <>
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
            {getMenuItems(menuActions, !!linkedContact, processes).map(
              (item, index) => (
                <MenuItem key={index} {...item} />
              )
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      <Modal {...depositModalProps} header={t("moneyModal.depositModalHeader")}>
        <DepositModalContent {...depositModalContentProps} />
      </Modal>
      <Modal
        {...withdrawModalProps}
        header={t("moneyModal.withdrawModalHeader")}
      >
        <WithdrawModalContent {...withdrawModalContentProps} />
      </Modal>
    </>
  );
};

interface MenuItemProps {
  label: ReactNode;
  action: () => void;
  Icon: ReactElementType;
  color?: string;
}

const MenuItem = ({ action, label, Icon, color }: MenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            `p-2 pr-4 flex gap-2 items-center w-full text-base font-medium text-gray-900 ${
              color ? color : ""
            }`,
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
