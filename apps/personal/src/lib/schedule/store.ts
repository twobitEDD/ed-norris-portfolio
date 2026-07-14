import { Redis } from "@upstash/redis";
import type { ScheduleRequest } from "@/lib/schedule/types";

const REQUEST_IDS_KEY = "schedule:request-ids";
const requestKey = (id: string) => `schedule:request:${id}`;
const bookedKey = (date: string, time: string) => `schedule:booked:${date}:${time}`;

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    redisClient = null;
    return redisClient;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

export function isScheduleStoreConfigured(): boolean {
  return getRedis() !== null;
}

export async function saveScheduleRequest(request: ScheduleRequest): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  await redis
    .pipeline()
    .set(requestKey(request.id), request)
    .lpush(REQUEST_IDS_KEY, request.id)
    .set(bookedKey(request.date, request.time), request.id)
    .exec();
}

export async function listScheduleRequests(): Promise<ScheduleRequest[]> {
  const redis = getRedis();
  if (!redis) return [];

  const ids = await redis.lrange<string>(REQUEST_IDS_KEY, 0, -1);
  if (!ids.length) return [];

  const requests = await Promise.all(
    ids.map(async (id) => redis.get<ScheduleRequest>(requestKey(id))),
  );

  return requests
    .filter((request): request is ScheduleRequest => request !== null)
    .sort((a, b) => {
      const aInstant = `${a.date}T${a.time}`;
      const bInstant = `${b.date}T${b.time}`;
      return aInstant.localeCompare(bInstant);
    });
}

export async function getBookedTimesForDate(date: string): Promise<Set<string>> {
  const redis = getRedis();
  if (!redis) return new Set();

  const requests = await listScheduleRequests();
  const booked = requests
    .filter((request) => request.date === date && request.status !== "declined")
    .map((request) => request.time);

  return new Set(booked);
}

export async function isSlotBooked(date: string, time: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  const existing = await redis.get<string>(bookedKey(date, time));
  return Boolean(existing);
}
