import { gql, useLazyQuery } from "@apollo/client";

const REPORT_DATA_QUERY = gql`
  query GetReportData($transactionId: String, $reportLanguage: String) {
    report(
      reportId: "Transaction confirmation (PDF)"
      reportParameters: {
        transactionId: [$transactionId]
        reportLanguage: $reportLanguage
      }
    )
  }
`;

interface ReportDataQuery {
  report: string;
}

export const useGetReportData = () => {
  const [performQuery] = useLazyQuery<ReportDataQuery>(REPORT_DATA_QUERY, {
    fetchPolicy: "no-cache",
  });
  const getReportData = async (
    transactionId: string,
    reportLanguage: string
  ) => {
    return await performQuery({
      variables: {
        transactionId,
        reportLanguage,
      },
    });
  };

  return { getReportData };
};
