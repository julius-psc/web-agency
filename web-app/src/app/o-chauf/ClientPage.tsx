"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
    Phone,
    MapPin,
    ChevronRight,
    CheckCircle2,
    ShieldCheck,
    MessageSquare,
    ArrowRight,
    Droplets,
    Thermometer,
    Wind,
    Wrench,
    Flame
} from "lucide-react";

// Phone number
const PHONE_NUMBER = "06 03 00 46 17";
const WHATSAPP_LINK = "https://wa.me/33603004617";

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
        <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-800 selection:text-white">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span className="font-serif font-bold text-xl text-white tracking-tight">
                            O'chauf
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#services" className="text-sm font-medium text-slate-50 hover:text-blue-400 transition-colors">Nos Services</a>
                        <a href="#devis" className="text-sm font-medium text-slate-50 hover:text-blue-400 transition-colors">Devis gratuit</a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
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
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition-transform transform hover:scale-105 border border-blue-500 group md:hidden"
            >
                <MessageSquare className="w-6 h-6" />
            </a>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center pt-16 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-slate-900">
                    <Image
                        src="/images/o-chauf/hero.png"
                        alt="Expert plomberie et chauffage en intervention sur Reims"
                        fill
                        className="object-cover object-center opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-900/50 to-transparent opacity-90 bottom-[-5%]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-10 md:mt-0">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-blue-500/30 text-blue-100 text-xs font-semibold mb-6 uppercase tracking-widest backdrop-blur-md shadow-sm">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        Intervention sur Reims & Alentours
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 mt-2 drop-shadow-md">
                        Plomberie, Chauffage <br className="hidden md:block" />
                        <span className="text-blue-500">&</span> <span className="text-slate-200">Climatisation.</span>
                    </h1>

                    <p className="text-base md:text-xl text-slate-200 font-light max-w-2xl mb-10 leading-relaxed drop-shadow-sm">
                        O'chauf vous accompagne dans tous vos projets d'installation, d'entretien et de dépannage sanitaire et thermique. L'expertise artisanale à votre service.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4">
                        <a href="#devis" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/20 flex items-center justify-center gap-3 group shadow-lg w-full sm:w-auto">
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
            <section className="bg-slate-50 py-12 relative z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 -mt-24 relative border border-slate-100">
                        <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
                            <div className="text-center w-full flex flex-col items-center">
                                <div className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2">
                                    <Counter end={100} suffix="%" />
                                </div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Satisfaction</div>
                            </div>
                            <div className="hidden md:block w-px h-16 bg-slate-200"></div>
                            <div className="text-center w-full flex flex-col items-center">
                                <ShieldCheck className="w-10 h-10 text-blue-500 mb-4" />
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Garantie Décennale</div>
                            </div>
                            <div className="hidden md:block w-px h-16 bg-slate-200"></div>
                            <div className="text-center w-full flex flex-col items-center">
                                <Thermometer className="w-10 h-10 text-orange-500 mb-4" />
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Experts Thermiques</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 flex justify-center items-center gap-2">
                            <Wrench className="w-4 h-4" /> Nos Domaines d'Expertise
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Des solutions pour tout votre habitat</h3>
                        <p className="text-slate-600 text-lg">
                            Dépannage d'urgence, installation complète ou entretien régulier, nos experts interviennent avec rigueur et professionnalisme.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Plumbing */}
                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 group">
                            <div className="h-56 bg-slate-950 relative">
                                <Image
                                    src="/images/o-chauf/plumbing.png"
                                    alt="Plomberie"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                                <Droplets className="absolute bottom-6 left-6 w-8 h-8 text-blue-400" />
                            </div>
                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Plomberie</h4>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    Recherche de fuites, débouchage, installation de tuyauterie et raccordements. Une plomberie fiable et durable pour votre sérénité au quotidien.
                                </p>
                                <ul className="space-y-3">
                                    {['Dépannage fuites d\'eau', 'Installation et rénovation réseau', 'Débouchage canalisations'].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-slate-800">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500 mr-3 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Heating */}
                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-300 group">
                            <div className="h-56 bg-slate-950 relative">
                                <Image
                                    src="/images/o-chauf/hero.png"
                                    alt="Chauffage"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                                <Flame className="absolute bottom-6 left-6 w-8 h-8 text-orange-400" />
                            </div>
                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Chauffage</h4>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    Installation, entretien et dépannage de chaudières, pompes à chaleur et radiateurs. Optimisez votre confort thermique et réduisez vos factures.
                                </p>
                                <ul className="space-y-3">
                                    {['Pose de pompes à chaleur (PAC)', 'Entretien et dépannage chaudière', 'Plancher chauffant et radiateurs'].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-slate-800">
                                            <CheckCircle2 className="w-4 h-4 text-orange-500 mr-3 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sanitary */}
                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 group">
                            <div className="h-56 bg-slate-950 relative">
                                <Image
                                    src="/images/o-chauf/sanitary.png"
                                    alt="Sanitaire et Salle de bain"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                                <ShieldCheck className="absolute bottom-6 left-6 w-8 h-8 text-blue-400" />
                            </div>
                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Sanitaire & Salle de bain</h4>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    Création et rénovation complète de salles de bain, installation de douches à l'italienne, WC suspendus et robinetterie haute qualité.
                                </p>
                                <ul className="space-y-3">
                                    {['Création de salle de bain clé en main', 'Douches à l\'italienne', 'Remplacement d\'équipements sanitaires'].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-slate-800">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500 mr-3 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* AC */}
                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 group">
                            <div className="h-56 bg-slate-950 relative">
                                <Image
                                    src="/images/o-chauf/ac.png"
                                    alt="Climatisation"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                                <Wind className="absolute bottom-6 left-6 w-8 h-8 text-blue-400" />
                            </div>
                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Climatisation VMC</h4>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    Respirez un air sain à la température idéale toute l'année. Pose et maintenance de climatisations réversibles et systèmes de ventilation.
                                </p>
                                <ul className="space-y-3">
                                    {['Climatisation réversible (Split / Gainable)', 'Entretien et recharge', 'Installation de VMC (Simple et Double Flux)'].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-slate-800">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500 mr-3 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why choose us banner */}
            <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 p-32">
                        <Thermometer className="w-96 h-96 text-orange-500" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-32">
                        <Wrench className="w-96 h-96 text-blue-500" />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">Intervention d'urgence sur <span className="text-blue-500">Reims</span>.</h3>
                            <p className="text-lg text-slate-300 mb-8 max-w-lg">
                                Un dégât des eaux ? Une panne de chauffage en plein hiver ? O'chauf intervient rapidement pour sécuriser vos installations et procéder aux réparations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-900/50 rounded-2xl flex items-center justify-center border border-blue-800">
                                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="font-semibold text-slate-100">Devis Rapide & Transparent</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center border border-slate-700">
                                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="font-semibold text-slate-100">Artisan Qualifié</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <Image
                                src="/images/o-chauf/plumbing.png"
                                width={450}
                                height={600}
                                alt="Installation de plomberie"
                                className="rounded-3xl shadow-2xl border-4 border-slate-900 rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="devis" className="py-24 bg-white text-slate-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 uppercase tracking-widest">
                                Parlez-nous de votre projet
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif text-slate-900 leading-tight">Obtenez votre <span className="text-blue-600">Devis Détaché</span></h3>
                            <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                                Renseignez les détails de votre besoin en plomberie, chauffage, sanitaire ou climatisation. Nous reviendrons vers vous avec une estimation rapide.
                            </p>

                            <div className="space-y-8 bg-slate-50 p-8 rounded-3xl border border-slate-200">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Assistance Téléphonique</p>
                                        <p className="font-bold text-2xl text-slate-800">{PHONE_NUMBER}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                                        <MapPin className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Zone d'intervention</p>
                                        <p className="font-bold text-lg text-slate-800">Reims et Agglomération</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <form onSubmit={handleFormSubmit} className="flex flex-col bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50">
                                {/* Progress header */}
                                <div className="mb-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                                    <span>Étape {formStep} / 3</span>
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(step => (
                                            <div key={step} className={`w-8 h-1.5 rounded-full transition-colors duration-300 ${step <= formStep ? 'bg-blue-500' : 'bg-slate-100'}`}></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="min-h-[220px]">
                                    {formStep === 1 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                                            <h4 className="text-2xl font-bold text-slate-900 font-serif">Nature de l'intervention ?</h4>
                                            <p className="text-slate-500 text-sm mb-4">Décrivez brièvement votre besoin (installation, panne, fuite...)</p>
                                            <textarea
                                                required
                                                rows={5}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-inner"
                                                placeholder="Ex: Remplacement d'un vieux chauffe-eau ou fuite sous l'évier..."
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    {formStep === 2 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                                            <h4 className="text-2xl font-bold text-slate-900 font-serif">Quelle est la localisation du chantier ?</h4>
                                            <p className="text-slate-500 text-sm mb-4">Ville ou code postal (ex. 51100 Reims)</p>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                                                placeholder="51100 Reims"
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    {formStep === 3 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                                            <h4 className="text-2xl font-bold text-slate-900 font-serif">Vos coordonnées</h4>
                                            <p className="text-slate-500 text-sm mb-4">Comment pouvons-nous vous joindre ?</p>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                                                placeholder="06 XX XX XX XX"
                                                value={formData.contact}
                                                onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
                                    {formStep > 1 ? (
                                        <button
                                            type="button"
                                            onClick={() => setFormStep(s => s - 1)}
                                            className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors px-4 py-2"
                                        >
                                            Retour
                                        </button>
                                    ) : <div></div>}

                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-3 hover:-translate-y-1"
                                    >
                                        {formStep < 3 ? 'Étape suivante' : 'Conclure le devis'}
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 py-16 border-t-4 border-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-2 mb-6">
                            <Droplets className="w-6 h-6 text-blue-500" />
                            <span className="text-2xl font-serif font-bold text-white tracking-tight">
                                O'chauf
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed max-w-sm mb-8 text-sm">
                            Entreprise de plomberie spécialisée dans le chauffage, sanitaire et la climatisation, située à Reims. L'exigence et le savoir-faire avant tout.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact</h4>
                        <div className="space-y-4 text-sm font-medium">
                            <p className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-blue-500" /> {PHONE_NUMBER}
                            </p>
                            <a href={WHATSAPP_LINK} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                                <MessageSquare className="w-4 h-4 text-blue-500" /> WhatsApp Direct
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Expertises</h4>
                        <ul className="space-y-3 text-sm flex flex-col items-start font-medium">
                            <li className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400">Plomberie & Dépannage</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400">Installation Chauffage</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400">Création Sanitaire</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400">Climatisation & VMC</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-600">
                    <p>&copy; {new Date().getFullYear()} O'chauf Plomberie. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-400 transition-colors">Mentions Légales</a>
                        <a href="#" className="hover:text-slate-400 transition-colors">Politique de Confidentialité</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
