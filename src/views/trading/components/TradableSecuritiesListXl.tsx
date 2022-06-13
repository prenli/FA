import { Button, DownloadableDocument, Grid } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useNavigate } from "react-router";
import { dateFromYYYYMMDD } from "utils/date";
import { NameWithFlag } from "../../holdings/components/NameWithFlag";
import {
  TradableSecuritiesListSized,
  TradableSecuritySized,
} from "./TradableSecuritiesList";

export const TradableSecuritiesListXl = ({
  data: securities,
  onBuyModalOpen,
}: TradableSecuritiesListSized) => {
  const { t } = useModifiedTranslation();
  return (
    <div className="grid items-stretch grid-cols-[repeat(8,_auto)]">
      <Grid.Header>
        <span>{t("tradingList.gridHeader.name")}</span>
        <span>{t("tradingList.gridHeader.isinCode")}</span>
        <span>{t("tradingList.gridHeader.currency")}</span>
        <span>{t("tradingList.gridHeader.price")}</span>
        <span>{t("tradingList.gridHeader.asFor")}</span>
        <span>{t("tradingList.prospectus")}</span>
        <span>{t("tradingList.kiid")}</span>
        <span>&nbsp;</span>
      </Grid.Header>
      {securities.map((security) => (
        <TradableSecurityMd
          {...security}
          key={security.id}
          onBuyModalOpen={onBuyModalOpen}
        />
      ))}
    </div>
  );
};

const TradableSecurityMd = ({
  id,
  name,
  securityCode,
  currency: { securityCode: currency },
  url,
  url2,
  isinCode,
  onBuyModalOpen,
  country,
  latestMarketData,
}: TradableSecuritySized) => {
  const navigate = useNavigate();
  const { t } = useModifiedTranslation();
  return (
    <>
      <Grid.Row key={id} className="py-2 border-t">
        <div>
          <NameWithFlag name={name} countryCode={country?.code} />
        </div>
        <div className="text-xs md:text-base font-light">{isinCode ?? "-"}</div>
        <div className="pl-2 text-base text-gray-700">{currency}</div>
        <div className="text-base font-semibold">
          {latestMarketData &&
            t("numberWithCurrency", {
              value: latestMarketData?.price,
              currency,
            })}
        </div>
        <div className="text-base font-medium text-gray-500">
          {latestMarketData &&
            t("date", { date: dateFromYYYYMMDD(latestMarketData.date) })}
        </div>
        <div>{url2 ? <DownloadableDocument url={url2} label="" /> : "-"}</div>
        <div>{url ? <DownloadableDocument url={url} label="" /> : "-"}</div>
        <div className="flex gap-2 justify-end ml-4">
          <Button
            isFullWidth
            size="xs"
            variant="Secondary"
            onClick={() => navigate(`holdings/${securityCode}`)}
          >
            {t("tradingList.detailsButton")}
          </Button>
          <Button
            isFullWidth
            size="xs"
            onClick={() =>
              onBuyModalOpen({ holdingId: id, securityName: name, url2 })
            }
          >
            {t("tradingList.buyButton")}
          </Button>
        </div>
      </Grid.Row>
    </>
  );
};
