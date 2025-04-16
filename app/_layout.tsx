import CustomAlert from "@/Components/CustomAlert";
import RootNavigator from "./RootNavigator";

export default function RootLayout() {
  return (
    <>
      <RootNavigator />
      <CustomAlert />
    </>
  );
}
