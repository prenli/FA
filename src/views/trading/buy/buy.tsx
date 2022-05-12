import { HTMLAttributes, ReactNode, useState } from "react";
import { useGetBuyData } from "api/trading/useGetBuyData";
import classNames from "classnames";
import {
  Card,
  DetailsHeading,
  PortfolioSelect,
  DownloadableDocument,
  Button,
  Input,
} from "components";
import { useGetPortfolioOptions } from "hooks/useGetPortfolioOptions";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { PageLayout } from "layouts/PageLayout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";

export const BuyView = () => {
  const { t } = useModifiedTranslation();
  const { holdingId, portfolioId: urlPortfolioId } = useParams();
  const portfolioOptions = useGetPortfolioOptions(false);
  const [portfolioId, setPortfolioId] = useState(
    urlPortfolioId ? parseInt(urlPortfolioId, 10) : portfolioOptions[0].id
  );
  const {
    loading,
    data: { securityName, availableCash = 0, currency, url2 } = {},
  } = useGetBuyData(portfolioId.toString(), holdingId);

  const navigate = useNavigate();
  const [tradeAmount, setTradeAmount] = useState(0);

  const isTradeAmountCorrect = availableCash && tradeAmount <= availableCash;

  return (
    <div className="flex overflow-hidden flex-col h-full">
      <DetailsHeading onBackButtonClick={() => navigate(-1)}>
        {securityName}
      </DetailsHeading>
      <div className="overflow-y-auto grow-1">
        <PageLayout>
          <Card header={"Buy"}>
            <div className="grid gap-2 p-2">
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
                value={tradeAmount || ""}
                onChange={(event) => {
                  setTradeAmount(Number(event.currentTarget.value));
                }}
                label={
                  currency &&
                  t("tradingPage.tradeAmountInputLabel", { currency })
                }
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
                  {currency &&
                    t("numberWithCurrency", {
                      value: isTradeAmountCorrect ? tradeAmount : 0,
                      currency: currency,
                    })}
                </div>
                <Button
                  disabled={
                    tradeAmount === 0 || loading || !isTradeAmountCorrect
                  }
                >
                  Buy
                </Button>
              </div>
              <hr className="my-1" />
              <div className="text-xs text-center text-gray-600">
                Past performance is not a guide to future performance. When
                investing in financial instruments, the investor may lose all or
                part of the investments.
              </div>
            </div>
          </Card>
        </PageLayout>
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
