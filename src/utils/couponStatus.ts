export function getCouponStatusLabel(
  success: boolean,
  errorCode?: number
): string {
  if (success) return "สำเร็จ";

  switch (errorCode) {
    case 24001:
      return "ถูกจำกัดการใช้งาน";
    case 24002:
      return "UID ไม่ถูกต้อง";
    case 24003:
      return "หมดอายุ / ถูกใช้แล้ว";
    case 24004:
      return "เกินกำหนด";
    default:
      return "ไม่สำเร็จ";
  }
}
