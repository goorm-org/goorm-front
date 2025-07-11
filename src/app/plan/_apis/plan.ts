// eslint-disable @typescript-eslint/no-explicit-any

import { api } from "@/lib/api/client";

export const getTripList = (data: unknown) => {
  return api.post("/trips", data);
};
