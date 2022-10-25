import { MutableRefObject, useState } from "react";
import {Input, Button, Select, DatePicker} from "components";
import {Option} from "components/Select/Select";
import {DetailedPortfolio} from "../../api/overview/types";
import {useSaveSavingsPlan} from "../../api/overview/useSaveSavingsPlan";

interface MonthlyInvestmentModalProps {
  modalInitialFocusRef: MutableRefObject<null>;
  onClose: () => void;
  portfolio: DetailedPortfolio;
}

export const MonthlyInvestmentModal = ({
  onClose,
  modalInitialFocusRef,
  portfolio
}: MonthlyInvestmentModalProps) => {

  const investmentTypeOptions = [
    {id: "1", label: "Fixed monthly amount"},
    {id: "2", label: "Fixed monthly profit"},
    {id: "3", label: "Target value after time period"}
  ];

  const startDateAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.startdate");
  const endDateAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.enddate");
  const savingsTargetAmountAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.savingsTargetAmount");
  const savingsTypeAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.savingsType");
  const useValueAveragingAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.useValueAveraging");

  let initialInvestmentType = investmentTypeOptions[0]
  if(useValueAveragingAttribute?.booleanValue && savingsTypeAttribute?.stringValue === "Fixed amount") initialInvestmentType = investmentTypeOptions[1]
  else if(useValueAveragingAttribute?.booleanValue && savingsTypeAttribute?.stringValue === "Target value") initialInvestmentType = investmentTypeOptions[2]

  const [fixedAmount, setFixedAmount] = useState(0);
  const [fixedProfit, setFixedProfit] = useState(0);
  const [maximumAmount, setMaximumAmount] = useState(0);
  const [startDate, setStartDate] = useState<Date>(startDateAttribute?.dateValue ? new Date(startDateAttribute.dateValue) : new Date());
  const [endDate, setEndDate] = useState(endDateAttribute?.dateValue ? new Date(endDateAttribute.dateValue) : undefined);
  const [savingsTargetAmount, setSavingsTargetAmount] = useState(savingsTargetAmountAttribute?.doubleValue ? savingsTargetAmountAttribute.doubleValue : 0);
  const [investmentType, setInvestmentType] = useState<Option>(initialInvestmentType);


  const timePeriodInMonths = endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / 30 : undefined;
  const calculatedMonthlyContribution = timePeriodInMonths ? Math.round((savingsTargetAmount - portfolio.portfolioReport.marketValue) / timePeriodInMonths) : undefined;

  //const investmentTypeId = investmentType ? investmentType.id : initialInvestmentType?.id
  let investmentTypeSpecifics
  let useValueAveraging = false;
  let savingsType
  switch(investmentType.id) {
    case "1":
      investmentTypeSpecifics = (
        <Input
          ref={modalInitialFocusRef}
          value={fixedAmount || ""}
          onChange={(event) => {
            setFixedAmount(Number(event.currentTarget.value));
          }}
          label="Monthly amount"
          type="number"
        />
      );
      break;
    case "2":
      useValueAveraging = true;
      savingsType = "Fixed amount";
      investmentTypeSpecifics = (
        <>
          <Input
            ref={modalInitialFocusRef}
            value={fixedProfit || ""}
            onChange={(event) => {
              setFixedProfit(Number(event.currentTarget.value));
            }}
            label={"Monthly profit (in "+portfolio.currency.securityCode+")"}
            type="number"
          />
          <Input
            ref={modalInitialFocusRef}
            value={maximumAmount || ""}
            onChange={(event) => {
              setMaximumAmount(Number(event.currentTarget.value));
            }}
            label={"Maximum monthly amount (in "+portfolio.currency.securityCode+")"}
            type="number"
          />
        </>
      );
      break;
    case "3":
      useValueAveraging = true;
      savingsType = "Target value";
      investmentTypeSpecifics = (
        <>
          <DatePicker
            label="End date"
            value={endDate}
            onChange={setEndDate}
            minDate={startDate} />
          <Input
            ref={modalInitialFocusRef}
            value={savingsTargetAmount || ""}
            onChange={(event) => {
              setSavingsTargetAmount(Number(event.currentTarget.value));
            }}
            label={"Target value (in "+portfolio.currency.securityCode+")"}
            type="number"
          />
          <Input
            value={calculatedMonthlyContribution || ""}
            label={"Estimated monthly contribution (in "+portfolio.currency.securityCode+")"}
            type="number"
            disabled={true}
          />
        </>
      );
      break;
  }

  const { handleSaveSavingsPlan, submitting } = useSaveSavingsPlan(
    portfolio.shortName,
    startDate,
    endDate,
    savingsTargetAmount,
    savingsType,
    useValueAveraging
  );

  return (
    <div className="grid gap-2 min-w-[min(84vw,_375px)]">

      <div className="flex flex-col gap-4 items-stretch ">

        <Select
            value={investmentType}
            onChange={setInvestmentType}
            options={investmentTypeOptions}
            label={"How do you want to save monthly?"}
        />

        {investmentTypeSpecifics}

        <Button
          disabled={
            !investmentType ||
            (investmentType?.id === "1" && !fixedAmount) ||
            (investmentType?.id === "2" && !fixedProfit) ||
            (investmentType?.id === "3" && (!savingsTargetAmount || !endDate) )
          }
          isLoading={submitting}
          onClick={async () => {
            const response = await handleSaveSavingsPlan();
            if (response) {
              onClose();
            }
          }}>
          Submit
        </Button>
      </div>
      <hr className="my-1" />
      <div className="text-xs text-center text-gray-600 max-w-[375px]">
        Disclaimer text
      </div>
    </div>
  );
};
