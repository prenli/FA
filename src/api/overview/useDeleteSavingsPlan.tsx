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

interface DeleteSavingsPlanQueryVariables {
  portfolioShortName: string;
  profileAttributes: string;
}

const errorStatus = "ERROR" as const;

interface DeleteSavingsPlanQueryResponse {
  importGeneral: ({
    importStatus: "OK" | typeof errorStatus;
  } & unknown)[];
}

export const useDeleteSavingsPlan = (
  portfolioShortName: string,
) => {
  const [deleting, setDeleting] = useState(false);
  const [handleAPISavingsPlanDelete] = useMutation<
    DeleteSavingsPlanQueryResponse,
    DeleteSavingsPlanQueryVariables
  >(IMPORT_SAVINGS_PLAN_MUTATION, {
    refetchQueries: ["GetPortfolio"],
  });

  const handleDeleteSavingsPlan = async () => {
    setDeleting(true);
    try {
      const profileAttributes = [];
      profileAttributes.push("---portfolio.monthlysavings.startdate")
      profileAttributes.push("---portfolio.monthlysavings.enddate")
      profileAttributes.push("---portfolio.monthlysavings.savingsTargetAmount")
      profileAttributes.push("---portfolio.monthlysavings.savingsType")
      profileAttributes.push("---portfolio.monthlysavings.useValueAveraging")
      profileAttributes.push("---portfolio.monthlysavings.limit")
      profileAttributes.push("---portfolio.monthlysavings.date")
      profileAttributes.push("---portfolio.monthlysavings.enable")
      profileAttributes.push("---portfolio.monthlysavings.useInvestmentPlan")
      profileAttributes.push("---portfolio.monthlysavings.amount")
      for (let i = 1; i <= 12; i++) {
        // Each individual month
        profileAttributes.push("---portfolio.monthlysavings."+i)
      }

      const apiResponse = await handleAPISavingsPlanDelete({
        variables: {
          portfolioShortName: portfolioShortName,
          profileAttributes: profileAttributes.join("#")
        },
      });

      handleBadAPIResponse(apiResponse);

      setDeleting(false);
      return apiResponse;
    } catch (e: unknown) {
      const error = e as Error | ApolloError;
      toast.error(error.message, {
        style: { whiteSpace: "pre-line" },
      });
      setDeleting(false);
      return null;
    }
  };

  return { handleDeleteSavingsPlan, deleting };
};

const handleBadAPIResponse = (
  apiResponse: FetchResult<
    DeleteSavingsPlanQueryResponse,
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