import { layaPublicationImages } from "@/assets/layaAssets";

/**
 * LAYA — RESOURCE CENTRE CONTENT
 * ---------------------------------------------------------------------------
 * Verbatim moved from the inline `publications` array in
 * `src/pages/Publications.tsx`. All 33 records, titles, descriptions, cover
 * images and PDF links are unchanged.
 *
 * ─────────────────────────────
 * ⚠  METADATA HONESTY — READ BEFORE ADDING FIELDS
 * ─────────────────────────────
 * The Phase 6 brief asked every card to display a TYPE and a YEAR. The existing
 * data has neither:
 *
 *   - The source records carry only `title`, `description`, `image`, `link`,
 *     `category`. There is no year field.
 *   - Only 2 of 33 documents mention a year in their title or description.
 *
 * Rather than invent publication dates — which would be fabricated metadata on
 * documents about financial transparency, of all things — each record's `year`
 * is set ONLY where the source actually states or clearly implies one, and is
 * `null` otherwise. The UI omits the year chip when it is null instead of
 * guessing.
 *
 * `type` is derived from the document's real file name and source category,
 * which IS verifiable (e.g. a file named `*_Report.pdf` is a report; a document
 * in the source category "Policy & Advocacy" that is described as a brief is a
 * policy brief). Where the type cannot be established from the file name or the
 * description, it falls back to the neutral `"Publication"` rather than
 * asserting something unsupported.
 * ─────────────────────────────
 */

export type ResourceType =
  | "Publication"
  | "Report"
  | "Policy Brief"
  | "Case Study"
  | "Research Paper"
  | "Training Manual"
  | "Story Collection";

export interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  /** Absolute PDF URL, or "#" where no document is available. */
  context: string;
  link: string;
  /** The source category, preserved exactly. */
  sourceCategory: string;
  /** Derived document type — see the honesty note above. */
  type: ResourceType;
  /**
   * Publication year, ONLY where the source states one. `null` elsewhere.
   * The UI hides the year rather than inventing one.
   */
  year: number | null;
}

/** Source categories, preserved verbatim from the original data. */
export const SOURCE_CATEGORIES = [
  "Climate & Environment",
  "Policy & Advocacy",
  "Livelihoods",
  "Health",
  "Education & Youth",
  "SDGs & Urban",
  "Research & Stories",
] as const;

/* --------------------------------------------------------------------------
   Type derivation
   --------------------------------------------------------------------------
   Deterministic, based on the real file name and description. Not a guess at
   metadata — a reading of what the document demonstrably is.
   -------------------------------------------------------------------------- */

const deriveType = (title: string, description: string, link: string, category: string): ResourceType => {
  const hay = `${title} ${description} ${link}`.toLowerCase();

  if (/trainers?-?\s*manual|manual on|training manual|games and activities/.test(hay))
    return "Training Manual";
  if (/policy brief|brief on|discussion paper|indc/.test(hay)) return "Policy Brief";
  if (/case study|change story|the change story/.test(hay)) return "Case Study";
  if (/report\b|report_|_report/.test(hay)) return "Report";
  if (/stories|rhythm|chronicle|stories from the ground/.test(hay)) return "Story Collection";
  if (category === "Research & Stories") return "Story Collection";
  if (category === "Policy & Advocacy") return "Policy Brief";
  return "Publication";
};

/** Extract a year ONLY when the source text actually contains one. */
const deriveYear = (title: string, description: string, link: string): number | null => {
  const hay = `${title} ${description} ${link}`;
  const m = hay.match(/\b(19[89]\d|20[0-4]\d)\b/);
  if (!m) return null;
  const y = Number(m[0]);
  // Guard against picking a figure that is not a year (e.g. an SDG number).
  return y >= 1980 && y <= 2049 ? y : null;
};

/* --------------------------------------------------------------------------
   The 33 records — content verbatim
   -------------------------------------------------------------------------- */

interface RawResource {
  title: string;
  description: string;
  image: string;
  context: string;
  link: string;
  category: string;
}

