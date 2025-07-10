/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/lib/api/client";

export const getTripList = (): Promise<any> => {
  return api.get("/trips");
};
