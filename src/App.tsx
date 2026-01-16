import { useEffect, useRef, useState } from "react";
import { PiXBold } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import { fetchCoupons, redeemCoupon } from "@api/coupon";
import { delay } from "@utils/delay";

import { CouponManagerModal } from "@/components/CouponManagerModal";
import { CouponPanel } from "@/components/CouponPanel";
import { HeroHeader } from "@/components/HeroHeader";
import { PatchNoteSidebar } from "@/components/PatchNoteSidebar";
import { ResultList } from "@/components/ResultList";
import type { CouponItem, CouponResult } from "@/types/coupon.type";
import { translateCouponError } from "@/utils/couponErrorTranslator";
import { isSameDay } from "@/utils/isSameDay";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [pid, setPid] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [patchOpen, setPatchOpen] = useState(false);
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [excludedCodes, setExcludedCodes] = useState<string[]>([]);
  const [couponManager, setCouponManager] = useState(false);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  useEffect(() => {
    fetchCoupons()
      .then((data) => {
        setCoupons(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingCoupons(false);
      });
  }, []);

  useEffect(() => {
    if (loadingCoupons) {
      toast.info("กำลังโหลดคูปองจากระบบ", {
        toastId: "loading-coupons",
        isLoading: true,
      });
    } else {
      toast.dismiss("loading-coupons");
    }
  }, [loadingCoupons]);

  const [results, setResults] = useState<CouponResult[]>([]);

  const pausedRef = useRef(false);

  const toggleCoupon = (code: string) => {
    setExcludedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const validCoupons = coupons.filter((c) => {
    if (excludedCodes.includes(c.itemCode)) return false;
    if (!c.expiredAt) return true;
    return new Date(c.expiredAt) > new Date();
  });

  const totalCoupons = validCoupons.length;

  const handleRedeemAll = async () => {
    setLoading(true);
    setPaused(false);
    pausedRef.current = false;
    setResults([]);
    setProgress(0);

    const total = validCoupons.length;

    const temp: CouponResult[] = [];

    for (let i = 0; i < total; i++) {
      const code = validCoupons[i].itemCode;
      const reward = validCoupons[i].reward;

      while (pausedRef.current) await delay(300);

      try {
        const redeem = await redeemCoupon({
          couponCode: code,
          pid,
        });

        temp.push({
          code: code,
          reward: reward,
          success: redeem.success ?? false,
          message: translateCouponError(redeem),
        });
      } catch {
        temp.push({
          code: code,
          reward: reward,
          success: false,
          message: "เชื่อมต่อ API ไม่ได้",
        });
      }

      setResults([...temp]);
      setProgress(Math.round(((i + 1) / total) * 100));
      await delay(1800);
    }

    setLoading(false);
  };

  const isFinished =
    !loading && !paused && results.length === validCoupons.length;

  const today = new Date();

  const hasNewToday = coupons.some((c) => {
    if (!c.initAt) return false;
    return isSameDay(new Date(c.initAt), today);
  });

  const [patchSeen, setPatchSeen] = useState(false);

  const showPatchBadge = hasNewToday && !patchSeen;

  const openPatch = () => {
    setPatchOpen(true);
    setPatchSeen(true);
  };

  return (
    <div className="relative h-screen overflow-hidden text-white">
      <div className="absolute inset-0 scale-100 bg-black bg-cover" />
      <div className="absolute inset-0 bg-slate-900/50" />
      <div className="relative z-10 flex h-full flex-col py-12">
        <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4">
          <section className="relative flex justify-center">
            <div className="w-full max-w-md">
              <HeroHeader
                onOpenPatchNote={openPatch}
                showPatchBadge={showPatchBadge}
              />
            </div>
          </section>
          <section className="relative flex min-h-0 flex-1 justify-center">
            <div className="flex min-h-0 w-full max-w-3xl flex-1 flex-col">
              <CouponPanel
                pid={pid}
                loading={loading}
                paused={paused}
                progress={progress}
                onPidChange={setPid}
                onStart={handleRedeemAll}
                onPause={() => {
                  setPaused(true);
                  pausedRef.current = true;
                }}
                onResume={() => {
                  setPaused(false);
                  pausedRef.current = false;
                }}
              />
              <ResultList
                results={results}
                total={totalCoupons}
                canClear={isFinished && results.length > 0}
                onClear={() => setResults([])}
                onOpenCouponManager={() => setCouponManager(!couponManager)}
                loadingCoupons={loadingCoupons}
              />
            </div>
          </section>
        </div>
      </div>
      <CouponManagerModal
        coupons={coupons.filter((c) => {
          if (!c.expiredAt) return true;
          return new Date(c.expiredAt) > new Date();
        })}
        excludedCodes={excludedCodes}
        onToggle={toggleCoupon}
        open={couponManager}
        onClose={() => setCouponManager(false)}
        onReset={() => setExcludedCodes([])}
        onSelectAll={() => setExcludedCodes(coupons.map((c) => c.itemCode))}
      />
      <PatchNoteSidebar
        open={patchOpen}
        onClose={() => setPatchOpen(false)}
        coupons={coupons}
      />
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop
        toastClassName="rounded-xl shadow-md overflow-hidden font-mitr"
        closeButton={({ closeToast }) => (
          <button
            onClick={closeToast}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-red-500"
          >
            <PiXBold size={18} />
          </button>
        )}
        closeOnClick={false}
        draggable={false}
        theme="dark"
      />
    </div>
  );
}