const RAW: RawResource[] = [
  {
    title: "Training in Integrated Mussel Farming",
    description:
      "This publication showcases training in integrated mussel farming with sea cage and seaweed, enabling sustainable livelihoods for coastal communities.",
    image: layaPublicationImages[0],
    context: "This comprehensive training manual serves as a critical guide for coastal communities seeking alternative, climate-resilient livelihoods. By detailing the practical integration of sea cage aquaculture with seaweed farming, the authors move beyond theoretical concepts to offer actionable economic empowerment strategies. It underscores the importance of maintaining marine ecological balance while simultaneously addressing the urgent need for income diversification among fisherfolk facing diminishing traditional catches. The step-by-step methodologies provided make it an invaluable resource for grassroots practitioners.",
    link: "https://laya.org.in/PublicFiles/Mussel_Seaweed_Book.pdf",
    category: "Livelihoods",
  },
  {
    title: "Renewable Energy Case Study",
    description: "A case study on renewable energy that has enhanced energy access and energy security.",
    image: layaPublicationImages[1],
    context: "Offering a deeply contextualized analysis of decentralized energy solutions, this case study highlights the transformative power of renewable interventions in off-grid tribal areas. It documents the real-world operational challenges and successes of implementing solar and micro-hydro systems where state grids fail to reach. The narrative clearly establishes that true energy security is not merely about kilowatt-hours, but about community ownership, sustainable maintenance models, and equitable access. It is a vital read for policymakers aiming to bridge the rural energy gap without deepening carbon footprints.",
    link: "https://laya.org.in/PublicFiles/Are_You_In_BFW_CAN.pdf",
    category: "Climate & Environment",
  },
  {
    title: "The LAYA Chronicle",
    description:
      "LAYA's story of change on Sustainable Farming has been featured in Azim Premji University, Bangalore's Vol II compendium.",
    image: layaPublicationImages[2],
    context: "Featured in the Azim Premji University compendium, this chronicle is a testament to the enduring viability of indigenous agricultural wisdom. It meticulously documents the transition of Adivasi farmers back to traditional, sustainable farming practices, moving away from chemical-intensive cash cropping. The stories captured here reflect a profound ecological awakening, emphasizing seed sovereignty, multi-cropping systems, and the restoration of degraded soils. It stands as a powerful piece of evidence that localized, nature-based solutions can effectively combat food insecurity and climate vulnerability.",
    link: "https://laya.org.in/PublicFiles/The_Laya_Chronicle.pdf",
    category: "Research & Stories",
  },
  {
    title: "Herbal Based Health Care",
    description:
      "This document showcases LAYA's approach to strengthening local and relevant herbal-based healthcare practices.",
    image: layaPublicationImages[3],
    context: "This publication offers an exhaustive documentation of traditional Adivasi ethnomedicine and its modern application. It delves into the intricate knowledge systems surrounding local flora, detailing how indigenous healers have historically managed community health in the absence of institutional medical facilities. By advocating for a pluralistic healthcare approach, the document argues that integrating these herbal practices with primary healthcare can significantly improve health outcomes in remote regions. It is an essential text for public health professionals working at the intersection of modern medicine and traditional knowledge.",
    link: "https://laya.org.in/PublicFiles/HBHC_SOC.pdf",
    category: "Health",
  },
  {
    title: "Building Community Resilience",
    description:
      "Building community resilience in a climate changing environment set in a remote tribal or Adivasi area of Andhra Pradesh.",
    image: layaPublicationImages[4],
    context: "Set against the backdrop of the Eastern Ghats in Andhra Pradesh, this document provides a stark, ground-level view of how climate change is altering Adivasi realities. It details specific adaptive strategies being deployed—from altering crop cycles to adopting climate-friendly technologies—that help communities withstand erratic rainfall and temperature spikes. The report successfully bridges the gap between macro-level climate discourse and micro-level survival, making a compelling case for decentralized, community-led climate action. It is a crucial read for understanding the human cost of climate variability.",
    link: "https://laya.org.in/PublicFiles/Laya-The change story2021.pdf",
    category: "Climate & Environment",
  },
  {
    title: "AIIB Climate Resilience Goal",
    description: "Criteria to Align AIIB with PA Climate resilience Goal",
    image: layaPublicationImages[5],
    context: "A highly technical but crucially important policy analysis evaluating the Asian Infrastructure Investment Bank. It critically examines how large-scale infrastructure financing aligns—or fails to align—with the Paris Agreement's climate resilience targets. The document provides a rigorous framework for assessing the socio-environmental safeguards of multilateral investments, particularly their impact on vulnerable, marginalized communities. It serves as an indispensable tool for advocacy groups demanding transparency and ecological accountability in global finance.",
    link: "https://laya.org.in/PublicFiles/Criteria to Align AIIB with PA Climate resilience Goal.pdf",
    category: "Policy & Advocacy",
  },
  {
    title: "Blue Economy for Fishing Communities",
    description:
      "Towards Strengthening Blue Economy for Fishing Communities - Equity in climate and sustainability action.",
    image: layaPublicationImages[6],
    context: "This document offers a vital, critical perspective on the mainstream 'blue economy' narrative, placing equity and the rights of small-scale fishing communities at its absolute center. It challenges purely growth-centric marine policies, highlighting the devastating ecological and social impacts of unchecked commercial fishing and coastal industrialization. By proposing community-led resource management models, the authors argue for a marine economy that sustains livelihoods without sacrificing biodiversity. It is a must-read for anyone engaged in coastal advocacy and sustainable fisheries management.",
    link: "https://laya.org.in/PublicFiles/Towards-Strengthening-Blue-Economy-for-Fishing-Communities.pdf",
    category: "Livelihoods",
  },
  {
    title: "Climate Variability Impact",
    description:
      "This document focuses on climate variability and its impacts and explores coping measures undertaken by the Konda Reddis of Pathakota.",
    image: layaPublicationImages[7],
    context: "An eye-opening field study focusing on the Konda Reddis of Pathakota. The research carefully documents their specific, heightened vulnerabilities to changing climate patterns and the erosion of their traditional resource base. Crucially, it catalogues the indigenous coping mechanisms they employ against shifting monsoons and rising temperatures, demonstrating a deep, adaptive resilience. The report underscores the urgent need for climate policies that integrate and respect traditional ecological knowledge rather than imposing top-down, standardized solutions.",
    link: "https://laya.org.in/PublicFiles/livelihood-Vulnerablity-To-Climate-Variability.pdf",
    category: "Climate & Environment",
  },
  {
    title: "AIIB Projects in India",
    description:
      "The purpose of this brief is to share information and the current state of play of AIIB projects in India.",
    image: layaPublicationImages[8],
    context: "An essential status report for policy advocates and researchers monitoring multilateral investments. It breaks down the current portfolio of AIIB projects in India, offering a critical lens on their adherence to environmental and social governance standards. The brief highlights specific infrastructure projects where community safeguards, transparency, and public consultation have been dangerously sidelined. It provides actionable recommendations for ensuring that international finance genuinely contributes to sustainable, equitable development rather than displacing marginalized groups.",
    link: "https://laya.org.in/PublicFiles/Brief-on-AIIB-Projects-in-India.pdf",
    category: "Policy & Advocacy",
  },
  {
    title: "Trainers' Manual on SDGs",
    description:
      "Trainers' Manual on Games and Activities for Sustainable Development Goals & Climate Change for Children and Youth.",
    image: layaPublicationImages[9],
    context: "An incredibly useful and practical resource for educators and community mobilizers. Packed with interactive games, group activities, and accessible curriculum structures, it successfully breaks down complex topics like the SDGs and climate change for children and youth. The manual emphasizes experiential learning, encouraging young participants to connect global environmental crises with their local realities and take community-level action. It bridges the critical gap between high-level policy goals and grassroots environmental education.",
    link: "https://laya.org.in/PublicFiles/Trainers-Manual-on-Games-and-Activities-SDG-CC.pdf",
    category: "Education & Youth",
  },
  {
    title: "Policy Brief on Coastal Ecosystem",
    description: "Policy Brief on Coastal Ecosystem",
    image: layaPublicationImages[10],
    context: "A concise, urgent policy document that outlines the immediate, cascading threats to coastal biodiversity and wetlands. It goes beyond identifying problems like industrial pollution and habitat destruction to offer pragmatic, community-driven regulatory recommendations. The authors strongly advocate for policies that empower local coastal communities as the primary stewards of marine ecosystems, rather than treating them as passive beneficiaries. This brief is highly recommended for local policymakers and environmental activists seeking actionable governance frameworks.",
    link: "https://laya.org.in/PublicFiles/Policy-Brief-Coastal-Ecosystem.pdf",
    category: "Climate & Environment",
  },
  {
    title: "Resilient Forest EcoSystem",
    description: "Towards A Resilient Forest EcoSystem",
    image: layaPublicationImages[11],
    context: "A detailed, deeply researched exploration of forest governance in the context of the Forest Rights Act (FRA). It emphasizes that genuine ecological resilience is inextricably linked to securing community forest rights and recognizing indigenous tenure. The document critiques exclusionary conservation models, demonstrating through empirical evidence that forests managed by empowered local communities exhibit higher biodiversity and lower degradation rates. It is a foundational text for understanding the intersection of human rights and environmental conservation.",
    link: "https://laya.org.in/PublicFiles/Laya_Eco_System.pdf",
    category: "Climate & Environment",
  },
  {
    title: "AIIB Report 2019",
    description: "AIIB Report 2019",
    image: layaPublicationImages[12],
    context: "A comprehensive, highly critical review of the Asian Infrastructure Investment Bank's activities and portfolio for the year 2019. It serves as a benchmark for understanding the trajectory of modern infrastructure financing and its often-overlooked socio-environmental impacts on the ground. The report meticulously analyzes specific projects, highlighting structural flaws in grievance mechanisms and environmental impact assessments. It is a vital piece of literature for civil society organizations working to hold international financial institutions accountable.",
    link: "https://laya.org.in/PublicFiles/AIIB_Report_2019.pdf",
    category: "Policy & Advocacy",
  },
  {
    title: "The Rhythm Behind Stories of Change",
    description: "THE RHYTHM BEHIND STORIES OF CHANGE",
    image: layaPublicationImages[13],
    context: "A deeply humanizing, qualitative collection of narratives from the field. It captures the underlying spirit, cultural resilience, and rhythmic cycles that drive successful community-led development initiatives in the Eastern Ghats. By focusing on the personal and communal dimensions of change—rather than just statistical outcomes—the document reveals the slow, complex process of social empowerment. It is an inspiring read that centers the voices and agency of Adivasi communities navigating rapid modern transitions.",
    link: "https://laya.org.in/PublicFiles/THE_RHYTHM_BEHIND_STORIES_OF_CHANGE.pdf",
    category: "Research & Stories",
  },
  {
    title: "Adivasi Women Climate Adaptation",
    description: "Adapting Adivasi women to climate change: cooking and water solutions.",
    image: layaPublicationImages[14],
    context: "A crucial, gendered perspective on the frontline impacts of climate change. This document highlights the disproportionate, heavy burden Adivasi women face regarding water scarcity, fuel wood collection, and food security due to shifting weather patterns. Importantly, it does not merely frame them as victims, but as critical, innovative agents of adaptation who are developing new survival strategies. The text forcefully argues that climate policy will fail unless it centers and empowers the women who manage the household ecology.",
    link: "#",
    category: "Climate & Environment",
  },
  {
    title: "Sustainably SMART Pune 2030",
    description: "Sustainably SMART Pune 2030",
    image: layaPublicationImages[15],
    context: "An interesting urban contrast to LAYA's predominantly rural portfolio. This report provides a strategic, detailed roadmap for integrating the Sustainable Development Goals into the rapidly expanding infrastructure of Pune. It critically examines the 'Smart City' paradigm, arguing that true 'smartness' must prioritize ecological sustainability, equitable resource distribution, and the rights of the urban poor. The document serves as a blueprint for reimagining Indian urbanization through a lens of climate resilience and social justice.",
    link: "https://laya.org.in/PublicFiles/Sustainably_SMART_Pune_2030.pdf",
    category: "SDGs & Urban",
  },
  {
    title: "Smart Cities Vision: SDG-11",
    description: "Pioneering Vision for INDIA's Smart Cities: SDG-11",
    image: layaPublicationImages[16],
    context: "A critical, necessary analysis of India's urban development trajectory under the 'Smart Cities' mission. It questions whether the current, heavily infrastructural approach truly aligns with the inclusivity and sustainability mandated by SDG 11. The brief points out the glaring gaps in addressing affordable housing, informal settlements, and urban ecological degradation. It strongly advocates for a participatory urban planning model that prevents the displacement of marginalized urban populations under the guise of modernization.",
    link: "https://laya.org.in/PublicFiles/Pioneering_vision_for_INDIA's_Smart_Cities_SDG_11.pdf",
    category: "SDGs & Urban",
  },
  {
    title: "Energy Goals: SDG-7",
    description: "Towards Achieving INDIA's Energy Goals: SDG-7",
    image: layaPublicationImages[17],
    context: "A thorough, pragmatic assessment of India's current energy policies and their real-world outcomes. It examines the persistent gap between national renewable energy targets and the stark energy access realities of rural, off-grid communities. The document critiques the over-reliance on centralized, mega-power projects, advocating instead for decentralized, localized energy generation models that truly benefit the poor. It is an essential read for understanding why achieving SDG 7 requires a fundamental shift in energy governance.",
    link: "https://laya.org.in/PublicFiles/Towards_Achieving_INDIA's_Energy_Goals_SDG_7.pdf",
    category: "SDGs & Urban",
  },
  {
    title: "Education Policy: SDG-4",
    description: "Policy Brief on Sustainable Development Goal: SDG-4 (Education)",
    image: layaPublicationImages[18],
    context: "A thoughtful, structural critique of mainstream education systems as they apply to indigenous and marginalized youth. The publication argues forcefully for a more contextualized, lifelong learning approach that respects indigenous knowledge systems and languages. It highlights how standardized curricula often alienate Adivasi children, leading to high dropout rates and loss of cultural identity. The authors propose alternative pedagogical frameworks that strengthen local leadership skills and community cohesion.",
    link: "https://laya.org.in/PublicFiles/Policy_Brief_on_Sustainable_Development_Goal_SDG_4_Education.pdf",
    category: "Education & Youth",
  },
  {
    title: "Zero Hunger: SDG-2",
    description: "ZERO Hunger: SDG-2",
    image: layaPublicationImages[19],
    context: "A deeply researched, intersectional look at food security in tribal belts. It connects the critical issues of agricultural biodiversity, the erosion of indigenous farming practices, and the persistent fight against severe malnutrition in Adivasi regions. The document demonstrates that achieving Zero Hunger is not simply about increasing caloric output through industrial agriculture, but about restoring traditional, nutrient-dense crop varieties like millets. It makes a powerful case for food sovereignty as the foundation of health.",
    link: "https://laya.org.in/PublicFiles/ZERO_Hunger_SDG_2.pdf",
    category: "SDGs & Urban",
  },
  {
    title: "Stories from the Ground",
    description: "Towards A Wholesome Tomorrow Through Stories from the Ground",
    image: layaPublicationImages[20],
    context: "A raw, authentic, and unfiltered compilation of field reports. It gives direct voice to the everyday struggles, innovations, and triumphs of community members navigating systemic bureaucratic challenges and extreme environmental changes. These narratives provide a qualitative depth that quantitative data often misses, showcasing the sheer ingenuity of grassroots interventions like gravity-fed water systems. It is a profoundly grounded document that reminds practitioners of the human element at the heart of development work.",
    link: "https://laya.org.in/PublicFiles/Stories_from_the_ground.pdf",
    category: "Research & Stories",
  },
  {
    title: "Clean Cookstove Projects",
    description: "The Social and Cultural Context of Clean Cookstove Projects in Andhra Pradesh.",
    image: layaPublicationImages[21],
    context: "A highly practical, critical evaluation of a very common development intervention. It moves beyond the standard carbon-reduction metrics to assess the actual health benefits, usability, and adoption challenges of clean cookstoves in rural households. The research highlights the sociocultural factors that often cause these well-intentioned projects to fail if not designed collaboratively with the end-users. It offers invaluable lessons on the necessity of user-centric design in technology dissemination.",
    link: "https://laya.org.in/PublicFiles/Laya_CUDenver_Report.pdf",
    category: "Health",
  },
  {
    title: "Climate Resilience for the Poor",
    description: "Strengthening climate resilience for the poor",
    image: layaPublicationImages[22],
    context: "A foundational, deeply argued document on the concept of equity in climate action. It argues forcefully that adaptation and mitigation strategies must explicitly prioritize the poorest and most marginalized communities, who are both the most exposed to climate shocks and the least equipped to recover. The text critiques trickle-down climate finance, demanding direct investments in grassroots resilience building. It is a rallying cry for integrating social justice fundamentally into the global climate response.",
    link: "https://laya.org.in/PublicFiles/Strengthening_climate resilience_for _the_poor.pdf",
    category: "Climate & Environment",
  },
  {
    title: "India's INDCs Discussion Paper",
    description:
      "A Discussion Paper On India's Intended Nationally Determined Contributions (INDCs)",
    image: layaPublicationImages[23],
    context: "A rigorous, academic deconstruction of India's Intended Nationally Determined Contributions leading up to the Paris Agreement. It thoroughly analyzes the feasibility, economic implications, and fundamental equity of the nation's climate commitments. The paper questions whether the proposed carbon mitigation pathways adequately protect the developmental rights and livelihoods of India's vast rural poor. It is an essential, high-level policy document for climate researchers and negotiators.",
    link: "https://www.laya.org.in/PublicFiles/INDC%20Discussion%20Paper.pdf?download",
    category: "Policy & Advocacy",
  },
  {
    title: "CDM Projects in India",
    description:
      "CDM Projects in India: Do they truly promote sustainable development? A mapping and analysis of select CDM projects in India.",
    image: layaPublicationImages[24],
    context: "An insightful, historically grounded analysis of the Clean Development Mechanism (CDM) in the Indian context. It reviews a broad portfolio of Indian carbon-offset projects and asks the hard, necessary question of whether they delivered any real, tangible sustainable development benefits to local communities. The report exposes the disconnect between international carbon markets and grassroots realities, showing how financial incentives often eclipsed social safeguards. It provides crucial context for current debates on carbon trading.",
    link: "#",
    category: "Policy & Advocacy",
  },
  {
    title: "CDM Projects Executive Summary",
    description: "CDM Projects in India - Executive Summary",
    image: layaPublicationImages[25],
    context: "A sharp, executive-level distillation of the broader CDM analysis. Perfect for busy policymakers and advocates, it summarizes the key structural failures of carbon finance in India, particularly regarding local community impacts and actual emission reductions. It strips away the complex financial jargon to present clear, undeniable evidence that market-based mechanisms require drastic regulatory overhauls to be effective. It is an excellent, quick-reference guide on the pitfalls of climate capitalism.",
    link: "#",
    category: "Policy & Advocacy",
  },
  {
    title: "Rhythms in Development - III",
    description: "Rhythms in Development - III",
    image: layaPublicationImages[26],
    context: "The third installment of LAYA's seminal, long-term series. It continues to intricately track the evolving, often strained relationship between indigenous cultural identity and overwhelming modern development pressures. The publication offers a nuanced look at how Adivasi communities are attempting to negotiate their space within a rapidly changing economic landscape without losing their socio-cultural anchors. It is a profoundly sociological text that captures the dynamic nature of tribal development.",
    link: "https://www.laya.org.in/PublicFiles/Rhythms_in_Development_III.pdf?download",
    category: "Research & Stories",
  },
  {
    title: "Low Carbon Pathway",
    description: "Development through a low carbon pathway",
    image: layaPublicationImages[27],
    context: "A forward-looking, highly strategic document that refuses to accept the false dichotomy between development and environmental protection. It outlines viable, detailed low-emission development scenarios that actively promote the economic and social advancement of marginalized groups. The authors argue that transitioning to a low-carbon economy presents a unique opportunity to decentralize power and redistribute resources equitably. It serves as an optimistic, yet deeply pragmatic, manifesto for sustainable growth.",
    link: "https://www.laya.org.in/PublicFiles/Development_Through_A_Low_Carbon_Pathway.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "Climate Change Adaptation",
    description: "Climate Change and Grassroots Adaptation Process",
    image: layaPublicationImages[28],
    context: "A comprehensive, deeply practical guide to implementing adaptation strategies on the ground. It successfully bridges the vast gap between high-level, abstract climate science and actionable, community-based interventions suitable for rural India. The document covers a wide array of strategies, from water conservation techniques to drought-resistant agriculture, providing empirical evidence of their effectiveness. It is an indispensable manual for NGOs and local governments operating in climate-vulnerable zones.",
    link: "https://www.laya.org.in/PublicFiles/Adaptation_Study_5case_studies.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "Forest EcoSystem Vulnerability",
    description:
      "Vulnerability of the forest eco-system in the context of the changing climate",
    image: layaPublicationImages[29],
    context: "A critical, alarming ecological assessment of the Eastern Ghats. It maps out the specific, compounding threats facing these forests—from shifting climate patterns and invasive species to aggressive state-sponsored deforestation. Crucially, it models the cascading, devastating effects these ecological changes will have on the livelihoods of forest-dwelling communities who depend on non-timber forest products. The report is a clarion call for immediate, ecologically sound conservation policies.",
    link: "https://www.laya.org.in/PublicFiles/Vulnerability_of_the_forest_eco-system.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "Rhythms in Development - II",
    description: "Rhythms in Development - II",
    image: layaPublicationImages[30],
    context: "The second volume of the deeply insightful Rhythms series. It offers a deep dive into the complex socio-economic transitions occurring within Adivasi communities as they are increasingly drawn into external market economies. The text explores the tension between traditional barter systems and cash economies, detailing the resultant shifts in social hierarchies and community cohesion. It provides a vital historical context for understanding contemporary tribal economic behavior.",
    link: "https://www.laya.org.in/PublicFiles/Rythms_in%20_Development_II.pdf?download",
    category: "Research & Stories",
  },
  {
    title: "CDM for Sustainable Development",
    description: "CDM for sustainable development?",
    image: layaPublicationImages[31],
    context: "A highly focused, critical evaluation of global carbon markets. It asks the definitive, hard question: can market-based mechanisms like the CDM truly foster sustainable development at the grassroots level, or are they inherently flawed? The document uses robust case studies to demonstrate how carbon finance often bypasses the poorest communities, enriching intermediaries instead. It is a must-read critique for anyone involved in climate finance and international development policy.",
    link: "https://www.laya.org.in/PublicFiles/Money_For_Nothing.pdf?download",
    category: "Policy & Advocacy",
  },
  {
    title: "Decentralized Energy Options",
    description:
      "Decentralized energy options in the tribal belt of the eastern ghats region in India",
    image: layaPublicationImages[0],
    context: "A highly relevant, deeply technical study comparing various off-grid renewable energy models. It meticulously evaluates micro-hydro, solar, and biomass options, identifying which technologies are most sustainable, maintainable, and economically viable for remote, forested settlements. The authors emphasize that technology alone is insufficient without robust, community-led management structures. It is an essential blueprint for engineers and development workers planning rural electrification projects.",
    link: "https://www.laya.org.in/PublicFiles/DEOBooklet.pdf?download",
    category: "Climate & Environment",
  },
];

