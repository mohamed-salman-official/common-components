import CustomAlert from "@/Components/CustomAlert";
import RootNavigator from "./RootNavigator";
import Toast from "@/Components/CustomToast";

export default function RootLayout() {
  return (
    <>
      <RootNavigator />
      <CustomAlert />
      <Toast />
    </>
  );
}
