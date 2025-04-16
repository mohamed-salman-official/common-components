// utils/AlertManager.ts

import { AlertOptions, alertRef } from "./CustomAlert";

export const showAlert = (options: AlertOptions) => {
  if (alertRef) {
    alertRef.show(options);
  } else {
    console.warn("CustomAlert not mounted yet.");
  }
};