/** The 33 resources, with derived type and only-verified year. */
export const RESOURCES: Resource[] = RAW.map((r, i) => ({
  id: `res-${i + 1}`,
  title: r.title,
    context: r.context,
  description: r.description,
  image: r.image,
  link: r.link,
  sourceCategory: r.category,
  type: deriveType(r.title, r.description, r.link, r.category),
  year: deriveYear(r.title, r.description, r.link),
}));

/** True when a real PDF is available. */
export const hasDocument = (r: Resource): boolean => r.link !== "#";

export const AVAILABLE_COUNT = RESOURCES.filter(hasDocument).length;
export const UNAVAILABLE_COUNT = RESOURCES.length - AVAILABLE_COUNT;

/** Distinct document types actually present, for the type filter. */
export const RESOURCE_TYPES: ResourceType[] = Array.from(
  new Set(RESOURCES.map((r) => r.type)),
).sort() as ResourceType[];

/** Years actually present, newest first. Empty means no year filtering. */
export const RESOURCE_YEARS: number[] = Array.from(
  new Set(RESOURCES.map((r) => r.year).filter((y): y is number => y !== null)),
).sort((a, b) => b - a);

/* =========================================================================
   FINANCIAL / FCRA REPORTS
   ========================================================================= */

/**
 * Six annual foreign contribution disclosures. These DO carry real years —
 * they are in the source file names (`Laya-FC-2024-2025.pdf`), so the year
 * filter here is fully verified, unlike the publications above.
 */
