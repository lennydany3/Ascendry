import { LabsLoader } from "@/components/labs-loader/LabsLoader";

export default function LabsLayout({ children }: LayoutProps<"/labs">) {
  return (
    <>
      <LabsLoader />
      {children}
    </>
  );
}
