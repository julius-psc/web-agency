"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { 
    Phone, 
    MapPin, 
    ChevronRight, 
    CheckCircle2, 
    Building2, 
    Hammer, 
    MessageSquare,
    ArrowRight
} from "lucide-react";

const PHONE_NUMBER = "06 86 47 62 58";
const WHATSAPP_LINK = "https://wa.me/33686476258";

// Simple counter without framer-motion dependency
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
            window.open(`${WHATSAPP_LINK}?text=Bonjour,%20j'ai%20un%20projet%20:%20${formData.description}.%20Lieu:%20${formData.location}`, '_blank');
        }
    };

    return (
        <main className="min-h-screen bg-stone-50 text-slate-900 font-sans selection:bg-slate-800 selection:text-white pb-20 md:pb-0">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <span className="font-serif font-bold text-xl text-slate-900 tracking-tight">
                        Goncalves <span className="text-slate-500">&</span> de Moura
                    </span>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#services" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Services</a>
                        <a href="#devis" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Devis gratuit</a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {PHONE_NUMBER}
                        </a>
                    </div>
                </div>
            </nav>

            {/* Sticky Bottom-Right CTA */}
            <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-transform transform hover:scale-105 border border-slate-700 group md:hidden"
            >
                <MessageSquare className="w-6 h-6" />
            </a>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center pt-16">
                <div className="absolute inset-0 z-0 bg-slate-900">
                    <Image
                        src="/images/hero.png"
                        alt="Projet de maçonnerie en pierre moderne, Bretagne"
                        fill
                        className="object-cover object-center opacity-40 mix-blend-overlay"
                        priority
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-stone-100 text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
                        <MapPin className="w-3 h-3" />
                        Basé à Brest, Finistère
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 mt-4">
                        L'Excellence de la Pierre, <br/>
                        <span className="text-stone-300">la Force du Béton.</span>
                    </h1>
                    
                    <p className="text-base md:text-lg text-stone-200 font-light max-w-2xl mb-10 leading-relaxed">
                        Entreprise Goncalves et de Moura. Votre partenaire local de confiance pour le gros œuvre et la rénovation.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                        <a href="#devis" className="bg-white text-slate-900 px-6 py-3 rounded-lg text-base font-semibold transition-all hover:bg-stone-100 flex items-center justify-center gap-2 group shadow-lg">
                            Demander un Devis
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-slate-800/80 backdrop-blur-md border border-slate-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-all hover:bg-slate-700 flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Nous Appeler
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-b border-slate-200 py-10 relative z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-around items-center gap-8">
                        <div className="text-center w-full">
                            <div className="text-3xl font-bold text-slate-900 mb-1">
                                <Counter end={15} suffix="+" />
                            </div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Ans d'Expérience</div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                        <div className="text-center w-full">
                            <div className="text-3xl font-bold text-slate-900 mb-1">
                                <Counter end={500} suffix="+" />
                            </div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Projets Réalisés</div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                        <div className="text-center w-full flex flex-col items-center">
                            <CheckCircle2 className="w-8 h-8 text-slate-900 mb-1" />
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Garantie Décennale</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-20 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-slate-500 font-bold tracking-widest text-xs uppercase mb-3">Notre Savoir-Faire</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-serif">Solutions de Construction</h3>
                        <p className="text-slate-600 text-base">
                            Des prestations soignées combinant techniques traditionnelles et matériaux de qualité.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                                <Building2 className="w-6 h-6 text-slate-700" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 font-serif">Maçonnerie Générale</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Construction neuve, fondations et élévation. Nous bâtissons la structure de votre projet avec précision.
                            </p>
                            <ul className="space-y-2">
                                {['Gros œuvre', 'Fondations', 'Dalles béton'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-slate-400 mr-2" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                                <Hammer className="w-6 h-6 text-slate-700" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 font-serif">Rénovation de Pierre</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Spécialistes du bâti ancien. Nous restaurons murs, cheminées et façades en préservant leur authenticité.
                            </p>
                            <ul className="space-y-2">
                                {['Rejointoiement', 'Taille de pierre', 'Sablage'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-slate-400 mr-2" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                                <MessageSquare className="w-6 h-6 text-slate-700" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 font-serif">Aménagements Extérieurs</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Sublimez vos extérieurs avec des terrasses, murets et allées aux finitions irréprochables.
                            </p>
                            <ul className="space-y-2">
                                {['Terrasses béton', 'Murets et clôtures', 'Pavage'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-slate-400 mr-2" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="devis" className="py-20 bg-slate-900 text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl font-bold mb-4 font-serif">Démarrez votre projet</h3>
                            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                                Obtenez un devis estimatif gratuit et rapide. Décrivez-nous vos besoins, notre équipe vous recontactera sous 48h.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-stone-300" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wide">Appelez-nous</p>
                                        <p className="font-semibold text-lg">{PHONE_NUMBER}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-stone-300" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wide">Localisation</p>
                                        <p className="font-semibold text-lg">Brest & Finistère</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-1/2 bg-white text-slate-900 rounded-2xl p-8 shadow-xl">
                            <form onSubmit={handleFormSubmit} className="flex flex-col h-full">
                                {/* Progress header */}
                                <div className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    <span>Étape {formStep} sur 3</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(step => (
                                            <div key={step} className={`w-6 h-1 rounded-full ${step <= formStep ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
                                        ))}
                                    </div>
                                </div>

                                {formStep === 1 && (
                                    <div className="space-y-4 animate-in fade-in duration-300">
                                        <h4 className="text-lg font-bold text-slate-900">Décrivez votre projet</h4>
                                        <textarea 
                                            required
                                            rows={4}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-slate-400 transition-colors"
                                            placeholder="Ex: Rénovation d'un mur en pierre..."
                                            value={formData.description}
                                            onChange={e => setFormData({...formData, description: e.target.value})}
                                        />
                                    </div>
                                )}

                                {formStep === 2 && (
                                    <div className="space-y-4 animate-in fade-in duration-300">
                                        <h4 className="text-lg font-bold text-slate-900">Localisation</h4>
                                        <input 
                                            required
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-slate-400 transition-colors"
                                            placeholder="Ex: 29200 Brest"
                                            value={formData.location}
                                            onChange={e => setFormData({...formData, location: e.target.value})}
                                        />
                                    </div>
                                )}

                                {formStep === 3 && (
                                    <div className="space-y-4 animate-in fade-in duration-300">
                                        <h4 className="text-lg font-bold text-slate-900">Vos coordonnées</h4>
                                        <input 
                                            required
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-slate-400 transition-colors"
                                            placeholder="06 XX XX XX XX ou Email"
                                            value={formData.contact}
                                            onChange={e => setFormData({...formData, contact: e.target.value})}
                                        />
                                    </div>
                                )}

                                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                                    {formStep > 1 ? (
                                        <button 
                                            type="button" 
                                            onClick={() => setFormStep(s => s - 1)}
                                            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                                        >
                                            Retour
                                        </button>
                                    ) : <div></div>}
                                    
                                    <button 
                                        type="submit"
                                        className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                                    >
                                        {formStep < 3 ? 'Suivant' : 'Envoyer'}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <span className="text-lg font-serif font-bold text-white mb-4 block">
                            Goncalves <span className="text-slate-500">&</span> de Moura
                        </span>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Entreprise générale de bâtiment à Brest. Excellence de la conception à la réalisation.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
                        <div className="space-y-2 text-sm">
                            <p>Brest, Finistère (29)</p>
                            <p>{PHONE_NUMBER}</p>
                            <a href={WHATSAPP_LINK} className="text-stone-300 hover:text-white transition-colors">WhatsApp</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Légal</h4>
                        <div className="space-y-2 text-sm flex flex-col items-start">
                            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800/50 text-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Gonçalves et de Moura SARL. Tous droits réservés.</p>
                </div>
            </footer>
        </main>
    );
}
