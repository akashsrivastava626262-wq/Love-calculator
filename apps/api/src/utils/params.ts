import { Request } from 'express';

export const getParam = (value: string | string[]): string =>
  Array.isArray(value) ? value[0] : value;

export const getQuery = (value: unknown): string | undefined => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
  return undefined;
};

export const getQueryInt = (value: unknown, fallback: number): number => {
  const str = getQuery(value);
  if (!str) return fallback;
  const num = parseInt(str, 10);
  return isNaN(num) ? fallback : num;
};
