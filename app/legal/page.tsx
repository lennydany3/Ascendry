import { redirect } from "next/navigation";

/** /legal has no content of its own: send visitors to the privacy policy. */
export default function LegalIndex() {
  redirect("/legal/privacy-policy");
}
