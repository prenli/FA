import { useState } from "react";
import { ApolloError, FetchResult, gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const IMPORT_SAVINGS_PLAN_MUTATION = gql`
  mutation ImportSavingsPlan(
    $portfolioShortName: String
    $profileAttributes: String
  ) {
    importGeneral(
      pMode: 2
      withRules: true
      rows: {
        portfolios: [
          {
            shortName: $portfolioShortName
            profileAttributes: $profileAttributes
          }
        ]}
    )
  }
`;

interface ImportSavingsPlanQueryVariables {
  portfolioShortName: string;
  profileAttributes: string;
}

const errorStatus = "ERROR" as const;

interface ImportSavingsPlanQueryResponse {
  importGeneral: ({
    importStatus: "OK" | typeof errorStatus;
  } & unknown)[];
}

export const useSaveSavingsPlan = (
  portfolioShortName: string,
  startDate: Date|undefined,
  endDate: Date|undefined,
  savingsTargetAmount: number|undefined,
  savingsType: string|undefined,
  useValueAveraging: boolean|undefined,
  maximumAmount: number|undefined,
  amount: number|undefined,
  dayOfMonth: number|undefined,
) => {
  const [submitting, setSubmitting] = useState(false);
  const [handleAPISaveSavingsPlan] = useMutation<
    ImportSavingsPlanQueryResponse,
    ImportSavingsPlanQueryVariables
  >(IMPORT_SAVINGS_PLAN_MUTATION, {
    refetchQueries: ["GetPortfolio"],
  });

  const handleSaveSavingsPlan = async () => {
    setSubmitting(true);
    try {
      const profileAttributes = [];
      if(startDate !== undefined) {
        profileAttributes.push("portfolio.monthlysavings.startdate="+dateToISOString(startDate)+":Date")
      }
      if(endDate !== undefined) {
        profileAttributes.push("portfolio.monthlysavings.enddate="+dateToISOString(endDate)+":Date")
      }
      if(savingsTargetAmount !== undefined) {
        profileAttributes.push("portfolio.monthlysavings.savingsTargetAmount="+savingsTargetAmount+":Double")
      }
      if(savingsType !== undefined) {
        profileAttributes.push("portfolio.monthlysavings.savingsType="+savingsType+":String")
      }
      if(useValueAveraging !== undefined) {
        profileAttributes.push("portfolio.monthlysavings.useValueAveraging="+useValueAveraging+":Boolean")
      }
      if(maximumAmount !== undefined) {
        profileAttributes.push("portfolio.monthlysavings.limit="+maximumAmount+":Integer")
      }
      if(amount !== undefined) {
        profileAttributes.push("portfolio.monthlysavings.amount="+amount+":Double")
      }
      if(dayOfMonth !== undefined) {
        profileAttributes.push("portfolio.monthlysavings.date="+dayOfMonth+":Integer")
      }
      profileAttributes.push("portfolio.monthlysavings.enable=true:Boolean")
      profileAttributes.push("portfolio.monthlysavings.useInvestmentPlan=true:Boolean")
      for (let i = 1; i <= 12; i++) {
        // Each individual month
        profileAttributes.push("portfolio.monthlysavings."+i+"=true:Boolean")
      }

      const apiResponse = await handleAPISaveSavingsPlan({
        variables: {
          portfolioShortName: portfolioShortName,
          profileAttributes: profileAttributes.join("#")
        },
      });

      handleBadAPIResponse(apiResponse);

      setSubmitting(false);
      return apiResponse;
    } catch (e: unknown) {
      const error = e as Error | ApolloError;
      toast.error(error.message, {
        style: { whiteSpace: "pre-line" },
      });
      setSubmitting(false);
      return null;
    }
  };

  const dateToISOString = (d : Date) => {
    const mm = d.getMonth() + 1; // getMonth() is zero-based
    const dd = d.getDate();

    return d.getFullYear() + "-" + (mm>9 ? '' : '0') + mm + "- " + (dd>9 ? '' : '0') + dd;
  };

  return { handleSaveSavingsPlan, submitting };
};

const handleBadAPIResponse = (
  apiResponse: FetchResult<
    ImportSavingsPlanQueryResponse,
    Record<string, unknown>,
    Record<string, unknown>
  >
) => {
  if (!apiResponse.data || !apiResponse.data.importGeneral?.[0]) {
    throw new Error("Empty response");
  }

  if (apiResponse.data.importGeneral[0].importStatus === errorStatus) {
    let errorMessage = "Bad request: \n";
    Object.entries(apiResponse.data.importGeneral[0]).forEach(
      ([key, value]) => {
        if (value.includes("ERROR") && key !== "importStatus") {
          errorMessage += `${key}: ${value}; \n`;
        }
      }
    );
    throw new Error(errorMessage);
  }
};