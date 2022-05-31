import { Button, DownloadableDocument, Grid } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { NameWithFlag } from "../../holdings/components/NameWithFlag";
import { Performance } from "./Performance";
import {
  performance1Y,
  performance3Y,
  performance5Y,
  TradableSecuritiesListSized,
  TradableSecuritySized,
} from "./TradableSecuritiesList";

export const TradableSecuritiesListXl = ({
  data: securities,
  onBuyModalOpen,
}: TradableSecuritiesListSized) => {
  const { t } = useModifiedTranslation();
  return (
    <div className="grid items-stretch grid-cols-[repeat(9,_auto)]">
      <Grid.Header>
        <span>{t("tradingList.gridHeader.name")}</span>
        <span>{t("tradingList.gridHeader.isinCode")}</span>
        <span>{t("tradingList.gridHeader.currency")}</span>
        <span>{t("tradingList.gridHeader.performance1Y")}</span>
        <span>{t("tradingList.gridHeader.performance3Y")}</span>
        <span>{t("tradingList.gridHeader.performance5Y")}</span>
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
  currency: { securityCode: currency },
  url,
  url2,
  isinCode,
  onBuyModalOpen,
  country,
}: TradableSecuritySized) => {
  const { t } = useModifiedTranslation();
  return (
    <>
      <Grid.Row key={id} className="py-2 border-t">
        <div>
          <NameWithFlag name={name} countryCode={country?.code} />
        </div>
        <div className="text-xs md:text-base font-light">{isinCode ?? "-"}</div>
        <div className="pl-2 text-base text-gray-700">{currency}</div>
        <div>
          <Performance value={performance1Y} />
        </div>
        <div>
          <Performance value={performance3Y} />
        </div>
        <div>
          <Performance value={performance5Y} />
        </div>
        <div>{url2 ? <DownloadableDocument url={url2} label="" /> : "-"}</div>
        <div>{url ? <DownloadableDocument url={url} label="" /> : "-"}</div>
        <div>
          <div className="ml-auto text-right w-[min(80px,_80%)]">
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
        </div>
      </Grid.Row>
    </>
  );
};
