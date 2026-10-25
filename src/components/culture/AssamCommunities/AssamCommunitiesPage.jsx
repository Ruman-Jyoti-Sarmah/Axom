import { useApp } from "@/store/AppContext";
import CULTURE_IMG from "@/data/culture/cultureImages";
import AssamCommunitiesSection from "./AssamCommunitiesSection";

export default function AssamCommunitiesPage() {
  const { t } = useApp();

  return (
    <section className="page" id="top">
      <div className="page__hero">
        <img src={CULTURE_IMG.sualkuchiHandloom} alt="" />
        <div className="page__veil" />
        <div className="page__hero-content">
          <span className="label">{t("page_handicrafts")}</span>
          <h1 className="page__title">{t("page_handicrafts_title")}</h1>
          <p className="page__tagline">{t("page_handicrafts_intro")}</p>
        </div>
      </div>

      <div className="page__body page__body--wide">
        <AssamCommunitiesSection />
      </div>
    </section>
  );
}
