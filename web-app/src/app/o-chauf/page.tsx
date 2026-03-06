import { Metadata } from 'next';
import ClientPage from '@/app/o-chauf/ClientPage';

export const metadata: Metadata = {
    title: "O'chauf | Plomberie, Chauffage, Sanitaire & Climatisation",
    description: "Spécialiste en plomberie, chauffage, sanitaire et climatisation sur Reims. Interventions de haute qualité. Devis gratuit et intervention rapide.",
    openGraph: {
        title: "O'chauf | Plomberie & Chauffage Reims",
        description: "Votre expert en plomberie, chauffage, sanitaire et climatisation sur Reims et ses environs.",
        url: "https://ochauf.fr",
        siteName: "O'chauf",
        images: [
            {
                url: "/images/o-chauf/hero.png",
                width: 1200,
                height: 630,
                alt: "O'chauf professionnel en intervention",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "O'chauf - Plomberie & Chauffage",
        description: "Spécialiste plomberie et climatisation à Reims.",
        images: ["/images/o-chauf/hero.png"],
    },
};

export default function OchaufLanding() {
    return <ClientPage />;
}
