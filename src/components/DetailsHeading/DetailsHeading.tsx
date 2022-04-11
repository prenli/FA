import { ReactNode } from "react";
import { UserMenu, BackNavigationButton, Logo } from "components";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";

export interface HeadingProps {
  children: ReactNode;
  onBackButtonClick: () => void;
}

export const DetailsHeading = ({
  children,
  onBackButtonClick,
}: HeadingProps) => {
  const showLogoAndUserMenu = useMatchesBreakpoint("md");

  return (
    <div className="mt-2 bg-white border-b border-gray-200 shadow-md">
      <div className="md:container flex gap-2 items-center p-2 md:mx-auto text-2xl font-bold">
        {showLogoAndUserMenu && (
          <div className="mr-2">
            <Logo />
          </div>
        )}
        <BackNavigationButton onClick={onBackButtonClick} />
        <div className="grow">{children}</div>
        {showLogoAndUserMenu && (
          <div className="px-2">
            <UserMenu />
          </div>
        )}
      </div>
    </div>
  );
};
