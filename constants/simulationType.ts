export type PurposeType = "PAST" | "FUTURE";

export type CategoryType =
  | "EMOTIONAL_MISTAKE"
  | "MISCOMMUNICATION"
  | "CONTACT_ISSUE"
  | "BREAKUP_PROCESS"
  | "REALITY_PROBLEM"
  | "RELATION_TENSION"
  | "PERSONAL_BOUNDARY"
  | "FAMILY_FRIEND_ISSUE"
  | "BREAKUP_FUTURE"
  | "EVENT_PREPARATION";

export const PURPOSE_LABELS: Record<PurposeType, string> = {
  PAST: "후회",
  FUTURE: "불확실성",
};

export const CATEGORY_OPTIONS: Record<
  PurposeType,
  { label: string; value: CategoryType }[]
> = {
  PAST: [
    { label: "감정적 다툼, 말실수", value: "EMOTIONAL_MISTAKE" },
    { label: "서운함, 불만 표현 실패", value: "MISCOMMUNICATION" },
    { label: "연락, 시간 배분 문제", value: "CONTACT_ISSUE" },
    { label: "고백, 이별 후속 처리", value: "BREAKUP_PROCESS" },
    { label: "현실적인 문제 대처", value: "REALITY_PROBLEM" },
  ],
  FUTURE: [
    { label: "고백, 관계 진전", value: "RELATION_TENSION" },
    { label: "민감한 요구나 부탁", value: "PERSONAL_BOUNDARY" },
    { label: "가족, 친구 문제", value: "FAMILY_FRIEND_ISSUE" },
    { label: "이별 통보, 대처", value: "BREAKUP_FUTURE" },
    { label: "기념일, 이벤트 계획", value: "EVENT_PREPARATION" },
  ],
};
