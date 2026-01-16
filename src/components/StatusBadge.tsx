import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getCouponStatusLabel } from "@utils/couponStatus";

type Props = {
  success: boolean;
  errorCode?: number;
};

export function StatusBadge({ success, errorCode }: Props) {
  const label = getCouponStatusLabel(success, errorCode);

  const baseClass =
    "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium";

  if (success) {
    return (
      <span className={`${baseClass} bg-teal-400/20 text-teal-300`}>
        <FaCheckCircle className="text-sm" />
        {label}
      </span>
    );
  }

  return (
    <span className={`${baseClass} bg-rose-400/20 text-rose-300`}>
      <FaTimesCircle className="text-sm" />
      {label}
    </span>
  );
}
