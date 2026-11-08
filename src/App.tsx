import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  Maximize2, 
  Grid, 
  RotateCcw, 
  Check,
  Eye
} from 'lucide-react';

export default function App() {
  // Page state: 1 or 2
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Studio canvas settings
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [deviceScale, setDeviceScale] = useState<number>(0.92);
  const [fullMobileMode, setFullMobileMode] = useState<boolean>(false);
  const [buttonPlacement, setButtonPlacement] = useState<'center' | 'bottom'>('center');

  // Real or fixed time for status bar
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handlers for navigation
  const handleAvanti = () => {
    setDirection(1);
    setCurrentPage(2);
  };

  const handleIndietro = () => {
    setDirection(-1);
    setCurrentPage(1);
  };

  // Animation variants for screen transitions
  const pageVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.18 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -320 : 320,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.18 },
      },
    }),
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans select-none text-neutral-900 overflow-x-hidden">
      {/* Studio Header & Controls Toolbar */}
      <header className="bg-white border-b-2 border-black px-4 lg:px-8 py-3 sticky top-0 z-50 shadow-[0_2px_0_0_#000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo / Specification */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center font-mono font-bold text-sm shadow-[2px_2px_0px_0px_#000]">
              WF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-widest uppercase">Wireframe Prototype</span>
                <span className="text-[10px] bg-black text-white px-1.5 py-0.2 font-mono font-bold rounded-none">
                  IPHONE 15
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                393 × 852 pt · Bianco & Nero
              </p>
            </div>
          </div>

          {/* Page Indicator & Direct Selector */}
          <div className="flex items-center gap-2 bg-neutral-50 border-2 border-black p-1 shadow-[2px_2px_0px_0px_#000]">
            <button
              onClick={() => {
                setDirection(-1);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 font-mono text-xs font-bold transition-all ${
                currentPage === 1
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              Pagina 1 [avanti]
            </button>
            <span className="text-neutral-400 font-mono text-xs">→</span>
            <button
              onClick={() => {
                setDirection(1);
                setCurrentPage(2);
              }}
              className={`px-3 py-1 font-mono text-xs font-bold transition-all ${
                currentPage === 2
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              Pagina 2 [indietro]
            </button>
          </div>

          {/* Studio Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Grid Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              title="Attiva/Disattiva griglia wireframe"
              className={`px-2.5 py-1.5 border-2 border-black text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                showGrid ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Griglia</span>
            </button>

            {/* Position Toggle: Center vs Bottom */}
            <button
              onClick={() => setButtonPlacement(buttonPlacement === 'center' ? 'bottom' : 'center')}
              title="Posizione bottone: Centro schermo o In basso"
              className="px-2.5 py-1.5 border-2 border-black bg-white hover:bg-neutral-100 text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <span className="text-neutral-500">Posizione:</span>
              <span className="font-bold uppercase">{buttonPlacement === 'center' ? 'Al Centro' : 'In Basso'}</span>
            </button>

            {/* Scale Selector */}
            <div className="hidden sm:flex items-center border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] text-xs font-mono">
              <span className="px-2 py-1 text-neutral-500 border-r border-black">Zoom</span>
              {[0.8, 0.9, 1.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setDeviceScale(s)}
                  className={`px-2 py-1 font-bold ${
                    deviceScale === s ? 'bg-black text-white' : 'hover:bg-neutral-100'
                  }`}
                >
                  {Math.round(s * 100)}%
                </button>
              ))}
            </div>

            {/* Mobile View Toggle */}
            <button
              onClick={() => setFullMobileMode(!fullMobileMode)}
              title="Modalità Schermo Intero Mobile"
              className={`px-2.5 py-1.5 border-2 border-black text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                fullMobileMode ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{fullMobileMode ? 'Vista Device' : 'Schermo Intero'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas Workspace */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative wireframe-dot-grid overflow-hidden">
        {/* Wireframe Canvas Background Blueprint Markers */}
        <div className="absolute top-4 left-6 text-[10px] font-mono text-neutral-400 select-none hidden lg:block">
          <div>CANVAS: IPHONE 15 / 393 × 852 PT</div>
          <div>SCALA: {Math.round(deviceScale * 100)}% · STATO: PAGINA {currentPage}</div>
          <div>STYLE: MONOCHROME WIREFRAME</div>
        </div>

        <div className="absolute bottom-4 right-6 text-[10px] font-mono text-neutral-400 select-none hidden lg:block text-right">
          <div>NAVIGAZIONE: BTN_ACTION</div>
          <div>TARGET 1: PAGINA 2 // TARGET 2: PAGINA 1</div>
        </div>

        {/* View Container */}
        {fullMobileMode ? (
          /* Full Mobile View Mode (direct screen view without chassis) */
          <div className="w-full max-w-[420px] h-[852px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col overflow-hidden relative">
            <ScreenContent
              currentPage={currentPage}
              direction={direction}
              pageVariants={pageVariants}
              showGrid={showGrid}
              buttonPlacement={buttonPlacement}
              handleAvanti={handleAvanti}
              handleIndietro={handleIndietro}
              currentTime={currentTime}
              isFullMode={true}
            />
          </div>
        ) : (
          /* Realistic iPhone 15 Frame Mockup */
          <div 
            className="transition-transform duration-200 origin-center my-auto flex flex-col items-center"
            style={{ transform: `scale(${deviceScale})` }}
          >
            {/* Outer Chassis */}
            <div className="relative">
              {/* iPhone 15 Physical Buttons Outline (Wireframe) */}
              {/* Left Side: Action Button */}
              <div className="absolute -left-[5px] top-[140px] w-[5px] h-[32px] bg-black rounded-l-[3px] border-l border-y border-neutral-600" />
              {/* Left Side: Volume Up */}
              <div className="absolute -left-[5px] top-[190px] w-[5px] h-[55px] bg-black rounded-l-[3px] border-l border-y border-neutral-600" />
              {/* Left Side: Volume Down */}
              <div className="absolute -left-[5px] top-[260px] w-[5px] h-[55px] bg-black rounded-l-[3px] border-l border-y border-neutral-600" />
              {/* Right Side: Power / Lock Button */}
              <div className="absolute -right-[5px] top-[205px] w-[5px] h-[80px] bg-black rounded-r-[3px] border-r border-y border-neutral-600" />

              {/* iPhone 15 Chassis Border */}
              <div className="w-[419px] h-[878px] bg-white border-[4px] border-black rounded-[56px] p-[10px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative flex flex-col">
                {/* Antenna Bands (Wireframe details) */}
                <div className="absolute top-[80px] -left-[4px] w-[4px] h-[6px] bg-neutral-300" />
                <div className="absolute top-[80px] -right-[4px] w-[4px] h-[6px] bg-neutral-300" />
                <div className="absolute bottom-[80px] -left-[4px] w-[4px] h-[6px] bg-neutral-300" />
                <div className="absolute bottom-[80px] -right-[4px] w-[4px] h-[6px] bg-neutral-300" />

                {/* Display Area (393 × 852 pt) */}
                <div className="w-[393px] h-[852px] bg-white border-2 border-black rounded-[46px] overflow-hidden relative flex flex-col">
                  <ScreenContent
                    currentPage={currentPage}
                    direction={direction}
                    pageVariants={pageVariants}
                    showGrid={showGrid}
                    buttonPlacement={buttonPlacement}
                    handleAvanti={handleAvanti}
                    handleIndietro={handleIndietro}
                    currentTime={currentTime}
                    isFullMode={false}
                  />
                </div>
              </div>
            </div>

            {/* Device Info Caption */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs font-mono text-neutral-600">
              <span className="font-bold">iPhone 15</span>
              <span>·</span>
              <span>393 × 852 pt</span>
              <span>·</span>
              <span className="border border-black px-1.5 py-0.5 bg-white text-[10px]">
                {currentPage === 1 ? 'SCHERMATA 1' : 'SCHERMATA 2'}
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation flow summary */}
      <footer className="bg-white border-t-2 border-black py-2.5 px-4 text-center font-mono text-xs text-neutral-600">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <span className={`px-2 py-0.5 border ${currentPage === 1 ? 'border-black font-bold bg-neutral-100 text-black' : 'border-neutral-300 text-neutral-400'}`}>
            Pagina 1: [avanti]
          </span>
          <span className="text-black font-bold">⇄</span>
          <span className={`px-2 py-0.5 border ${currentPage === 2 ? 'border-black font-bold bg-neutral-100 text-black' : 'border-neutral-300 text-neutral-400'}`}>
            Pagina 2: [indietro]
          </span>
          <span className="hidden md:inline text-neutral-400">· Clicca sui bottoni all&apos;interno dell&apos;iPhone per navigare</span>
        </div>
      </footer>
    </div>
  );
}

// iPhone Screen Content Component
interface ScreenContentProps {
  currentPage: 1 | 2;
  direction: 1 | -1;
  pageVariants: any;
  showGrid: boolean;
  buttonPlacement: 'center' | 'bottom';
  handleAvanti: () => void;
  handleIndietro: () => void;
  currentTime: string;
  isFullMode: boolean;
}

function ScreenContent({
  currentPage,
  direction,
  pageVariants,
  showGrid,
  buttonPlacement,
  handleAvanti,
  handleIndietro,
  currentTime,
  isFullMode,
}: ScreenContentProps) {
  return (
    <div className={`w-full h-full relative flex flex-col bg-white text-black ${showGrid ? 'wireframe-line-grid' : ''}`}>
      {/* Top Status Bar & Dynamic Island */}
      <div className="w-full pt-3 px-6 flex items-center justify-between z-30 shrink-0">
        {/* Left: Clock */}
        <div className="w-14 font-mono font-bold text-xs tracking-tight">
          {currentTime}
        </div>

        {/* Center: Dynamic Island */}
        <div className="w-[124px] h-[34px] bg-black rounded-full flex items-center justify-between px-3 border border-neutral-700 shadow-inner">
          {/* Wireframe camera sensor / lens dot */}
          <div className="w-3 h-3 rounded-full border border-neutral-600 bg-neutral-900 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-neutral-400" />
          </div>
          {/* Wireframe sensor indicator */}
          <div className="w-2.5 h-2.5 rounded-full border border-neutral-600 bg-neutral-800" />
        </div>

        {/* Right: Cellular, WiFi, Battery Wireframe Icons */}
        <div className="w-14 flex items-center justify-end gap-1.5">
          {/* 4-bar cellular icon wireframe */}
          <div className="flex items-end gap-[1.5px] h-3">
            <div className="w-[2px] h-[3px] bg-black" />
            <div className="w-[2px] h-[5px] bg-black" />
            <div className="w-[2px] h-[8px] bg-black" />
            <div className="w-[2px] h-[11px] bg-black" />
          </div>

          {/* Wi-Fi wireframe icon */}
          <svg className="w-3.5 h-3.5 stroke-black fill-none stroke-[1.8]" viewBox="0 0 24 24">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" strokeLinecap="round" />
            <path d="M8.5 16.05a6 6 0 0 1 7 0" strokeLinecap="round" />
            <line x1="12" y1="20" x2="12.01" y2="20" strokeLinecap="round" strokeWidth="2.5" />
          </svg>

          {/* Battery wireframe outline */}
          <div className="flex items-center">
            <div className="w-[19px] h-[10px] border-[1.5px] border-black rounded-[2.5px] p-[1px] flex items-center">
              <div className="w-[11px] h-full bg-black rounded-[1px]" />
            </div>
            <div className="w-[1.5px] h-[4px] bg-black rounded-r-[1px]" />
          </div>
        </div>
      </div>

      {/* Pages Container: Completely empty except for the button */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {currentPage === 1 ? (
            /* ============================================================ */
            /* PAGINA 1: Con dentro SOLO un bottone con scritto “avanti”     */
            /* ============================================================ */
            <motion.div
              key="pagina-1"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`absolute inset-0 p-8 flex flex-col ${
                buttonPlacement === 'center'
                  ? 'items-center justify-center'
                  : 'items-center justify-end pb-12'
              }`}
            >
              {/* Il solo bottone con scritto "avanti" in stile wireframe */}
              <button
                id="btn-avanti"
                onClick={handleAvanti}
                className="w-full max-w-[260px] py-4 px-6 bg-white text-black border-2 border-black font-mono font-bold text-base tracking-wider uppercase rounded-lg shadow-[4px_4px_0px_0px_#000000] hover:bg-neutral-50 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer group"
                aria-label="Avanti alla pagina 2"
              >
                <span>avanti</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
              </button>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* PAGINA 2: Con dentro SOLO un bottone con scritto “indietro”   */
            /* ============================================================ */
            <motion.div
              key="pagina-2"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`absolute inset-0 p-8 flex flex-col ${
                buttonPlacement === 'center'
                  ? 'items-center justify-center'
                  : 'items-center justify-end pb-12'
              }`}
            >
              {/* Il solo bottone con scritto "indietro" in stile wireframe */}
              <button
                id="btn-indietro"
                onClick={handleIndietro}
                className="w-full max-w-[260px] py-4 px-6 bg-white text-black border-2 border-black font-mono font-bold text-base tracking-wider uppercase rounded-lg shadow-[4px_4px_0px_0px_#000000] hover:bg-neutral-50 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer group"
                aria-label="Indietro alla pagina 1"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 stroke-[2.5]" />
                <span>indietro</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Home Indicator Bar (iPhone 15) */}
      <div className="w-full py-2 flex justify-center items-center z-30 shrink-0">
        <div className="w-[134px] h-[4.5px] bg-black rounded-full" />
      </div>
    </div>
  );
}
