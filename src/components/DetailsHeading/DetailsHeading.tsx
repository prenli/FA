import { ReactNode } from "react";
import { UserMenu, BackNavigationButton, Logo } from "components";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useGetContractIdData } from "providers/ContractIdProvider";

export interface HeadingProps {
  children: ReactNode;
  onBackButtonClick: () => void;
}

export const DetailsHeading = ({
  children,
  onBackButtonClick,
}: HeadingProps) => {
  const showLogoAndUserMenu = useMatchesBreakpoint("md");
  const { selectedContact } = useGetContractIdData();

  return (
    <div className="z-20 py-2 px-2 bg-white border-b border-gray-200 shadow-md">
      <div className="container flex gap-2 justify-between items-center mx-auto">
        {showLogoAndUserMenu && <Logo />}
        <div className="flex flex-shrink justify-start items-center w-3/4 sm:w-5/6 text-2xl font-bold">
          <BackNavigationButton onClick={onBackButtonClick} />
          <div className="overflow-hidden whitespace-nowrap text-ellipsis">{children}</div>
        </div>
        <div className="flex justify-end">
          <span className="self-center pr-4 md:pr-1 pl-2 text-xl font-bold text-gray-400">{selectedContact.initials}</span>
          {showLogoAndUserMenu && (
            <div className="">
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
