export type PatchTimelineDay = {
  dateKey: string;
  dateLabel: string;
  items: {
    itemCode: string;
    reward: string;
    type: "added" | "expired";
    at: string;
  }[];
};

export type PatchTimelineItem = {
  itemCode: string;
  reward: string;
  initAt?: string;
  expiredAt?: string;
  events: {
    type: "added" | "expired";
    at: string;
  }[];
};
