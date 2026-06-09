import { HomeActions } from "@/components/home/HomeActions";
import { HomeBackground } from "@/components/home/HomeBackground";
import { HomeEcosystemCards } from "@/components/home/HomeEcosystemCards";
import { HomeFooterBar } from "@/components/home/HomeFooterBar";
import { HomeHeroTitle } from "@/components/home/HomeHeroTitle";
import { HomeSideRails } from "@/components/home/HomeSideRails";
import { HomeTopNav } from "@/components/home/HomeTopNav";

export function SantuarioHomeViewport() {
  return (
    <section className="home-viewport">
      <HomeBackground />
      <HomeTopNav />
      <HomeSideRails />

      <div className="home-composition">
        <HomeHeroTitle />
        <HomeEcosystemCards />
        <HomeActions />
      </div>

      <HomeFooterBar />
    </section>
  );
}
