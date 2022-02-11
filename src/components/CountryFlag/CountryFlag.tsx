import React, { useLayoutEffect, useState } from "react";

interface CountryFlagProps extends React.SVGProps<SVGSVGElement> {
  code: string;
}

export const CountryFlag = ({ code, ...props }: CountryFlagProps) => {
  const [FlagComponent, setFlagComponent] =
    useState<React.FC<React.SVGProps<SVGSVGElement>>>();
  useLayoutEffect(() => {
    if (code) {
      const importFlag = async (): Promise<void> => {
        try {
          // https://github.com/facebook/create-react-app/issues/5276
          setFlagComponent(
            (await import(`assets/flags/${code.toLowerCase()}.svg`))
              .ReactComponent
          );
        } catch (error) {
          setFlagComponent(undefined);
        }
      };
      importFlag();
    }
  }, [code]);

  return FlagComponent ? <FlagComponent {...props} /> : null;
};
