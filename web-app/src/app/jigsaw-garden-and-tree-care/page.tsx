import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Jigsaw Garden and Tree Care | Landscaping in Brighton and Hove",
    description: "Garden and tree care company operating out of Brighton and Hove serving the Sussex area. Landscaping, fencing, hedge work, garden maintenance, tree surgery, and spraying.",
    openGraph: {
        title: "Jigsaw Garden and Tree Care",
        description: "Professional gardening and tree care services in Brighton and Hove. Contact us today.",
        url: "https://jigsaw-garden-care.co.uk",
        siteName: "Jigsaw Garden and Tree Care",
        images: [
            {
                url: "/images/jigsaw_hero.png",
                width: 1200,
                height: 630,
                alt: "Jigsaw Garden and Tree Care",
            },
        ],
        locale: "en_GB",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Jigsaw Garden & Tree Care",
        description: "Landscaping, tree surgery, and garden maintenance in Sussex.",
        images: ["/images/jigsaw_hero.png"],
    },
};

export default function JigsawLanding() {
    return <ClientPage />;
}
