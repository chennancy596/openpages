import { Capacitor } from "@capacitor/core";
import { Health } from "@capgo/capacitor-health";

window.OpenPagesNativeHealth = {
  isNative: Capacitor.isNativePlatform(),
  platform: Capacitor.getPlatform(),
  plugin: Health,
};


window.dispatchEvent(new CustomEvent("openpages:native-health-ready"));
