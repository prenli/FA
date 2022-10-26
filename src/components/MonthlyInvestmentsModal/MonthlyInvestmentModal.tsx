import { MutableRefObject, useState } from "react";
import {Input, Button, Select, DatePicker} from "components";
import {Option} from "components/Select/Select";
import {DetailedPortfolio} from "../../api/overview/types";
import {useDeleteSavingsPlan} from "../../api/overview/useDeleteSavingsPlan";
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
    {id: "2", label: "Fixed monthly value increase"},
    {id: "3", label: "Target value after time period"}
  ];

  const startDateAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.startdate");
  const endDateAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.enddate");
  const savingsTargetAmountAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.savingsTargetAmount");
  const savingsTypeAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.savingsType");
  const useValueAveragingAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.useValueAveraging");
  const limitAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.limit")
  const amountAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.amount")
  const dateAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.date")
  const enableAttribute = portfolio.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.enable")

  let initialInvestmentType = investmentTypeOptions[0]
  if(useValueAveragingAttribute?.booleanValue && savingsTypeAttribute?.stringValue === "Fixed amount") initialInvestmentType = investmentTypeOptions[1]
  else if(useValueAveragingAttribute?.booleanValue && savingsTypeAttribute?.stringValue === "Target value") initialInvestmentType = investmentTypeOptions[2]

  const [fixedAmount, setFixedAmount] = useState(amountAttribute?.doubleValue ? amountAttribute.doubleValue : 0);
  const [fixedIncrease, setFixedIncrease] = useState(amountAttribute?.doubleValue ? amountAttribute.doubleValue : 0);
  const [maximumAmount, setMaximumAmount] = useState(limitAttribute?.intValue ? limitAttribute.intValue : 0);
  const [startDate, setStartDate] = useState<Date>(startDateAttribute?.dateValue ? new Date(startDateAttribute.dateValue) : new Date());
  const [endDate, setEndDate] = useState(endDateAttribute?.dateValue ? new Date(endDateAttribute.dateValue) : undefined);
  const [savingsTargetAmount, setSavingsTargetAmount] = useState(savingsTargetAmountAttribute?.doubleValue ? savingsTargetAmountAttribute.doubleValue : 0);
  const [investmentType, setInvestmentType] = useState<Option>(initialInvestmentType);
  const [dayOfMonth, setDayOfMonth] = useState(dateAttribute?.intValue ? dateAttribute.intValue : 1);
  const [useValueAveraging, setUseValueAveraging] = useState(useValueAveragingAttribute?.booleanValue);
  const [savingsType, setSavingsType] = useState(savingsTypeAttribute?.stringValue);

  const timePeriodInMonths = endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / 30 : undefined;
  const calculatedMonthlyContribution = timePeriodInMonths ? Math.round((savingsTargetAmount - portfolio.portfolioReport.marketValue) / timePeriodInMonths) : undefined;

  let investmentTypeSpecifics
  switch(investmentType.id) {
    case "1":
      investmentTypeSpecifics = (
        <Input
          value={fixedAmount || ""}
          onChange={(event) => {
            setFixedAmount(Number(event.currentTarget.value));
          }}
          label="How much do you want to save monthly?"
          type="number"
        />
      );
      break;
    case "2":
      investmentTypeSpecifics = (
        <>
          <Input
            value={fixedIncrease || ""}
            onChange={(event) => {
              setFixedIncrease(Number(event.currentTarget.value));
            }}
            label={"How much value increase (in "+portfolio.currency.securityCode+") do you want monthly?"}
            type="number"
          />
          <Input
            value={maximumAmount || ""}
            onChange={(event) => {
              setMaximumAmount(Number(event.currentTarget.value));
            }}
            label={"What is the maximum amount you are willing to save monthly?"}
            type="number"
          />
        </>
      );
      break;
    case "3":
      investmentTypeSpecifics = (
        <>
          <DatePicker
            label="Until which date do you want to save?"
            value={endDate}
            onChange={setEndDate}
            minDate={startDate} />
          <Input
            value={savingsTargetAmount || ""}
            onChange={(event) => {
              setSavingsTargetAmount(Number(event.currentTarget.value));
            }}
            label={"How much (in "+portfolio.currency.securityCode+") do you want to have on that date?"}
            type="number"
            min={"0"}
          />
          <Input
            value={maximumAmount || ""}
            onChange={(event) => {
              setMaximumAmount(Number(event.currentTarget.value));
            }}
            label={"What is the maximum amount you are willing to save monthly?"}
            type="number"
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
    useValueAveraging,
    maximumAmount,
    useValueAveraging ? fixedIncrease : fixedAmount,
    dayOfMonth
  );

  const { handleDeleteSavingsPlan, deleting } = useDeleteSavingsPlan(
    portfolio.shortName,
  );

  let deletePlanButton
  if(enableAttribute?.booleanValue) {
    deletePlanButton = (
      <Button
        isLoading={deleting}
        variant={"Red"}
        onClick={async () => {
          const response = await handleDeleteSavingsPlan();
          if (response) {
            onClose();
          }
        }}>
        Delete plan
      </Button>
    );
  }

  const setValuesBasedOnOption = (o : Option) => {
    switch(o.id) {
      case "1":
        setUseValueAveraging(false);
        setSavingsType("");
        break;
      case "2":
        setUseValueAveraging(true);
        setSavingsType("Fixed amount");
        break;
      case "3":
        setUseValueAveraging(true);
        setSavingsType("Target value");
        break;
    }
  }

  return (
    <div className="grid gap-2 min-w-[min(84vw,_375px)]">

      <div className="flex flex-col gap-4 items-stretch ">

        <Select
            value={investmentType}
            onChange={o => {
              setValuesBasedOnOption(o);
              setInvestmentType(o);
            }}
            options={investmentTypeOptions}
            label={"How do you want to save monthly?"}
        />

        {investmentTypeSpecifics}

        <Input
          value={dayOfMonth || ""}
          onChange={(event) => {
            setDayOfMonth(Number(event.currentTarget.value));
          }}
          label={"On which day of month (1-31) do you want to save?"}
          type="number"
          max={"31"}
          min={"1"}
        />

        <Button
          disabled={
            !investmentType ||
            (investmentType?.id === "1" && !fixedAmount) ||
            (investmentType?.id === "2" && !fixedIncrease) ||
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
        {deletePlanButton}
      </div>
      <hr className="my-1" />
      <div className="text-xs text-center text-gray-600 max-w-[375px]">
        Disclaimer text
      </div>
    </div>
  );
};
