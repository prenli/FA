import { useReducer } from "react";
import { Transition } from "@headlessui/react";
import { ReactComponent as ChevronDown } from "assets/chevron-down.svg";
import { ReactComponent as ChevronUp } from "assets/chevron-up.svg";
import classNames from "classnames";
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

export const TradableSecuritiesListBase = ({
  data: securities,
  onBuyModalOpen,
}: TradableSecuritiesListSized) => {
  const { t } = useModifiedTranslation();
  return (
    <div className="grid grid-cols-4 items-center">
      <Grid.Header>
        <span>{t("tradingList.gridHeader.currency")}</span>
        <span>{t("tradingList.gridHeader.performance1Y")}</span>
        <span>{t("tradingList.gridHeader.performance3Y")}</span>
        <span>{t("tradingList.gridHeader.performance5Y")}</span>
      </Grid.Header>
      {securities.map((security) => (
        <TradableSecurityBase
          {...security}
          key={security.id}
          onBuyModalOpen={onBuyModalOpen}
        />
      ))}
    </div>
  );
};

const TradableSecurityBase = ({
  id,
  name,
  isinCode,
  currency: { securityCode: currency },
  url,
  url2,
  onBuyModalOpen,
}: TradableSecuritySized) => {
  const { t } = useModifiedTranslation();
  const [expanded, toggleExpanded] = useReducer((state) => !state, false);
  return (
    <>
      <Grid.Row
        key={`${id}_top`}
        className="pt-2 border-t"
        onClick={toggleExpanded}
      >
        <div className="flex col-span-4 gap-2 justify-between items-center">
          <div className="text-lg font-semibold leading-5 text-gray-900 truncate">
            {name}
          </div>
          <div>
            {expanded ? (
              <ChevronUp className="ml-auto text-gray-600 stroke-gray-500 w-[20px] h-[20px]" />
            ) : (
              <ChevronDown className="ml-auto text-gray-600 stroke-gray-500 w-[20px] h-[20px]" />
            )}
          </div>
        </div>
      </Grid.Row>
      <Grid.Row
        key={`${id}_bottom`}
        className={classNames({ "pb-2": !expanded })}
        onClick={toggleExpanded}
      >
        <div className=" text-base text-gray-700">{currency}</div>
        <div>
          <Performance value={performance1Y} />
        </div>
        <div>
          <Performance value={performance3Y} />
        </div>
        <div>
          <Performance value={performance5Y} />
        </div>
      </Grid.Row>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="grid col-span-4 grid-flow-col auto-cols-fr gap-2 items-center px-2 pt-1 pb-2 border-t-transparent"
        show={expanded}
      >
        <div className="col-span-2 text-base font-light">{isinCode}</div>
        <div className="sm:flex col-span-2 justify-around">
          <div className="w-fit">
            {url2 && (
              <DownloadableDocument url={url2} label={t("tradingList.kiid")} />
            )}
          </div>
          <div className="w-fit">
            {url && (
              <DownloadableDocument
                url={url}
                label={t("tradingList.prospectus")}
              />
            )}
          </div>
        </div>
        <div className="text-right">
          <Button
            isFullWidth
            size="md"
            onClick={() =>
              onBuyModalOpen({ holdingId: id, securityName: name, url2 })
            }
          >
            {t("tradingList.buyButton")}
          </Button>
        </div>
      </Transition>
    </>
  );
};
