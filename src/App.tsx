import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Loader from "@/components/Loader";
import { scrollPageToTop } from "@/lib/scrollRoot";

const RouteScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const scrollTop = () => scrollPageToTop();

    scrollTop();
    // Re-run after route transition / lazy load so scroll isn't lost
    const t1 = window.setTimeout(scrollTop, 0);
    const t2 = window.setTimeout(scrollTop, 150);
    const t3 = window.setTimeout(scrollTop, 500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname, search, hash]);

  return null;
};

// Lazy loaded pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
/*
  About section — Phase 4 redesign.

  `pages/AboutCategory.tsx` previously served all seven `/about/*` routes from a
  single component with an inline 483-line content constant and seven different
  page branches. The content now lives in `src/content/about.ts` and each page is
  its own export, so a route no longer has to guess which layout to render.

  `pages/Team.tsx` is superseded by the `Team` export below.

The old files are intentionally left on disk (unreferenced) rather than deleted,
  so the previous implementations remain available for comparison. They are no
  longer imported by the router.
*/
const WhoWeAre = lazy(() => import("./pages/about/WhoWeAre"));

/*
  One module, five page exports. React.lazy needs a default export per chunk, so
  each is wrapped individually while still sharing a single bundle.
*/
const WayWeWork = lazy(() =>
  import("./pages/about/AboutPages").then((m) => ({ default: m.WayWeWork })),
);
const WhereWeWork = lazy(() =>
  import("./pages/about/AboutPages").then((m) => ({ default: m.WhereWeWork })),
);
const FinancialReports = lazy(() =>
  import("./pages/about/AboutPages").then((m) => ({ default: m.FinancialReports })),
);
const FcraInformation = lazy(() =>
  import("./pages/about/AboutPages").then((m) => ({ default: m.FcraInformation })),
);
const Governance = lazy(() =>
  import("./pages/about/AboutPages").then((m) => ({ default: m.Governance })),
);
const SupportPartners = lazy(() =>
  import("./pages/about/AboutPages").then((m) => ({ default: m.SupportPartners })),
);
const AboutTeam = lazy(() =>
  import("./pages/about/AboutPages").then((m) => ({ default: m.Team })),
);
const Programs = lazy(() => import("./pages/Programs"));
const WhatWeDoCategory = lazy(() => import("./pages/WhatWeDoCategory"));
const Publications = lazy(() => import("./pages/Publications"));
const Stories = lazy(() => import("./pages/Stories"));
const StoryDetail = lazy(() => import("./pages/stories/StoryDetail"));
const Donate = lazy(() => import("./pages/Donate"));
const Impact = lazy(() => import("./pages/Impact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AnimatedRoutes = () => {
  const location = useLocation();

  // NOTE: Previously a fixed 800ms full-screen loading overlay was shown on
  // every route change, which made the SPA feel slow even on fast networks.
  // Pages are already lazy-loaded with a real Suspense fallback below, so the
  // artificial delay was removed — navigation now feels instant.

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/about/who-we-are" element={<PageTransition><WhoWeAre /></PageTransition>} />
        <Route path="/about/way-we-work" element={<PageTransition><WayWeWork /></PageTransition>} />
        <Route path="/about/where-we-work" element={<PageTransition><WhereWeWork /></PageTransition>} />
        <Route path="/about/financial-reports" element={<PageTransition><FinancialReports /></PageTransition>} />
        <Route path="/about/fcra-information" element={<PageTransition><FcraInformation /></PageTransition>} />
        <Route path="/about/governance" element={<PageTransition><Governance /></PageTransition>} />
        <Route path="/about/support-partners" element={<PageTransition><SupportPartners /></PageTransition>} />
        <Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />
        <Route path="/what-we-do/rla" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/what-we-do/hbhc" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/what-we-do/srm" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/what-we-do/lifelong-learning" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/what-we-do/climate-crisis-sustainable-development" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        {/* Redirect old coastal ecosystem pages to the new Climate page where the content now lives */}
        <Route path="/what-we-do/coastal_ecosystem" element={<Navigate to="/what-we-do/climate-crisis-sustainable-development" replace />} />
        <Route path="/what-we-do/coastal_ecosystem.html" element={<Navigate to="/what-we-do/climate-crisis-sustainable-development" replace />} />
        
        {/* Hostinger edge caching and legacy URL aliases for Publications */}
        <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
        <Route path="/publications.html" element={<Navigate to="/publications" replace />} />
        
        <Route path="/stories" element={<PageTransition><Stories /></PageTransition>} />
        {/* Field note detail. One route pattern rather than one per slug, so
            adding a note needs no router change. */}
        <Route path="/stories/:slug" element={<PageTransition><StoryDetail /></PageTransition>} />
        <Route path="/donate" element={<PageTransition><Donate /></PageTransition>} />
        <Route path="/impact" element={<PageTransition><Impact /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/team" element={<PageTransition><AboutTeam /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

/*
  NOTE: `@tanstack/react-query` was removed from this tree.

  QueryClientProvider wrapped the entire application, but a repository-wide
  search found no useQuery, useMutation or queryClient usage anywhere — every
  data accessor in src/services/api.ts is a synchronous mock returning local
  constants. The provider was therefore shipping its runtime in the initial
  bundle for no benefit.

  Re-add it if and when a real asynchronous data source is wired up.
*/
const App = () => (
 <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/*
          NOTE: <SiteBackground /> was removed here. It had returned `null`
          since Phase 1, when the rotating yin-yang background was deleted in
          favour of the ivory canvas — so it was mounting a component that did
          nothing on every render.
        */}
        <RouteScrollToTop />
        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
 </HelmetProvider>
);

export default App;
