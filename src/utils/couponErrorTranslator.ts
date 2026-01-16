import type { CouponApiResponse } from "@/types/coupon.type";

const ERROR_CODE_MAP: Record<number, string> = {
  24001:
    "คุณกรอกคูปองผิดติดต่อกันครบ 10 ครั้ง กรุณารอ 1 ชั่วโมงก่อนลองใหม่อีกครั้ง",
  24003: "คูปองนี้ถูกใช้ไปแล้ว หรือหมดอายุ กรุณาตรวจสอบคูปองอีกครั้ง",
  24002: "คูปองนี้ไม่สามารถใช้งานกับบัญชีนี้ได้",
  24004: "จำนวนการแลกคูปองนี้เกินจำนวนที่กำหนดแล้ว",
};

export function translateCouponError(res?: CouponApiResponse): string {
  if (!res) return "เกิดข้อผิดพลาดในการเชื่อมต่อระบบ";

  if (res.success) {
    return "แลกคูปองสำเร็จ";
  }

  if (res.errorCode && ERROR_CODE_MAP[res.errorCode]) {
    return ERROR_CODE_MAP[res.errorCode];
  }

  if (res.errorMessage) {
    return "ไม่สามารถแลกคูปองได้ กรุณาลองใหม่ภายหลัง";
  }

  return "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
}
