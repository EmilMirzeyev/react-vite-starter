import { Switch as HSwitch } from "@headlessui/react";
import type { SwitchType } from "./switch_type";

const Switch = ({ disabled = false, enabled, setEnabled }: SwitchType) => {
  return (
    <HSwitch
      checked={enabled}
      disabled={disabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-blue-600" : "bg-gray-200"}
          relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </HSwitch>
  );
};

export default Switch;
