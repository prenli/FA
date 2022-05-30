import { CountryFlag } from "components";

interface NameWithFlagProps {
  countryCode: string;
  name: string;
  showFlag: boolean;
}

export const NameWithFlag = ({
  countryCode,
  name,
  showFlag,
}: NameWithFlagProps) => {
  return (
    <div className="text-lg md:text-base font-semibold leading-5 text-gray-900">
      <span>{name}</span>
      {showFlag && (
        <CountryFlag
          code={countryCode}
          className="inline ml-1.5 align-baseline w-[20px] h-[14px]"
        />
      )}
    </div>
  );
};
