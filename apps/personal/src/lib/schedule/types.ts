export type ScheduleRequestStatus = "pending" | "confirmed" | "declined";

export type ScheduleRequest = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
  timezone: string;
  status: ScheduleRequestStatus;
  createdAt: string;
};

export type ScheduleSlot = {
  time: string;
  label: string;
};
