export interface SecretCode {
  code: string;
  title: string;
  description: string;
  category: 'general' | 'motorola' | 'advanced' | 'camera' | 'display' | 'audio';
}

export interface TroubleshootingGuide {
  id: string;
  title: string;
  steps: string[];
  icon: string;
}

export const SECRET_CODES: SecretCode[] = [
  {
    code: "*#06#",
    title: "IMEI Information",
    description: "Displays the International Mobile Equipment Identity number for your device.",
    category: "general"
  },
  {
    code: "*#*#4636#*#*",
    title: "Testing Menu",
    description: "Detailed information about the phone, battery, usage statistics, and Wi-Fi.",
    category: "general"
  },
  {
    code: "*#*#2486#*#*",
    title: "Motorola Engineering Menu",
    description: "Access the CQATest (Certified Quality Assurance) menu for hardware testing.",
    category: "motorola"
  },
  {
    code: "*#*#3424#*#*",
    title: "HTC/Motorola Test Program",
    description: "Runs a diagnostic test program on the device hardware.",
    category: "motorola"
  },
  {
    code: "*#*#7262626#*#*",
    title: "Field Test",
    description: "Displays network signal strength and tower information.",
    category: "advanced"
  },
  {
    code: "*#*#426#*#*",
    title: "Google Play Services",
    description: "View Firebase Cloud Messaging (FCM) diagnostics and events.",
    category: "advanced"
  },
  {
    code: "*#*#225#*#*",
    title: "Calendar Info",
    description: "Displays calendar storage information and event counts.",
    category: "general"
  },
  {
    code: "*#*#759#*#*",
    title: "Rlz Debug UI",
    description: "Access RLZ debug interface for OEM branding and tracking.",
    category: "advanced"
  },
  {
    code: "*#*#0842#*#*",
    title: "Vibration & Backlight Test",
    description: "Runs diagnostic tests for the device's vibration motor and screen backlight.",
    category: "general"
  },
  {
    code: "*#*#1472365#*#*",
    title: "GPS Diagnostic Test",
    description: "Performs a quick GPS test to check satellite connectivity and location accuracy.",
    category: "advanced"
  },
  {
    code: "*#*#232338#*#*",
    title: "Wi-Fi MAC Address",
    description: "Displays the Media Access Control (MAC) address of the device's Wi-Fi hardware.",
    category: "general"
  },
  {
    code: "*#*#0588#*#*",
    title: "Proximity Sensor Test",
    description: "Executes a test on the device's proximity sensor to ensure it detects nearby objects.",
    category: "general"
  },
  {
    code: "*#*#2664#*#*",
    title: "Touch Screen Test",
    description: "Opens a diagnostic tool to test the responsiveness and accuracy of the touch screen.",
    category: "general"
  },
  {
    code: "*#*#3264#*#*",
    title: "RAM Version",
    description: "Displays detailed information about the Random Access Memory (RAM) installed on the device.",
    category: "advanced"
  },
  {
    code: "*#*#232331#*#*",
    title: "Bluetooth Test",
    description: "Runs a diagnostic check on the Bluetooth module to verify connectivity and hardware status.",
    category: "general"
  },
  {
    code: "*#*#197328640#*#*",
    title: "Service Activity Mode",
    description: "Accesses the main service mode for advanced network, audio, and hardware testing.",
    category: "advanced"
  },
  {
    code: "*#*#34971539#*#*",
    title: "Camera Firmware Info",
    description: "Displays detailed information about the camera firmware and hardware.",
    category: "camera"
  },
  {
    code: "*#*#0*#*#*",
    title: "LCD Display Test",
    description: "Runs a diagnostic test for the LCD screen, checking for dead pixels and color accuracy.",
    category: "display"
  },
  {
    code: "*#*#0673#*#*",
    title: "Audio Melody Test",
    description: "Tests the device's speakers and audio output by playing a series of melodies.",
    category: "audio"
  },
  {
    code: "*#*#0283#*#*",
    title: "Audio Loopback Test",
    description: "Performs a loopback test to check the microphone and speaker functionality.",
    category: "audio"
  },
  {
    code: "*#*#2663#*#*",
    title: "Touch Screen & Display Version",
    description: "Displays the firmware version of the touch screen and display panel.",
    category: "display"
  },
  {
    code: "*#*#159753#*#*",
    title: "sRGB Color Profile Toggle",
    description: "Toggles the device display between standard sRGB and DCI-P3 wide color gamut profiles.",
    category: "display"
  },
  {
    code: "*#*#6090120#*#*",
    title: "Refresh Rate Override",
    description: "Forces the display to lock at a specific refresh rate (60Hz, 90Hz, or 120Hz) for testing UI smoothness.",
    category: "display"
  },
  {
    code: "*#*#225427#*#*",
    title: "Display Calibration Mode",
    description: "Accesses the low-level hardware calibration tool for adjusting gamma, contrast, and white balance.",
    category: "advanced"
  },
  {
    code: "*#*#4378378#*#*",
    title: "HDR Capabilities Test",
    description: "Verifies the display's High Dynamic Range (HDR) peak brightness and 10-bit color depth rendering.",
    category: "display"
  },
  {
    code: "*#*#287646#*#*",
    title: "Screen Burn-in Check",
    description: "Displays full-screen solid colors to identify screen burn-in, image retention, or dead pixels.",
    category: "display"
  }
];

