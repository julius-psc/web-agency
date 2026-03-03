import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Sevenfit | Coach Sportif Personnel au Havre",
    description: "Atteignez vos objectifs avec Sevenfit. Coaching sportif personnalisé, nutrition et dépassement de soi au Havre. Réservez votre séance au 06 15 70 74 03.",
    openGraph: {
        title: "Sevenfit | Coaching Sportif & Nutrition au Havre",
        description: "Transformez votre corps et votre esprit avec un accompagnement sur mesure. Premier bilan offert.",
        url: "https://sevenfit.fr",
        siteName: "Sevenfit",
        images: [
            {
                url: "/images/sevenfit_hero.png",
                width: 1200,
                height: 630,
                alt: "Sevenfit - Coach Sportif Personnel",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sevenfit | Coach Sportif au Havre",
        description: "Coaching sportif personnalisé et nutrition. Contactez-nous au 06 15 70 74 03.",
        images: ["/images/sevenfit_hero.png"],
    },
};

export default function SevenfitLanding() {
    return <ClientPage />;
}
