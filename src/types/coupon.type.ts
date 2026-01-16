export type CouponApiResponse = {
  success: boolean;
  errorCode?: number;
  errorMessage?: string;
};

export type CouponResult = {
  code: string;
  reward?: string;
  success: boolean;
  message: string;
  errorCode?: number;
};

export type CouponItem = {
  itemCode: string;
  reward: string;
  initAt: string;
  expiredAt: string | null;
  note: string;
};
