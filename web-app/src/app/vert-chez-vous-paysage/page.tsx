import { Metadata } from 'next';
import ClientPage from '@/app/vert-chez-vous-paysage/ClientPage';

export const metadata: Metadata = {
    title: "Vert Chez Vous Paysage | Paysagiste à Nantes",
    description: "Expert en réaménagement de jardin à Nantes : arrachage de haies, pose de panneaux bois et treillis, préparation du sol et gazon de placage. Devis gratuit.",
    openGraph: {
        title: "Vert Chez Vous Paysage | Paysagiste à Nantes",
        description: "Spécialiste de la création et du réaménagement de jardin à Nantes. Pose de clôtures bois, treillis, et gazon de placage de haute qualité.",
        url: "https://web.agency/vert-chez-vous-paysage", // Replace if needed
        siteName: "Vert Chez Vous Paysage",
        images: [
            {
                url: "/images/vert-chez-vous/hero.png",
                width: 1200,
                height: 630,
                alt: "Réaménagement de jardin par Vert Chez Vous Paysage",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vert Chez Vous Paysage - Votre paysagiste à Nantes",
        description: "Création et entretien de vos espaces verts. Gazon, palissades bois, et aménagements extérieurs sur-mesure.",
        images: ["/images/vert-chez-vous/hero.png"],
    },
};

export default function PaysagisteNantesLanding() {
    return <ClientPage />;
}
