import { ReactNode } from "react";
import {DetailedPortfolio} from "api/overview/types";
import {Button, Card, GainLoseColoring, LabeledDiv} from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useNavigate } from "react-router";
import {useModal} from "../../../../components/Modal/useModal";
import {MonthlyInvestmentModal} from "../../../../components/MonthlyInvestmentsModal/MonthlyInvestmentModal";

interface MonthlySavingsCardProps {
  data: DetailedPortfolio;
  label: ReactNode;
}

export const MonthlySavingsCard = ({
  data,
  label,
}: MonthlySavingsCardProps) => {
  const { i18n, t } = useModifiedTranslation();
  console.log(i18n.language);

  const navigate = useNavigate();

  const useValueAveragingAttribute = data.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.useValueAveraging");
  const savingsTypeAttribute = data.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.savingsType");
  const enableAttribute = data.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.enable");
  const amountAttribute = data.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.amount");
  const dateAttribute = data.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.date");
  const endDateAttribute = data.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.enddate");
  const startDateAttribute = data.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.startdate");
  const savingsTargetAmountAttribute = data.profile.attributes.find(el => el.attributeKey === "portfolio.monthlysavings.savingsTargetAmount");

  const noSavingsPlan = (
    <div className="text-xs text-center text-gray-600">
      You don&apos;t have a monthly savings plan.
    </div>
  );

  let nextDueDate;
  if(dateAttribute?.intValue) {
    nextDueDate = new Date();
    nextDueDate.setDate(dateAttribute.intValue);
    if(nextDueDate < new Date()) {
      nextDueDate.setMonth(nextDueDate.getMonth()+1);
    }
  }

  const currencyOptions = {style: "currency", currency: data.currency.securityCode, currencyDisplay: "narrowSymbol", maximumFractionDigits: 0};
  const fixedSavingsSpecifics = (<>
    <div className="text-sm text-center text-gray-600">
      Fixed savings plan
    </div>
    <div className="grid grid-cols-2 divide-x">
      <LabeledDiv
        label="Monthly amount"
        className="px-2 text-xl font-semibold text-gray-700"
      >
        {amountAttribute?.doubleValue.toLocaleString(i18n.language, currencyOptions)}
      </LabeledDiv>
      <LabeledDiv
        label="Next due date"
        className="px-2 text-xl font-semibold text-gray-700"
      >
        {nextDueDate ? nextDueDate.toLocaleDateString(i18n.language, {day: "numeric", month: "short", year: undefined}) : ""}
      </LabeledDiv>
    </div>
  </>);

  const valueAveragingMonthlySpecifics = (<>
    <div className="text-sm text-center text-gray-600">
      Value averaging savings plan {startDateAttribute?.dateValue ? "started on " + new Date(startDateAttribute.dateValue).toLocaleDateString(i18n.language, {day: "numeric", month: "short", year: "numeric"}) : ""}
    </div>
    <div className="grid grid-cols-2 divide-x">
      <LabeledDiv
        label="Monthly value increase"
        className="px-2 text-xl font-semibold text-gray-700"
      >
        {amountAttribute?.doubleValue.toLocaleString(i18n.language, currencyOptions)}
      </LabeledDiv>
      <LabeledDiv
        label="Next due date"
        className="px-2 text-xl font-semibold text-gray-700"
      >
        {nextDueDate ? nextDueDate.toLocaleDateString(i18n.language, {day: "numeric", month: "short", year: undefined}) : ""}
      </LabeledDiv>
    </div>
  </>);

  const valueAveragingTimePeriodSpecifics = (<>
    <div className="text-sm text-center text-gray-600">
      Target amount savings plan {startDateAttribute?.dateValue ? "started on " + new Date(startDateAttribute.dateValue).toLocaleDateString(i18n.language, {day: "numeric", month: "short", year: "numeric"}) : ""}
    </div>
    <div className="grid grid-cols-2 divide-x">
      <LabeledDiv
        label="Target amount"
        className="px-2 text-xl font-semibold text-gray-700"
      >
        {savingsTargetAmountAttribute?.doubleValue.toLocaleString(i18n.language, currencyOptions)}
      </LabeledDiv>
      <LabeledDiv
        label="End date"
        className="px-2 text-xl font-semibold text-gray-700"
      >
        {new Date(endDateAttribute?.dateValue ? endDateAttribute.dateValue : "").toLocaleDateString(i18n.language, {day: "numeric", month: "short", year: "numeric"})}
      </LabeledDiv>
    </div>
  </>);

  let savingsSpecifics;
  let buttonCaption = "Modify monthly savings plan";
  if(!(enableAttribute?.booleanValue)) {
    savingsSpecifics = noSavingsPlan;
    buttonCaption = "Add monthly savings plan";
  } else if(!(useValueAveragingAttribute?.booleanValue)) {
    savingsSpecifics = fixedSavingsSpecifics;
  } else if(savingsTypeAttribute?.stringValue === "Fixed amount") {
    savingsSpecifics = valueAveragingMonthlySpecifics;
  } else if(savingsTypeAttribute?.stringValue === "Target value") {
    savingsSpecifics = valueAveragingTimePeriodSpecifics;
  }

  const {
    Modal,
    onOpen: onMonthlyInvestmentsModalOpen,
    modalProps: monthlyInvestmentsModalProps,
    contentProps: monthlyInvestmentsModalContentProps,
  } = useModal();

  const latestDate = data.investmentPlan.benchmarkPositions.reduce((prev, current) => prev.date.localeCompare(current.date) >= 0 ? prev : current).date;
  const currentInvestmentPlan = data.investmentPlan.benchmarkPositions.filter(val => val.date === latestDate);

  let investmentPlanSection
  if(enableAttribute?.booleanValue) {
    investmentPlanSection = (<>
      <div className="text-sm mt-5 mb-2 text-center text-gray-600">
        The contributions are invested according to your investment plan:
      </div>

    <div className="flex justify-between py-1 px-2 text-sm font-semibold text-gray-500 bg-gray-100">
      <div>Security</div>
      <div>Share</div>
    </div>
    <div className="flex flex-col px-2 divide-y">
      {currentInvestmentPlan.map((benchmarkPosition) => {
        return(
          <div
            key={benchmarkPosition.id}
            className="flex justify-between items-center py-2 cursor-pointer"
          >
            <div className="text-base font-normal">{benchmarkPosition.security.name}</div>
            <div className="whitespace-nowrap">
              {(benchmarkPosition.share/100).toLocaleString(i18n.language, {style: "percent", maximumFractionDigits: 2})}
            </div>
          </div>
        )
      })}

    </div>
    </>);
  }

  return (<>
    <Card header={label}>
      <div className="mx-auto pb-2 pt-4 flex flex-col gap-4 items-stretch w-[80%]">
        {savingsSpecifics}

        <Button onClick={onMonthlyInvestmentsModalOpen}>
          {buttonCaption}
        </Button>
      </div>

      {investmentPlanSection}

    </Card>
    <Modal {...monthlyInvestmentsModalProps} header="Monthly savings">
      <MonthlyInvestmentModal {...monthlyInvestmentsModalContentProps} portfolioMarketValue={data.portfolioReport.marketValue} portfolio={data} />
    </Modal>
  </>);
};
