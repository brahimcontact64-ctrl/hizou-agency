import { useState } from "react";
import { ChevronDown, Camera, Brush, Globe, MonitorPlay, Layout } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ServicesPage() {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const sections = [
    {
      title: t("services.creatives.title"),
      icon: Camera,
      items: [
        t("services.creatives.shooting"),
        t("services.creatives.editing"),
        t("services.creatives.script"),
        t("services.creatives.voiceover"),
      ],
    },
    {
      title: t("services.design.title"),
      icon: Brush,
      items: [
        t("services.design.logo"),
        t("services.design.flyer"),
        t("services.design.ad"),
        t("services.design.card"),
        t("services.design.book"),
        t("services.design.banner"),
        t("services.design.storefront"),
        t("services.design.wrapping"),
        t("services.design.packaging"),
      ],
    },
    {
      title: t("services.dev.title"),
      icon: Globe,
      items: [
        t("services.dev.landing"),
        t("services.dev.vitrine"),
        t("services.dev.ecommerce"),
        t("services.dev.crm"),
        t("services.dev.mobile"),
        t("services.dev.firebase"),
        t("services.dev.maintenance"),
        t("services.dev.uiux"),
      ],
    },
    {
      title: t("services.sponsoring.title"),
      icon: MonitorPlay,
      items: [t("services.sponsoring.item")],
    },
    {
      title: t("services.social.title"),
      icon: Layout,
      items: [
        t("services.social.strategy"),
        t("services.social.content"),
        t("services.social.planning"),
        t("services.social.growth"),
      ],
    },
  ];

  return (
    <section className="py-24 bg-white px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
          {t("services.mainTitle")}
        </h1>

        <div className="w-24 h-1 bg-[#F15A24] mx-auto mb-12 rounded-full"></div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {sections.map((sec, index) => {
            const isOpen = openIndex === index;
            const Icon = sec.icon;

            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden border border-[#F15A24]/20 shadow-sm"
              >
                {/* HEADER */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between py-5 px-6 bg-[#FFF1EB] hover:bg-[#FFE9DB] transition text-left"
                >
                  <div className="flex items-center gap-4 text-xl font-semibold text-[#1A1A1A]">
                    
                    {/* ORANGE ICON BOX LIKE SCREENSHOT */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center 
                      bg-gradient-to-br from-[#F15A24] to-[#ff7e50] shadow-sm">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {sec.title}
                  </div>

                  <ChevronDown
                    className={`w-6 h-6 text-[#F15A24] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* CONTENT */}
                {isOpen && (
                  <div
                    className="px-6 py-4 bg-white space-y-2 border-t border-[#F15A24]/20"
                    style={{
                      borderLeft: isRTL ? "none" : "4px solid #F15A24",
                      borderRight: isRTL ? "4px solid #F15A24" : "none",
                    }}
                  >
                    {sec.items.map((item, i) => (
                      <p key={i} className="text-[#1A1A1A] text-lg flex items-center">
                        <span className="text-[#F15A24] mx-2">•</span> {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WHATSAPP BUTTONS */}
        <div className="mt-14 flex flex-col items-center space-y-4">
          <a
            href="https://wa.me/213775643433"
            target="_blank"
            className="w-3/4 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3 rounded-xl text-center font-semibold shadow-lg transition"
          >
            {t("button.whatsapp1")}
          </a>

          <a
            href="https://wa.me/213549278411"
            target="_blank"
            className="w-3/4 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3 rounded-xl text-center font-semibold shadow-lg transition"
          >
            {t("button.whatsapp2")}
          </a>
        </div>
      </div>
    </section>
  );
}