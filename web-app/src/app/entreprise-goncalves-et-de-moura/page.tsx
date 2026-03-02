import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Entreprise Goncalves et de Moura | Maçonnerie & Gros Œuvre à Brest",
    description: "Votre partenaire de confiance pour le gros œuvre, la rénovation et les aménagements extérieurs à Brest. Devis gratuit et garantie décennale.",
    openGraph: {
        title: "Entreprise Goncalves et de Moura | Bâtiment & Rénovation",
        description: "Excellence de la pierre et force du béton. Plus de 15 ans d'expérience à Brest. Contactez-nous au 06 86 47 62 58.",
        url: "https://goncalves-demoura.fr",
        siteName: "Goncalves & de Moura SARL",
        images: [
            {
                url: "/images/hero.png",
                width: 1200,
                height: 630,
                alt: "Chantier de Maçonnerie Goncalves et de Moura",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Goncalves et de Moura SARL - Maçonnerie & Rénovation",
        description: "Gros œuvre, Rénovation de Pierre et Aménagements Extérieurs à Brest. Devis gratuit au 06 86 47 62 58.",
        images: ["/images/hero.png"],
    },
};

export default function Business1Landing() {
    return <ClientPage />;
}
