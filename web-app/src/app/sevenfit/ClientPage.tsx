"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
    Phone,
    MapPin,
    ChevronRight,
    Dumbbell,
    Flame,
    HeartPulse,
    Activity,
    ArrowRight,
    MessageSquare,
    CheckCircle
} from "lucide-react";

const PHONE_NUMBER = "06 15 70 74 03";
const WHATSAPP_LINK = "https://wa.me/33615707403";

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
    const [formData, setFormData] = useState({ objective: "", level: "", contact: "" });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formStep < 3) {
            setFormStep(s => s + 1);
        } else {
            window.open(`${WHATSAPP_LINK}?text=Bonjour,%20je%20suis%20intéressé(e)%20par%20un%20coaching.%20Objectif:%20${formData.objective}.%20Niveau:%20${formData.level}`, '_blank');
        }
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-lime-500 selection:text-zinc-950">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <span className="font-sans font-black text-2xl text-white tracking-widest uppercase italic">
                        SEVEN<span className="text-lime-500">FIT</span>
                    </span>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#services" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Coaching</a>
                        <a href="#nutrition" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Nutrition</a>
                        <a href="#contact" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Bilan Offert</a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-lime-500 text-zinc-950 px-5 py-2 rounded-none text-sm font-bold hover:bg-lime-400 transition-all flex items-center gap-2 uppercase tracking-wide">
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
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-lime-500 text-zinc-950 rounded-full shadow-[0_0_20px_rgba(132,204,22,0.4)] hover:bg-lime-400 transition-transform transform hover:scale-105 group md:hidden"
            >
                <MessageSquare className="w-6 h-6" />
            </a>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center pt-16">
                <div className="absolute inset-0 z-0 bg-zinc-950">
                    <Image
                        src="/images/sevenfit_hero.png"
                        alt="Coach sportif Sevenfit motivant au Havre"
                        fill
                        className="object-cover object-center opacity-50 mix-blend-overlay"
                        priority
                    />
                    {/* Gradient overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none border border-lime-500/50 bg-lime-500/10 text-lime-400 text-xs font-bold mb-8 uppercase tracking-widest backdrop-blur-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        Coaching Studio · Le Havre
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-6 mt-4 italic">
                        Repousse tes <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">
                            Limites.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
                        Transforme ton corps et ton esprit avec un programme 100% sur mesure. Coaching, nutrition et suivi par ton expert au Havre.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                        <a href="#contact" className="bg-lime-500 text-zinc-950 px-8 py-4 rounded-none text-sm font-bold uppercase tracking-widest transition-all hover:bg-lime-400 hover:scale-105 flex items-center justify-center gap-2 group">
                            Commencer Maintenant
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-transparent border-2 border-zinc-700 text-white px-8 py-4 rounded-none text-sm font-bold uppercase tracking-widest transition-all hover:border-zinc-500 hover:bg-zinc-800/50 backdrop-blur-md flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Prendre RDV
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-zinc-900 border-y border-zinc-800 py-12 relative z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center w-full">
                            <div className="text-4xl md:text-5xl font-black text-lime-500 mb-2 italic">
                                <Counter end={300} suffix="+" />
                            </div>
                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Vies Transformées</div>
                        </div>
                        <div className="text-center w-full">
                            <div className="text-4xl md:text-5xl font-black text-lime-500 mb-2 italic">
                                <Counter end={100} suffix="%" />
                            </div>
                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Sur Mesure</div>
                        </div>
                        <div className="text-center w-full">
                            <div className="text-4xl md:text-5xl font-black text-lime-500 mb-2 italic">
                                <Counter end={5} suffix="+" />
                            </div>
                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Années d'Expertise</div>
                        </div>
                        <div className="text-center w-full">
                            <div className="text-4xl md:text-5xl font-black text-lime-500 mb-2 italic">
                                24/7
                            </div>
                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Suivi WhatsApp</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Services Section 1 */}
            <section id="services" className="py-24 bg-zinc-950 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-lime-500/10 blur-2xl rounded-full"></div>
                            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-zinc-800">
                                <Image
                                    src="/images/sevenfit_coaching.png"
                                    alt="Coaching en salle avec Sevenfit"
                                    fill
                                    className="object-cover transition-transform hover:scale-105 duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2">Coaching Privé</h3>
                                    <p className="text-zinc-300 text-sm font-medium">L'accompagnement parfait pour exploser tes performances.</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <h2 className="text-lime-500 font-bold tracking-widest text-xs uppercase mb-3">La Méthode</h2>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight italic">Entraînement <br />Intelligent.</h3>
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    Fini les séances hasardeuses. Nous construisons ensemble un programme d'entraînement basé sur la biomécanique, adapté à ta morphologie et tes objectifs.
                                </p>
                            </div>

                            <ul className="space-y-4 pt-4">
                                {[
                                    { icon: <Dumbbell className="w-5 h-5 text-lime-500" />, title: "Hypertrophie & Renforcement", desc: "Développe ta masse musculaire de façon optimale." },
                                    { icon: <Flame className="w-5 h-5 text-lime-500" />, title: "Perte de Gras", desc: "Des circuits métaboliques exigeants mais gratifiants." },
                                    { icon: <Activity className="w-5 h-5 text-lime-500" />, title: "Prévention & Santé", desc: "Renforce tes articulations et améliore ta posture." }
                                ].map((item, i) => (
                                    <li key={i} className="flex p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-500/50 transition-colors">
                                        <div className="flex-shrink-0 mt-1 mr-4">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-wide text-sm">{item.title}</h4>
                                            <p className="text-zinc-500 text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Services Section 2 */}
            <section id="nutrition" className="py-24 bg-zinc-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-yellow-500/10 blur-2xl rounded-full"></div>
                            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-zinc-800">
                                <Image
                                    src="/images/sevenfit_nutrition.png"
                                    alt="Plan nutritionnel et repas sains"
                                    fill
                                    className="object-cover transition-transform hover:scale-105 duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2">Plan Nutritionnel</h3>
                                    <p className="text-zinc-300 text-sm font-medium">Parce que les abdos se font dans la cuisine.</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <h2 className="text-lime-500 font-bold tracking-widest text-xs uppercase mb-3">L'Assiette</h2>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight italic">Nourris <br />Ton Potentiel.</h3>
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    L'entraînement ne représente que 20% des résultats. La nutrition est la clé. Pas de régimes restrictifs, mais une rééducation alimentaire faite pour durer.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                {[
                                    'Plan de repas structuré',
                                    'Calcul des macronutriments',
                                    'Check-in hebdomadaire',
                                    'Liste de courses optimisée',
                                    'Recettes simples et rapides',
                                    'Hydratation & Supplémentation'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center text-sm font-bold text-zinc-300">
                                        <CheckCircle className="w-5 h-5 text-lime-500 mr-3 flex-shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approach */}
            <section className="py-20 bg-lime-500 text-zinc-950">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <HeartPulse className="w-16 h-16 mx-auto mb-6 text-zinc-900" />
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 max-w-3xl mx-auto">
                        "La motivation te fait commencer, l'habitude te fait continuer."
                    </h2>
                    <p className="font-bold text-lg mb-8 uppercase tracking-widest opacity-80">
                        Ton succès est mon objectif
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="py-24 bg-zinc-950 text-white relative">
                {/* Background graphic */}
                <div className="absolute inset-0 opacity-5 -z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-lime-500 font-bold tracking-widest text-xs uppercase mb-3">Passer à l'action</h2>
                            <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">Premier Bilan <br />Offert.</h3>
                            <p className="text-zinc-400 mb-10 text-lg leading-relaxed">
                                Remplis ce court formulaire pour faire connaissance. Nous évaluerons tes besoins, ton niveau actuel et mettrons en place un plan d'action. Sans engagement.
                            </p>

                            <div className="space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-zinc-800 rounded-none flex items-center justify-center border border-zinc-700">
                                        <Phone className="w-6 h-6 text-lime-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Ligne Directe</p>
                                        <p className="font-black text-xl italic mt-1">{PHONE_NUMBER}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-zinc-800 rounded-none flex items-center justify-center border border-zinc-700">
                                        <MapPin className="w-6 h-6 text-lime-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Le Havre & Alentours</p>
                                        <p className="font-black text-xl italic mt-1">Coaching Studio privé ou Extérieur</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 blur-3xl rounded-full"></div>

                                <form onSubmit={handleFormSubmit} className="flex flex-col h-full relative z-10">
                                    {/* Progress header */}
                                    <div className="mb-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                                        <span>Étape {formStep} / 3</span>
                                        <div className="flex gap-2">
                                            {[1, 2, 3].map(step => (
                                                <div key={step} className={`w-8 h-1 ${step <= formStep ? 'bg-lime-500' : 'bg-zinc-800'}`}></div>
                                            ))}
                                        </div>
                                    </div>

                                    {formStep === 1 && (
                                        <div className="space-y-6 animate-in fade-in duration-300">
                                            <div>
                                                <h4 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Quel est ton objectif ?</h4>
                                                <p className="text-zinc-400 text-sm">Sois le plus précis possible.</p>
                                            </div>
                                            <div className="space-y-3">
                                                {['Perte de poids', 'Prise de masse', 'Remise en forme', 'Préparation physique'].map((opt) => (
                                                    <label key={opt} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.objective === opt ? 'border-lime-500 bg-lime-500/10 text-white' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}>
                                                        <input type="radio" name="objective" className="hidden" value={opt} onChange={() => setFormData({ ...formData, objective: opt })} />
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${formData.objective === opt ? 'border-lime-500' : 'border-zinc-600'}`}>
                                                            {formData.objective === opt && <div className="w-3 h-3 bg-lime-500 rounded-full"></div>}
                                                        </div>
                                                        <span className="font-bold uppercase tracking-wide text-sm">{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {formStep === 2 && (
                                        <div className="space-y-6 animate-in fade-in duration-300">
                                            <div>
                                                <h4 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Ton niveau actuel</h4>
                                                <p className="text-zinc-400 text-sm">Pour adapter l'approche.</p>
                                            </div>
                                            <div className="space-y-3">
                                                {['Débutant (Jamais de sport)', 'Intermédiaire (1-2x/semaine)', 'Avancé (3x+/semaine)'].map((opt) => (
                                                    <label key={opt} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.level === opt ? 'border-lime-500 bg-lime-500/10 text-white' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}>
                                                        <input type="radio" name="level" className="hidden" value={opt} onChange={() => setFormData({ ...formData, level: opt })} />
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${formData.level === opt ? 'border-lime-500' : 'border-zinc-600'}`}>
                                                            {formData.level === opt && <div className="w-3 h-3 bg-lime-500 rounded-full"></div>}
                                                        </div>
                                                        <span className="font-bold uppercase tracking-wide text-sm">{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {formStep === 3 && (
                                        <div className="space-y-6 animate-in fade-in duration-300">
                                            <div>
                                                <h4 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Tes coordonnées</h4>
                                                <p className="text-zinc-400 text-sm">Pour qu'on en discute sur WhatsApp.</p>
                                            </div>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all text-lg font-bold"
                                                placeholder="06 XX XX XX XX ou Prénom"
                                                value={formData.contact}
                                                onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    <div className="mt-10 pt-8 border-t border-zinc-800 flex justify-between items-center">
                                        {formStep > 1 ? (
                                            <button
                                                type="button"
                                                onClick={() => setFormStep(s => s - 1)}
                                                className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors"
                                            >
                                                Retour
                                            </button>
                                        ) : <div></div>}

                                        <button
                                            type="submit"
                                            disabled={(formStep === 1 && !formData.objective) || (formStep === 2 && !formData.level)}
                                            className="bg-lime-500 text-zinc-950 px-8 py-3 rounded-none text-sm font-black uppercase tracking-widest hover:bg-lime-400 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                        >
                                            {formStep < 3 ? 'Suivant' : 'Envoyer'}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 text-zinc-500 py-16 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <span className="font-sans font-black text-3xl text-white tracking-widest uppercase italic mb-6 block">
                            SEVEN<span className="text-lime-500">FIT</span>
                        </span>
                        <p className="text-base leading-relaxed max-w-sm font-medium">
                            Coaching sportif et nutritionnel sur-mesure au Havre. Le résultat n'est pas une option, c'est une certitude.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Contact</h4>
                        <div className="space-y-4 text-sm font-medium">
                            <p>Le Havre, France (76)</p>
                            <p className="text-lime-500">{PHONE_NUMBER}</p>
                            <a href={WHATSAPP_LINK} className="text-zinc-400 hover:text-white transition-colors block">Me contacter sur WhatsApp</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Légal</h4>
                        <div className="space-y-4 text-sm font-medium flex flex-col items-start">
                            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                            <a href="#" className="hover:text-white transition-colors">CGV</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-wider uppercase">
                    <p>&copy; {new Date().getFullYear()} Sevenfit. Tous droits réservés.</p>
                    <p>Designed with <span className="text-lime-500">Power</span></p>
                </div>
            </footer>
        </main>
    );
}
