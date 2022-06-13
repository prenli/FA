import { TradableSecurity as TradableSecurityInterface } from "api/trading/useGetTradebleSecurities";
import { BuyModalContent, Card, ErrorMessage } from "components";
import { useModal } from "components/Modal/useModal";
import { BuyModalInitialData } from "components/TradingModals/BuyModalContent/BuyModalContent";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { TradableSecuritiesListBase } from "./TradableSecuritiesListBase";
import { TradableSecuritiesListSm } from "./TradableSecuritiesListSm";
import { TradableSecuritiesListXl } from "./TradableSecuritiesListXl";

interface TradableSecuritiesListProps {
  data: TradableSecurityInterface[];
}

export interface TradableSecuritiesListSized
  extends TradableSecuritiesListProps {
  onBuyModalOpen: (initialData: BuyModalInitialData) => void;
}

export interface TradableSecuritySized extends TradableSecurityInterface {
  onBuyModalOpen: (initialData: BuyModalInitialData) => void;
}

export const TradableSecuritiesList = (props: TradableSecuritiesListProps) => {
  const { t } = useModifiedTranslation();

  const isSmVersion = useMatchesBreakpoint("sm");
  const isXlVersion = useMatchesBreakpoint("xl");

  const {
    Modal,
    onOpen: onBuyModalOpen,
    modalProps: buyModalProps,
    contentProps: buyModalContentProps,
  } = useModal<BuyModalInitialData>();

  if (props.data.length === 0) {
    return (
      <ErrorMessage header={t("tradingList.noHoldings")}>
        {t("tradingList.noHoldingsInfo")}
      </ErrorMessage>
    );
  }

  return (
    <>
      <Card header={t("tradingList.header")}>
        {isXlVersion ? (
          <TradableSecuritiesListXl
            {...props}
            onBuyModalOpen={onBuyModalOpen}
          />
        ) : isSmVersion ? (
          <TradableSecuritiesListSm
            {...props}
            onBuyModalOpen={onBuyModalOpen}
          />
        ) : (
          <TradableSecuritiesListBase
            {...props}
            onBuyModalOpen={onBuyModalOpen}
          />
        )}
      </Card>
      <Modal {...buyModalProps} header={t("tradingModal.buyModalHeader")}>
        <BuyModalContent {...buyModalContentProps} />
      </Modal>
    </>
  );
};
