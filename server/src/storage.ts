import { User } from './types/user';

export const users: { [id: string]: User } = {};
export const tokens = new Map<string, string>();
