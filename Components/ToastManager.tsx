// utils/ToastManager.ts

import { showToast as internalShowToast } from "../Components/CustomToast";

export const showToast = (message: string) => {
  internalShowToast(message);
};
