import { HTMLAttributes, MutableRefObject, ReactNode, useState } from "react";
import { useGetBuyData } from "api/trading/useGetBuyData";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import classNames from "classnames";
import {
  PortfolioSelect,
  DownloadableDocument,
  Button,
  Input,
} from "components/index";
import { useGetPortfolioOptions } from "hooks/useGetPortfolioOptions";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useParams } from "react-router-dom";

export interface BuyModalInitialData {
  holdingId?: string;
  securityName?: string;
  url2?: string;
}

interface BuyModalProps extends BuyModalInitialData {
  onClose: () => void;
  modalInitialFocusRef: MutableRefObject<null>;
}

export const BuyModal = ({
  holdingId,
  securityName,
  url2,
  onClose,
  modalInitialFocusRef,
}: BuyModalProps) => {
  const { t } = useModifiedTranslation();
  const { portfolioId: urlPortfolioId } = useParams();
  const portfolioOptions = useGetPortfolioOptions(false);
  const [portfolioId, setPortfolioId] = useState(
    urlPortfolioId ? parseInt(urlPortfolioId, 10) : portfolioOptions[0].id
  );
  const { loading, data: { availableCash = 0, currency = "EUR" } = {} } =
    useGetBuyData(portfolioId.toString());

  const [tradeAmount, setTradeAmount] = useState(0);

  const isTradeAmountCorrect = availableCash && tradeAmount <= availableCash;

  return (
    <div className="grid overflow-hidden w-full h-full bg-white rounded-lg border shadow-lg">
      <div className="flex justify-between items-center p-4 md:px-6 text-2xl font-bold bg-gray-200">
        <div>Buy</div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border-2 border-transparent focus:border-primary-500 cursor-pointer outline-none hover:bg-primary-500/10"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
      </div>
      <div className="grid gap-2 p-4 md:px-6">
        <LabeledDiv
          label={t("tradingPage.securityName")}
          className="text-2xl font-semibold"
        >
          {securityName}
        </LabeledDiv>
        {url2 && (
          <div className="w-fit">
            <DownloadableDocument url={url2} label="KIID" />
          </div>
        )}
        <PortfolioSelect
          portfolioId={portfolioId}
          onChange={(newPortfolio) => setPortfolioId(newPortfolio.id)}
          includeTotal={false}
          label={t("tradingPage.portfolio")}
        />
        <LabeledDiv
          label={t("tradingPage.availableCash")}
          className="text-xl font-semibold text-gray-700"
        >
          {currency &&
            t("numberWithCurrency", {
              value: availableCash,
              currency: currency,
            })}
        </LabeledDiv>
        <Input
          ref={modalInitialFocusRef}
          value={tradeAmount || ""}
          onChange={(event) => {
            setTradeAmount(Number(event.currentTarget.value));
          }}
          label={t("tradingPage.tradeAmountInputLabel", {
            currency: currency,
          })}
          type="number"
          error={
            !isTradeAmountCorrect && !loading
              ? t("tradingPage.tradeAmountInputError")
              : undefined
          }
        />
        <hr className="my-2" />
        <div className="flex flex-col gap-4 items-stretch ">
          <div className="text-3xl font-semibold text-center">
            <div className="text-base font-normal">
              {t("tradingPage.tradeAmount")}
            </div>
            {t("numberWithCurrency", {
              value: isTradeAmountCorrect ? tradeAmount : 0,
              currency,
            })}
          </div>
          <Button
            disabled={tradeAmount === 0 || loading || !isTradeAmountCorrect}
          >
            Buy
          </Button>
        </div>
        <hr className="my-1" />
        <div className="text-xs text-center text-gray-600 max-w-[375px]">
          Past performance is not a guide to future performance. When investing
          in financial instruments, the investor may lose all or part of the
          investments.
        </div>
      </div>
    </div>
  );
};

interface LabeledDivProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}

const LabeledDiv = ({
  label,
  children,
  className,
  ...rest
}: LabeledDivProps) => (
  <div className={classNames(className, "leading-7")} {...rest}>
    <div className="text-sm font-normal">{label}</div>
    {children}
  </div>
);