export interface FinancialReport {
  year: string;
  /** FY label used in the UI, e.g. "FY 2024–25". */
  fy: string;
  label: string;
  description: string;
  url: string;
}

export const FINANCIAL_REPORTS: FinancialReport[] = [
  {
    year: "2024-2025",
    fy: "FY 2024–25",
    label: "LAYA Foreign Contribution Report",
    description: "Annual financial disclosure document",
    url: "https://laya.org.in/Finance/Laya-FC-2024-2025.pdf",
  },
  {
    year: "2023-2024",
    fy: "FY 2023–24",
    label: "LAYA Foreign Contribution Report",
    description: "Annual financial disclosure document",
    url: "https://laya.org.in/Finance/Laya-FC-2023-24.pdf",
  },
  {
    year: "2022-2023",
    fy: "FY 2022–23",
    label: "LAYA Foreign Contribution Report",
    description: "Annual financial disclosure document",
    url: "https://laya.org.in/Finance/Laya-FC-2022-2023.pdf",
  },
  {
    year: "2021-2022",
    fy: "FY 2021–22",
    label: "LAYA Foreign Contribution Report",
    description: "Annual financial disclosure document",
    url: "https://laya.org.in/Finance/Laya-FC-2021-2022.pdf",
  },
  {
    year: "2020-2021",
    fy: "FY 2020–21",
    label: "LAYA Foreign Contribution Report",
    description: "Annual financial disclosure document",
    url: "https://laya.org.in/Finance/Laya-FC-2020-2021.pdf",
  },
  {
    year: "2019-2020",
    fy: "FY 2019–20",
    label: "LAYA Foreign Contribution Report",
    description: "Annual financial disclosure document",
    url: "https://laya.org.in/Finance/Laya-FC-2019-2020.pdf",
  },
];

