import React, { ReactNode, useMemo } from "react";
import { SECURITY_TYPE } from "api/enums";
import { assertUnreachable, SecurityPosition, SecurityType } from "api/types";
import { TranslationText } from "components";

const securityTypeDisplayOrder = [
  SECURITY_TYPE.STOCK,
  SECURITY_TYPE.BOND,
  SECURITY_TYPE.ETF,
  SECURITY_TYPE.FUND,
  SECURITY_TYPE.CURRENCY,
];

export interface TypeSecuritiesGroup {
  type: SecurityType;
  label: ReactNode;
  securities: SecurityPosition[];
}

export const useGroupedSecuritiesByType = (securities: SecurityPosition[]) => {
  return useMemo(() => {
    const grouped: TypeSecuritiesGroup[] = [];

    securities.forEach((security) => {
      const securityType = security.security.type.code;
      let indexOfGrouped = grouped.findIndex(
        (group) => group.type === securityType
      );
      if (indexOfGrouped === -1) {
        indexOfGrouped = grouped.length;
        grouped.push({
          type: securityType,
          label: getSecurityTypeLabel(securityType),
          securities: [],
        });
      }
      grouped[indexOfGrouped].securities.push(security);
    });
    return sortSecuritiesGroupByTypeOrder(grouped);
  }, [securities]);
};
const getSecurityTypeLabel = (securityType: SecurityType) => {
  switch (securityType) {
    case SECURITY_TYPE.STOCK:
      return <TranslationText translationKey="securities.type.stock.plural" />;
    case SECURITY_TYPE.ETF:
      return <TranslationText translationKey="securities.type.ETF.plural" />;
    case SECURITY_TYPE.BOND:
      return <TranslationText translationKey="securities.type.bond.plural" />;
    case SECURITY_TYPE.FUND:
      return <TranslationText translationKey="securities.type.fund.plural" />;
    case SECURITY_TYPE.CURRENCY:
      return <TranslationText translationKey="securities.type.cash.plural" />;
    default:
      assertUnreachable(securityType);
      return <TranslationText translationKey="securities.type.other.plural" />;
  }
};

const sortSecuritiesGroupByTypeOrder = (grouped: TypeSecuritiesGroup[]) =>
  grouped.sort(({ type: typeA }, { type: typeB }) => {
    if (securityTypeDisplayOrder.indexOf(typeA) === -1) {
      return 1;
    }
    if (securityTypeDisplayOrder.indexOf(typeB) === -1) {
      return -1;
    }
    return (
      securityTypeDisplayOrder.indexOf(typeA) -
      securityTypeDisplayOrder.indexOf(typeB)
    );
  });
