"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
    Phone,
    MapPin,
    ChevronRight,
    CheckCircle2,
    Leaf,
    Flower2,
    TreePine,
    Sprout,
    Hammer,
    ArrowRight,
    MessageCircle
} from "lucide-react";

const PHONE_NUMBER = "06 08 49 35 22";
const WHATSAPP_LINK = "https://wa.me/33608493522";

function Counter({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const ms = 16;
                const steps = duration / ms;
                const step = end / steps;

                const timer = setInterval(() => {
                    start += step;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.ceil(start));
                    }
                }, ms);
                observer.disconnect();
                return () => clearInterval(timer);
            }
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function ClientPage() {
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState({ description: "", location: "", contact: "" });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formStep < 3) {
            setFormStep(s => s + 1);
        } else {
            window.open(`${WHATSAPP_LINK}?text=Bonjour,%20j'ai%20un%20projet%20de%20réaménagement:%20${formData.description}.%20Lieu:%20${formData.location}`, '_blank');
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFCF8] text-neutral-900 font-sans selection:bg-lime-600 selection:text-white pb-0">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-lime-950/90 backdrop-blur-md border-b border-lime-900 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-lime-400" />
                        <span className="font-serif font-bold text-xl text-white tracking-tight">
                            Vert Chez Vous
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#services" className="text-sm font-medium text-lime-50 hover:text-lime-300 transition-colors">Expertises</a>
                        <a href="#devis" className="text-sm font-medium text-lime-50 hover:text-lime-300 transition-colors">Devis gratuit</a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-lime-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-lime-400 shadow-lg shadow-lime-500/20 transition-all flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {PHONE_NUMBER}
                        </a>
                    </div>
                </div>
            </nav>

            {/* Sticky Mobile CTA */}
            <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-lime-600 text-white rounded-full shadow-xl shadow-lime-600/30 hover:bg-lime-500 transition-transform transform hover:scale-105 md:hidden"
            >
                <MessageCircle className="w-6 h-6" />
            </a>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center pt-16 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-lime-950">
                    <Image
                        src="/images/vert-chez-vous/hero.png"
                        alt="Un magnifique jardin paysager moderne créé par Vert Chez Vous Paysage"
                        fill
                        className="object-cover object-center opacity-50 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF8] via-transparent to-transparent opacity-90 bottom-[-5%]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-10 md:mt-0">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-900/40 border border-lime-400/30 text-lime-100 text-xs font-semibold mb-6 uppercase tracking-widest backdrop-blur-md shadow-sm">
                        <MapPin className="w-4 h-4 text-lime-400" />
                        Votre Paysagiste à Nantes
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 mt-2 drop-shadow-md">
                        Conception de <span className="text-lime-400 italic">Jardins</span> <br className="hidden md:block" />
                        <span className="text-[#FDFCF8]">d'Excellence.</span>
                    </h1>

                    <p className="text-base md:text-xl text-[#FDFCF8] font-light max-w-2xl mb-10 leading-relaxed drop-shadow-sm">
                        Oubliez l'ordinaire. Nous métamorphosons vos espaces extérieurs avec une approche contemporaine. <br className="hidden md:block" />Gazon premium, aménagements bois, et conception sur-mesure.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4">
                        <a href="#devis" className="bg-lime-500 text-white px-8 py-4 rounded-xl text-base font-bold transition-all hover:bg-lime-400 hover:shadow-xl hover:shadow-lime-500/20 flex items-center justify-center gap-3 group shadow-lg w-full sm:w-auto">
                            Démarrer un projet
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl text-base font-medium transition-all hover:bg-white/20 flex items-center justify-center gap-3 w-full sm:w-auto">
                            <Phone className="w-5 h-5" />
                            Appel Urgent
                        </a>
                    </div>
                </div>
            </section>

            {/* Values / Stats */}
            <section className="bg-[#FDFCF8] py-0 relative z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-8 md:p-12 -mt-16 md:-mt-24 relative border border-neutral-100 flex flex-col md:flex-row justify-around items-center gap-10 md:gap-4">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center text-lime-600 shrink-0">
                                <Sprout className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900 text-lg mb-1">Expertise Végétale</h4>
                                <p className="text-sm text-neutral-500 leading-snug">Choix minutieux<br/>des essences</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-16 bg-neutral-100"></div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center text-lime-600 shrink-0">
                                <Hammer className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900 text-lg mb-1">Matériaux Nobles</h4>
                                <p className="text-sm text-neutral-500 leading-snug">Bois, minéraux,<br/>finitions premium</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-16 bg-neutral-100"></div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center text-lime-600 shrink-0">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900 text-lg mb-1">Savoir-faire</h4>
                                <p className="text-sm text-neutral-500 leading-snug">Artisans<br/>qualifiés à Nantes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Services */}
            <section id="services" className="py-24 md:py-32 bg-[#FDFCF8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12 lg:gap-24 mb-20 lg:mb-32">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-lime-700 font-bold tracking-widest text-xs uppercase mb-3 flex items-center gap-2">
                                <Leaf className="w-4 h-4" /> Focus Expertise
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 font-serif leading-tight">
                                Le Réaménagement <br/><span className="italic font-medium text-neutral-500">De A à Z</span>
                            </h3>
                            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                                Vert Chez Vous Paysage vous accompagne dans la transformation radicale de votre jardin. Nous prenons en charge l'intégralité du chantier avec un seul objectif : l'excellence.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center text-lime-700 shrink-0 mt-1">
                                        <span className="font-bold">1</span>
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-bold text-neutral-900 mb-2">Préparation & Arrachage</h5>
                                        <p className="text-neutral-600 leading-relaxed text-sm">Arrachage soigné de haie existante, défrichage, et préparation mécanique du sol en profondeur pour accueillir le nouveau décor.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center text-lime-700 shrink-0 mt-1">
                                        <span className="font-bold">2</span>
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-bold text-neutral-900 mb-2">Structures Bois & Treillis</h5>
                                        <p className="text-neutral-600 leading-relaxed text-sm">Pose de panneaux bois qualitatifs pour délimiter vos espaces avec élégance. Installation de treillis pour habiller vos murs de plantes grimpantes.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center text-lime-700 shrink-0 mt-1">
                                        <span className="font-bold">3</span>
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-bold text-neutral-900 mb-2">Gazon de Placage & Verdure</h5>
                                        <p className="text-neutral-600 leading-relaxed text-sm">Fourniture et pose d'un gazon de placage verdoyant et dense pour un résultat immédiat et spectaculaire, finalisant ainsi la création d'un jardin parfait.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 relative bg-neutral-100 rounded-[2rem] overflow-hidden min-h-[500px]">
                            {/* Visual composite of services */}
                            <Image 
                                src="/images/vert-chez-vous/travaux.png" 
                                alt="Pose de gazon de placage et panneaux bois par notre équipe de paysagistes à Nantes" 
                                fill 
                                className="object-cover hover:scale-105 transition-transform duration-[10s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60"></div>
                            <div className="absolute bottom-10 left-10 right-10 flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                                {/* floating badges */}
                                <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white/20 whitespace-nowrap">
                                    <span className="block font-bold text-neutral-900 text-lg">Gazon</span>
                                    <span className="block text-sm text-neutral-500">Effet immédiat</span>
                                </div>
                                <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white/20 whitespace-nowrap">
                                    <span className="block font-bold text-neutral-900 text-lg">Clôtures bois</span>
                                    <span className="block text-sm text-neutral-500">Robustesse & élégance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials or Philosophy */}
            <section className="bg-neutral-900 text-white py-32 rounded-t-[3rem] -mt-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
                    <Flower2 className="w-96 h-96" />
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Leaf className="w-12 h-12 text-lime-500 mx-auto mb-8 opacity-80" />
                    <h3 className="text-3xl md:text-5xl font-serif leading-snug mb-10">
                        "Un jardin, c'est bien plus que de la verdure. C'est le <span className="text-lime-400 italic font-medium">prolongement</span> de votre lieu de vie, un refuge façonné pour durer."
                    </h3>
                    <p className="text-neutral-400 text-sm font-bold tracking-widest uppercase">Équipe Vert Chez Vous Paysage</p>
                </div>
            </section>

            {/* Contact section */}
            <section id="devis" className="py-24 bg-neutral-100 relative z-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden border border-neutral-200">
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-5/12 bg-lime-900 text-white p-12 lg:p-16 relative overflow-hidden">
                                <div className="absolute -bottom-24 -right-24 opacity-10">
                                    <TreePine className="w-96 h-96" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-serif font-bold mb-6">Contactez votre artisan.</h3>
                                    <p className="text-lime-100/80 mb-12 leading-relaxed">
                                        Nantes et sa périphérie. Déplacement pour étude de faisabilité et devis gratuit.
                                    </p>
                                    
                                    <div className="space-y-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-lime-800 rounded-full flex items-center justify-center shrink-0">
                                                <Phone className="w-5 h-5 text-lime-300" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-lime-400 uppercase tracking-widest mb-1">Téléphone</p>
                                                <p className="font-bold text-xl">{PHONE_NUMBER}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-lime-800 rounded-full flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-lime-300" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-lime-400 uppercase tracking-widest mb-1">Secteur</p>
                                                <p className="font-bold text-lg">Nantes (44) et alentours</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-full lg:w-7/12 p-12 lg:p-16">
                                <form onSubmit={handleFormSubmit} className="flex flex-col h-full">
                                    {/* Progress header */}
                                    <div className="mb-10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-neutral-400">
                                        <span>Création de devis {formStep} / 3</span>
                                        <div className="flex gap-2">
                                            {[1, 2, 3].map(step => (
                                                <div key={step} className={`w-10 h-1.5 rounded-full transition-colors duration-300 ${step <= formStep ? 'bg-lime-500' : 'bg-neutral-100'}`}></div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        {formStep === 1 && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                                <div>
                                                    <h4 className="text-2xl font-bold text-neutral-900 font-serif mb-2">Quel est votre projet ?</h4>
                                                    <p className="text-neutral-500 text-sm">Arrachage, pose de gazon, palissade bois...</p>
                                                </div>
                                                <textarea
                                                    required
                                                    rows={5}
                                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-5 text-base text-neutral-800 focus:outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 transition-all resize-none shadow-sm"
                                                    placeholder="Décrivez-nous vos souhaits et la surface approximative..."
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                />
                                            </div>
                                        )}

                                        {formStep === 2 && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                                <div>
                                                    <h4 className="text-2xl font-bold text-neutral-900 font-serif mb-2">Lieu de l'intervention</h4>
                                                    <p className="text-neutral-500 text-sm">Nous intervenons sur Nantes et ses communes proches.</p>
                                                </div>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-5 text-lg text-neutral-800 focus:outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 transition-all shadow-sm"
                                                    placeholder="Ville de votre chantier"
                                                    value={formData.location}
                                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                />
                                            </div>
                                        )}

                                        {formStep === 3 && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                                <div>
                                                    <h4 className="text-2xl font-bold text-neutral-900 font-serif mb-2">Vos coordonnées</h4>
                                                    <p className="text-neutral-500 text-sm">Nous vous recontacterons au plus vite.</p>
                                                </div>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-5 text-lg text-neutral-800 focus:outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 transition-all shadow-sm"
                                                    placeholder="Numéro de téléphone"
                                                    value={formData.contact}
                                                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-10 pt-8 border-t border-neutral-100 flex justify-between items-center">
                                        {formStep > 1 ? (
                                            <button
                                                type="button"
                                                onClick={() => setFormStep(s => s - 1)}
                                                className="text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors px-4 py-2"
                                            >
                                                Retour
                                            </button>
                                        ) : <div></div>}

                                        <button
                                            type="submit"
                                            className="bg-neutral-900 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-lime-600 shadow-xl shadow-neutral-900/10 transition-all flex items-center gap-3 hover:-translate-y-1"
                                        >
                                            {formStep < 3 ? 'Continuer' : 'Envoyer ma demande'}
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#FDFCF8] text-neutral-500 py-16 border-t border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 mb-6 opacity-30">
                        <Leaf className="w-8 h-8 text-neutral-900" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-neutral-900 tracking-tight mb-2">
                        Vert Chez Vous Paysage
                    </span>
                    <p className="text-neutral-500 max-w-sm text-sm mb-12">
                        Excellence et durabilité pour vos aménagements extérieurs.
                    </p>
                    <div className="flex gap-8 text-sm font-medium">
                        <a href="#" className="hover:text-lime-700 transition-colors">Mentions Légales</a>
                        <a href="#" className="hover:text-lime-700 transition-colors">Politique de Confidentialité</a>
                    </div>
                    <p className="mt-12 text-xs text-neutral-400">
                        &copy; {new Date().getFullYear()} Vert Chez Vous Paysage - Tous droits réservés.
                    </p>
                </div>
            </footer>
        </main>
    );
}
