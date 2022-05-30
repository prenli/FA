import { useReducer } from "react";
import { Transition } from "@headlessui/react";
import { ReactComponent as ChevronDown } from "assets/chevron-down.svg";
import { ReactComponent as ChevronUp } from "assets/chevron-up.svg";
import { Button, DownloadableDocument, Grid } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { Performance } from "./Performance";
import {
  performance1Y,
  performance3Y,
  performance5Y,
  TradableSecuritiesListSized,
  TradableSecuritySized,
} from "./TradableSecuritiesList";

export const TradableSecuritiesListSm = ({
  data: securities,
  onBuyModalOpen,
}: TradableSecuritiesListSized) => {
  const { t } = useModifiedTranslation();
  return (
    <div className="grid items-stretch grid-cols-[repeat(6,_auto)]">
      <Grid.Header>
        <span>{t("tradingList.gridHeader.name")}</span>
        <span>{t("tradingList.gridHeader.currency")}</span>
        <span>{t("tradingList.gridHeader.performance1Y")}</span>
        <span>{t("tradingList.gridHeader.performance3Y")}</span>
        <span>{t("tradingList.gridHeader.performance5Y")}</span>
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
}: TradableSecuritySized) => {
  const { t } = useModifiedTranslation();
  const [expanded, toggleExpanded] = useReducer((state) => !state, false);
  return (
    <>
      <Grid.Row key={id} className="py-2 border-t" onClick={toggleExpanded}>
        <div className="text-lg font-semibold leading-5 text-gray-900 truncate">
          {name}
        </div>
        <div className="text-base text-gray-700">{currency}</div>
        <div>
          <Performance value={performance1Y} />
        </div>
        <div>
          <Performance value={performance3Y} />
        </div>
        <div>
          <Performance value={performance5Y} />
        </div>
        <div>
          {expanded ? (
            <ChevronUp className="ml-auto text-gray-600 stroke-gray-500 w-[20px] h-[20px]" />
          ) : (
            <ChevronDown className="ml-auto text-gray-600 stroke-gray-500 w-[20px] h-[20px]" />
          )}
        </div>
      </Grid.Row>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="grid col-span-6 grid-flow-col auto-cols-fr gap-2 items-center px-2 pb-2 border-t-transparent"
        show={expanded}
      >
        <div className="text-base font-light">{isinCode}</div>

        <div className="mx-auto ">
          {url2 && (
            <DownloadableDocument url={url2} label={t("tradingList.kiid")} />
          )}
        </div>
        <div className="mx-auto">
          {url && (
            <DownloadableDocument
              url={url}
              label={t("tradingList.prospectus")}
            />
          )}
        </div>
        <div
          className="text-right"
          onClick={() =>
            onBuyModalOpen({ holdingId: id, securityName: name, url2 })
          }
        >
          <Button size="md">{t("tradingList.buyButton")}</Button>
        </div>
      </Transition>
    </>
  );
};
