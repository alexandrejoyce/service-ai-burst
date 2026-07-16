import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], variable: "--font-montserrat" });

export const metadata = {
  title: "Le Burst — Vos équipes, prêtes à créer avec l'IA | innovation.expert",
  description:
    "Le Burst est un atelier intensif où vos équipes apprennent à travailler avec l'IA sur vos vrais projets — et repartent avec une démo fonctionnelle, de nouvelles façons de collaborer et des compétences réutilisables.",
  other: { "deploy-check": "github-auto-deploy-verify-1" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
