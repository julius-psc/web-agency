import { Metadata } from 'next';
import ClientPage from '@/app/foissotte-elagage/ClientPage';

export const metadata: Metadata = {
    title: "Marcel Foissotte | Artisan Élagueur & Abattage",
    description: "Élagage, abattage, et taille de haies par un artisan grimpeur professionnel. Intervention rapide et devis gratuit. Marcel Foissotte à votre service.",
    openGraph: {
        title: "Marcel Foissotte | Artisan Élagueur",
        description: "Services professionnels d'élagage, d'abattage délicat et d'entretien d'espaces verts. Contactez-nous pour une intervention sécurisée.",
        url: "https://foissotte-elagage.fr",
        siteName: "Marcel Foissotte Élagueur",
        images: [
            {
                url: "/images/elagage/hero.png",
                width: 1200,
                height: 630,
                alt: "Artisan élagueur en intervention",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Marcel Foissotte - Élagage & Abattage",
        description: "Intervention rapide pour l'élagage et l'abattage d'arbres. Devis gratuit.",
        images: ["/images/elagage/hero.png"],
    },
};

export default function ElagageLanding() {
    return <ClientPage />;
}
