import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], variable: "--font-montserrat" });

export const metadata = {
  title: "Le Burst — Vos équipes, prêtes à créer avec l'IA | innovation.expert",
  description:
    "Le Burst fait passer vos équipes de curieuses à adeptes de l'IA : un atelier intensif où elles appliquent l'IA à leurs vrais projets et changent pour de bon leur façon de travailler.",
  other: { "deploy-check": "github-auto-deploy-verify-1" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