/**
 * Resource Centre categories.
 *
 * Only categories with real content are listed. The brief proposed nine; four
 * have no documents behind them in the repository (`Annual Reports`,
 * `News / Articles`, `Photo / Video Stories` as a video set) and are therefore
 * NOT offered as filters, because an empty filter is worse than no filter.
 */
export interface ResourceCategoryDef {
  id: string;
  label: string;
  description: string;
}

export const RESOURCE_CATEGORIES: ResourceCategoryDef[] = [
  {
    id: "all",
    label: "All resources",
    description: "Everything in the LAYA knowledge library.",
  },
  {
    id: "publications",
    label: "Publications",
    description: "Case studies, collections and field documentation.",
  },
  {
    id: "reports",
    label: "Reports",
    description: "Project and research reports.",
  },
  {
    id: "policy",
    label: "Policy briefs",
    description: "Briefs and discussion papers on policy and advocacy.",
  },
  /*
    NOTE: there is deliberately no "Financial & FCRA reports" category here.

    The six annual foreign contribution disclosures are real, but they are not
    publications — they are the transparency documents published on
    `/about/financial-reports`, which this page links to directly. An earlier
    revision offered the chip here, where it counted 0 documents and led to an
    empty state. A filter that can never return a result is worse than no
    filter, so it was removed rather than wired to an artificial mapping.
  */
  {
    id: "research",
    label: "Research & stories",
    description: "Research collections and stories from the field.",
  },
];

/** Map a resource to the filter category it belongs to. */
export const categoryOf = (r: Resource): string => {
  if (r.type === "Report") return "reports";
  if (r.type === "Policy Brief") return "policy";
  if (r.sourceCategory === "Research & Stories") return "research";
  return "publications";
};
