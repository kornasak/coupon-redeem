export function getCouponStatusLabel(
  success: boolean,
  errorCode?: number
): string {
  if (success) return "สำเร็จ";

  switch (errorCode) {
    case 24004:
      return "เกินกำหนด";
    case 24003:
      return "หมดอายุ / ถูกใช้แล้ว";
    case 24001:
      return "ถูกจำกัดการใช้งาน";
    case 24002:
      return "ไม่ตรงตามเงื่อนไข";
    default:
      return "ไม่สำเร็จ";
  }
}