export const TROUBLESHOOTING_GUIDES: TroubleshootingGuide[] = [
  {
    id: "factory-reset",
    title: "Hardware Factory Reset",
    icon: "RefreshCw",
    steps: [
      "Power off your Moto G Pure completely.",
      "Press and hold the Volume Down button and the Power button simultaneously until the device vibrates or the bootloader screen appears.",
      "Use the Volume buttons to scroll to 'Recovery Mode' and press the Power button to select it.",
      "When you see the 'No command' screen (Android robot lying down), press and hold the Power button, then press the Volume Up button once, and release both.",
      "Use the Volume buttons to highlight 'Wipe data/factory reset' and press Power to confirm.",
      "Select 'Factory data reset' and wait for the process to complete.",
      "Once finished, select 'Reboot system now'."
    ]
  },
  {
    id: "safe-mode",
    title: "Boot into Safe Mode",
    icon: "ShieldCheck",
    steps: [
      "With the phone on, press and hold the Power button.",
      "Touch and hold the 'Power off' option on the screen.",
      "When 'Reboot to safe mode' appears, tap OK.",
      "The phone will restart and 'Safe mode' will appear in the bottom left corner.",
      "To exit, simply restart your phone normally."
    ]
  },
  {
    id: "clear-cache",
    title: "Clear System Cache",
    icon: "Trash2",
    steps: [
      "Go to Settings > Storage.",
      "Tap on 'Internal shared storage'.",
      "Wait for it to calculate, then tap on 'Cached data'.",
      "Confirm 'Clear cached data' by tapping OK.",
      "Note: On newer Android versions, this is handled automatically or per-app."
    ]
  },
  {
    id: "install-twrp",
    title: "Install TWRP Recovery (Advanced)",
    icon: "Terminal",
    steps: [
      "PREREQUISITE: Your bootloader must already be unlocked, and ADB/Fastboot tools installed on your PC.",
      "Download the official TWRP image (.img) for Moto G Pure (codename: ellis) from the TWRP website or XDA Forums.",
      "Rename the downloaded file to 'twrp.img' and place it in your PC's ADB/Fastboot folder.",
      "Power off the phone, then hold Volume Down + Power to boot into Fastboot/Bootloader mode.",
      "Connect the phone to your PC via USB. Open a terminal/command prompt in the ADB folder.",
      "Type 'fastboot devices' to verify your PC recognizes the phone.",
      "Type 'fastboot boot twrp.img' to temporarily boot into TWRP. (Modern Moto devices use A/B partitions, so booting temporarily is safer than direct flashing).",
      "Once TWRP loads on the phone, go to Advanced > Install Recovery Ramdisk, and select the twrp.img file you transferred to the device's internal storage.",
      "Reboot to Recovery to verify the installation was successful."
    ]
  },
  {
    id: "unlock-bootloader",
    title: "Unlock Bootloader (Wipes Data)",
    icon: "Unlock",
    steps: [
      "WARNING: Unlocking the bootloader will completely wipe all data on your device and void your warranty. Backup everything first.",
      "PREREQUISITES: Install Motorola USB Drivers and ADB/Fastboot tools on your PC. Create a Motorola account.",
      "Enable Developer Options: Go to Settings > About phone > tap 'Build number' 7 times.",
      "Go to Settings > System > Advanced > Developer options. Enable both 'OEM unlocking' and 'USB debugging'.",
      "Power off the phone, then hold Volume Down + Power to boot into Fastboot mode. Connect to your PC via USB.",
      "Open a terminal/command prompt in your ADB folder and run: fastboot oem get_unlock_data",
      "Copy the output string. Remove any spaces or 'INFO'/'(bootloader)' prefixes so it forms one continuous string of characters.",
      "Go to the official Motorola Unlock Portal website, log in, and paste the string to check if your device is eligible.",
      "If eligible, agree to the terms and request the unlock key. Motorola will email you a 20-character unique key.",
      "Back in your terminal, run: fastboot oem unlock <YOUR_UNLOCK_KEY>",
      "The device will wipe itself and reboot with an unlocked bootloader."
    ]
  },
  {
    id: "flash-custom-rom",
    title: "Flash Custom ROM & GApps",
    icon: "Cpu",
    steps: [
      "WARNING: Flashing a custom ROM can brick your device. Ensure your phone is charged to at least 70% and you have backed up all important data.",
      "PREREQUISITES: Your bootloader must be unlocked, and TWRP (or another custom recovery) must be installed.",
      "Download a compatible custom ROM (.zip) for Moto G Pure (codename: ellis) and a matching GApps package (if the ROM doesn't include Google Apps).",
      "Transfer both the ROM and GApps .zip files to your phone's internal storage or a microSD card.",
      "Boot into TWRP Recovery by powering off, holding Volume Down + Power to enter Fastboot, then selecting Recovery Mode.",
      "In TWRP, tap 'Wipe' > 'Advanced Wipe'. Select Dalvik/ART Cache, Cache, Data, and System. Swipe to wipe. (Do NOT wipe Internal Storage unless doing a clean format).",
      "Go back to the TWRP main menu and tap 'Install'.",
      "Navigate to the ROM .zip file, select it, and swipe to confirm flash. Wait for the installation to finish.",
      "If installing GApps, go back to 'Install', select the GApps .zip file, and swipe to flash.",
      "Once all zips are flashed, tap 'Wipe Cache/Dalvik' and then 'Reboot System'. The first boot may take up to 10-15 minutes."
    ]
  },
  {
    id: "root-magisk",
    title: "Root with Magisk (Via TWRP)",
    icon: "Zap",
    steps: [
      "PREREQUISITES: Your bootloader must be unlocked, and TWRP must be installed. Backup your data.",
      "Download the latest Magisk APK from the official topjohnwu GitHub repository.",
      "Rename the downloaded file extension from .apk to .zip (e.g., Magisk-v26.3.apk becomes Magisk-v26.3.zip).",
      "Transfer the Magisk .zip file to your phone's internal storage or SD card.",
      "Boot into TWRP Recovery by powering off, holding Volume Down + Power to enter Fastboot, then selecting Recovery Mode.",
      "In TWRP, tap 'Install', navigate to the Magisk .zip file, select it, and swipe to confirm flash.",
      "Once the installation is complete, tap 'Wipe Cache/Dalvik' and then tap 'Reboot System'.",
      "After Android boots, you should see the Magisk app. If it's a stub or missing, install the original Magisk .apk manually.",
      "Open the Magisk app, follow any prompts to 'complete additional setup' if asked, and your device is now rooted!"
    ]
  }
];
