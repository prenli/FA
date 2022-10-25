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
  useValueAveraging: boolean|undefined
) => {
  const [submitting, setSubmitting] = useState(false);
  const [handleAPITrade] = useMutation<
    ImportSavingsPlanQueryResponse,
    ImportSavingsPlanQueryVariables
  >(IMPORT_SAVINGS_PLAN_MUTATION, {
    refetchQueries: ["GetPortfolio"],
  });

  const handleSaveSavingsPlan = async () => {
    setSubmitting(true);
    try {
      const profileAttributes = [];
      if(startDate) {
        profileAttributes.push("portfolio.monthlysavings.startdate="+startDate.toISOString().split('T')[0]+":Date")
      }
      if(endDate) {
        profileAttributes.push("portfolio.monthlysavings.enddate="+endDate.toISOString().split('T')[0]+":Date")
      }
      if(savingsTargetAmount) {
        profileAttributes.push("portfolio.monthlysavings.savingsTargetAmount="+savingsTargetAmount+":Double")
      }
      if(savingsType) {
        profileAttributes.push("portfolio.monthlysavings.savingsType="+savingsType+":String")
      }
      if(useValueAveraging) {
        profileAttributes.push("portfolio.monthlysavings.useValueAveraging="+useValueAveraging+":Boolean")
      }

      const apiResponse = await handleAPITrade({
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
