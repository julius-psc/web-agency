"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
    Phone,
    MapPin,
    ChevronRight,
    CheckCircle2,
    Leaf,
    ShieldCheck,
    MessageSquare,
    ArrowRight,
    TreePine
} from "lucide-react";

// Placeholder phone number
const PHONE_NUMBER = "06 45 32 89 12";
const WHATSAPP_LINK = "https://wa.me/33645328912";

// Counter component
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
            window.open(`${WHATSAPP_LINK}?text=Bonjour,%20j'ai%20besoin%20d'une%20intervention%20:%20${formData.description}.%20Lieu:%20${formData.location}`, '_blank');
        }
    };

    return (
        <main className="min-h-screen bg-stone-50 text-slate-900 font-sans selection:bg-emerald-800 selection:text-white">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-emerald-950/90 backdrop-blur-md border-b border-emerald-900 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-400" />
                        <span className="font-serif font-bold text-xl text-white tracking-tight">
                            M. Foissotte
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#services" className="text-sm font-medium text-emerald-50 hover:text-emerald-300 transition-colors">Services</a>
                        <a href="#devis" className="text-sm font-medium text-emerald-50 hover:text-emerald-300 transition-colors">Devis gratuit</a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {PHONE_NUMBER}
                        </a>
                    </div>
                </div>
            </nav>

            {/* Sticky Bottom-Right CTA Mobile */}
            <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-emerald-600 text-white rounded-full shadow-xl shadow-emerald-600/30 hover:bg-emerald-500 transition-transform transform hover:scale-105 border border-emerald-500 group md:hidden"
            >
                <MessageSquare className="w-6 h-6" />
            </a>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center pt-16 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-emerald-950">
                    <Image
                        src="/images/elagage/hero.png"
                        alt="Artisan élagueur grimpeur au travail dans un arbre ensoleillé"
                        fill
                        className="object-cover object-center opacity-50 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent opacity-90 bottom-[-5%]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-10 md:mt-0">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-400/30 text-emerald-100 text-xs font-semibold mb-6 uppercase tracking-widest backdrop-blur-md shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Artisan Grimpeur Certifié
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 mt-2 drop-shadow-md">
                        Élagage <span className="text-emerald-400">&</span> Abattage <br className="hidden md:block" />
                        <span className="text-stone-200">En Toute Sécurité.</span>
                    </h1>

                    <p className="text-base md:text-xl text-stone-200 font-light max-w-2xl mb-10 leading-relaxed drop-shadow-sm">
                        Mr. Foissotte Marcel, spécialiste de l'arbre et des interventions délicates. <br className="hidden md:block" />Nous prenons soin de votre patrimoine arboré.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4">
                        <a href="#devis" className="bg-emerald-500 text-white px-8 py-4 rounded-xl text-base font-bold transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-3 group shadow-lg w-full sm:w-auto">
                            Demander un Devis
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl text-base font-medium transition-all hover:bg-white/20 flex items-center justify-center gap-3 w-full sm:w-auto">
                            <Phone className="w-5 h-5" />
                            Appel Urgent
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats / Trust Badges */}
            <section className="bg-stone-50 py-12 relative z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 md:p-12 -mt-24 relative border border-stone-100">
                        <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
                            <div className="text-center w-full flex flex-col items-center">
                                <div className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-2">
                                    <Counter end={10} suffix="+" />
                                </div>
                                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ans de Métier</div>
                            </div>
                            <div className="hidden md:block w-px h-16 bg-stone-200"></div>
                            <div className="text-center w-full flex flex-col items-center">
                                <Leaf className="w-10 h-10 text-emerald-500 mb-4" />
                                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Respect du Végétal</div>
                            </div>
                            <div className="hidden md:block w-px h-16 bg-stone-200"></div>
                            <div className="text-center w-full flex flex-col items-center">
                                <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
                                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Garantie & Assurance</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-24 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-3 flex justify-center items-center gap-2">
                            <Leaf className="w-4 h-4" /> Nos Interventions
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 font-serif">Un Travail d'Orfèvre</h3>
                        <p className="text-stone-600 text-lg">
                            De la taille douce à l'abattage par démontage de sujets dangereux, nous maîtrisons toutes les techniques de l'arboriculture moderne.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300 group">
                            <div className="h-48 bg-emerald-950 relative">
                                <Image
                                    src="/images/elagage/hero.png"
                                    alt="Elagage"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-transparent"></div>
                                <TreePine className="absolute bottom-6 left-6 w-8 h-8 text-emerald-400" />
                            </div>
                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-stone-900 mb-3 font-serif">Élagage & Taille</h4>
                                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                    Taille douce, d'éclaircie ou de sécurisation. Nous adaptons notre intervention à l'essence et à l'état sanitaire de l'arbre.
                                </p>
                                <ul className="space-y-3">
                                    {['Taille sanitaire', 'Allègement de charpentières', 'Taille de formation'].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-stone-800">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300 group">
                            <div className="h-48 bg-emerald-950 relative">
                                {/* Use same image or solid background for now to keep it visual */}
                                <div className="absolute inset-0 bg-[url('/images/elagage/hero.png')] bg-cover bg-center opacity-40 grayscale group-hover:scale-105 transition-transform duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-transparent"></div>
                                <ShieldCheck className="absolute bottom-6 left-6 w-8 h-8 text-emerald-400" />
                            </div>
                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-stone-900 mb-3 font-serif">Abattage Délicat</h4>
                                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                    Démontage d'arbres menaçants votre habitation ou réseaux. Maîtrise des techniques de rétention en espace restreint.
                                </p>
                                <ul className="space-y-3">
                                    {['Abattage direct', 'Démontage avec rétention', 'Essouchage & rognage'].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-stone-800">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300 group">
                            <div className="h-48 bg-emerald-950 relative">
                                <Image
                                    src="/images/elagage/hedge.png"
                                    alt="Entretien extérieur"
                                    fill
                                    className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-emerald-950/20"></div>
                                <Leaf className="absolute bottom-6 left-6 w-8 h-8 text-emerald-400" />
                            </div>
                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-stone-900 mb-3 font-serif">Taille de Haies & Entretien</h4>
                                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                    Redonnez une ligne parfaite à votre jardin. Intervention ponctuelle de taille de haies, arbustes et évacuation des déchets.
                                </p>
                                <ul className="space-y-3">
                                    {['Taille de haies toutes hauteurs', 'Débroussaillage', 'Broyage de branches'].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-stone-800">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why choose us banner */}
            <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
                    <TreePine className="w-96 h-96" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">Intervention rapide <br />sur <span className="text-emerald-400">toute la région</span>.</h3>
                            <p className="text-lg text-emerald-100/70 mb-8 max-w-lg">
                                Matériel performant, respect scrupuleux des règles de sécurité et un travail soigné du premier coup de scie jusqu'au nettoyage de fin de chantier.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-2xl flex items-center justify-center border border-emerald-800">
                                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="font-semibold">Devis Gratuit</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-2xl flex items-center justify-center border border-emerald-800">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="font-semibold">Nettoyage Garanti</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <Image
                                src="/images/elagage/hero.png"
                                width={400}
                                height={500}
                                alt="Grimpeur élagueur"
                                className="rounded-3xl shadow-2xl border-4 border-emerald-900 rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="devis" className="py-24 bg-white text-stone-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-6 uppercase tracking-widest">
                                Parlez-nous de votre arbre
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif text-stone-900 leading-tight">Obtenez votre <span className="text-emerald-600">Devis Rapide</span></h3>
                            <p className="text-stone-500 mb-10 text-lg leading-relaxed">
                                Donnez-nous quelques détails sur votre projet d'élagage, d'abattage ou d'entretien. Marcel Foissotte vous recontactera très rapidement.
                            </p>

                            <div className="space-y-8 bg-stone-50 p-8 rounded-3xl border border-stone-200">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 shrink-0">
                                        <Phone className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Assistance Urgente</p>
                                        <p className="font-bold text-2xl text-stone-800">{PHONE_NUMBER}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 shrink-0">
                                        <MapPin className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Zone d'intervention</p>
                                        <p className="font-bold text-lg text-stone-800">Canton & Environs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <form onSubmit={handleFormSubmit} className="flex flex-col bg-white border border-stone-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-stone-200/50">
                                {/* Progress header */}
                                <div className="mb-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
                                    <span>Étape {formStep} / 3</span>
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(step => (
                                            <div key={step} className={`w-8 h-1.5 rounded-full transition-colors duration-300 ${step <= formStep ? 'bg-emerald-500' : 'bg-stone-100'}`}></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="min-h-[220px]">
                                    {formStep === 1 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                                            <h4 className="text-2xl font-bold text-stone-900 font-serif">Nature des travaux ?</h4>
                                            <p className="text-stone-500 text-sm mb-4">Abattage, taille, hauteur estimée...</p>
                                            <textarea
                                                required
                                                rows={5}
                                                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 text-base text-stone-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none shadow-inner"
                                                placeholder="Ex: Un chêne d'environ 15m proche de la maison à élaguer..."
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    {formStep === 2 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                                            <h4 className="text-2xl font-bold text-stone-900 font-serif">Où vous situez-vous ?</h4>
                                            <p className="text-stone-500 text-sm mb-4">Ville ou code postal pour estimer le déplacement.</p>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 text-lg text-stone-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
                                                placeholder="Ex: 75000 Paris"
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    {formStep === 3 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                                            <h4 className="text-2xl font-bold text-stone-900 font-serif">Vos coordonnées</h4>
                                            <p className="text-stone-500 text-sm mb-4">Comment pouvons-nous vous joindre ?</p>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 text-lg text-stone-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
                                                placeholder="06 XX XX XX XX"
                                                value={formData.contact}
                                                onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-8 border-t border-stone-100 flex justify-between items-center">
                                    {formStep > 1 ? (
                                        <button
                                            type="button"
                                            onClick={() => setFormStep(s => s - 1)}
                                            className="text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors px-4 py-2"
                                        >
                                            Retour
                                        </button>
                                    ) : <div></div>}

                                    <button
                                        type="submit"
                                        className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-3 hover:-translate-y-1"
                                    >
                                        {formStep < 3 ? 'Étape suivante' : 'Demander le devis'}
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-stone-950 text-stone-400 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-2 mb-6">
                            <Leaf className="w-6 h-6 text-emerald-500" />
                            <span className="text-2xl font-serif font-bold text-white tracking-tight">
                                M. Foissotte
                            </span>
                        </div>
                        <p className="text-stone-400 leading-relaxed max-w-sm mb-8 text-sm">
                            Artisan élagueur grimpeur. Expertise et passion de l'arbre au service des particuliers et collectivités.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact</h4>
                        <div className="space-y-4 text-sm font-medium">
                            <p className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-emerald-500" /> {PHONE_NUMBER}
                            </p>
                            <a href={WHATSAPP_LINK} className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors">
                                <MessageSquare className="w-4 h-4 text-emerald-500" /> WhatsApp Direct
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Services</h4>
                        <ul className="space-y-3 text-sm flex flex-col items-start font-medium">
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Élagage & Taille Douce</li>
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Abattage & Démontage</li>
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Taille de Haies</li>
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Entretien Parc & Jardin</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-stone-600">
                    <p>&copy; {new Date().getFullYear()} Mr. Foissotte Marcel. Artisan Élagueur.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-stone-400 transition-colors">Mentions Légales</a>
                        <a href="#" className="hover:text-stone-400 transition-colors">Cookies</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
