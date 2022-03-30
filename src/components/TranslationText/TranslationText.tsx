import { useModifiedTranslation } from "hooks/useModifiedTranslation";

interface Props {
  translationKey: string;
}

export const TranslationText = ({ translationKey }: Props) => {
  const { t } = useModifiedTranslation();

  return <>{t(translationKey)}</>;
};
