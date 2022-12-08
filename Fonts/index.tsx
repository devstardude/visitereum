import { Handlee, Great_Vibes, Plus_Jakarta_Sans } from "@next/font/google";

export const handlee = Handlee({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-handlee",
});
export const greatVibes = Great_Vibes({
  weight: ["400"],
  //   subsets: ["latin"],
  subsets: ["latin"],
  variable: "--font-greatVibes",
});
export const jakarta = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
});
