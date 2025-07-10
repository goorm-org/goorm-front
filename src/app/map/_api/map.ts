/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/lib/api/client";

export const getShortsList = (): Promise<any> => {
  return api.get("/shorts");
};
