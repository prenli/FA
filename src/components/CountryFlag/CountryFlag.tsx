import React, { useLayoutEffect, useState } from "react";

interface CountryFlagProps extends React.SVGProps<SVGSVGElement> {
  code: string;
}

export const CountryFlag = ({ code, ...props }: CountryFlagProps) => {
  const [FlagComponent, setFlagComponent] =
    useState<React.FC<React.SVGProps<SVGSVGElement>>>();
  useLayoutEffect(() => {
    let unmounted = false;
    if (code) {
      const importFlag = async (): Promise<void> => {
        try {
          // https://github.com/facebook/create-react-app/issues/5276
          const FlagComponent = (
            await import(`assets/flags/${code.toLowerCase()}.svg`)
          ).ReactComponent;
          if (!unmounted) {
            setFlagComponent(FlagComponent);
          }
        } catch (error) {
          if (!unmounted) {
            setFlagComponent(undefined);
          }
        }
      };
      importFlag();
    }
    return () => {
      unmounted = true;
    };
  }, [code]);

  return FlagComponent ? <FlagComponent {...props} /> : null;
};
