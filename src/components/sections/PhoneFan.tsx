import { demoProfiles } from "@/content/demo-profiles";
import { PhoneProfile } from "./PhoneProfile";

/** Tre profili Instagram dimostrativi a ventaglio: al centro quello con la campagna attiva, ai lati gli altri due. */
export function PhoneFan() {
  const [a, b, c] = demoProfiles;
  return (
    <div className="pf relative mx-auto h-[39rem] w-full max-w-[34rem] max-sm:h-[37rem]">
      <div className="pf-side pf-side--l absolute left-0 top-10 max-sm:hidden">
        <PhoneProfile profile={b!} rows={2} />
      </div>
      <div className="pf-side pf-side--r absolute right-0 top-10 max-sm:hidden">
        <PhoneProfile profile={c!} rows={2} />
      </div>
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
        <PhoneProfile profile={a!} campaign />
      </div>
    </div>
  );
}
