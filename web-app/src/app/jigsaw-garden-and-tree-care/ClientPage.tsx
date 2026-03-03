"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
    Phone,
    MapPin,
    ChevronRight,
    CheckCircle2,
    Leaf,
    Hammer,
    Scissors,
    MessageSquare,
    ArrowRight
} from "lucide-react";

// Placeholder UK number for WhatsApp and Phone
const PHONE_NUMBER = "07700 900077";
const WHATSAPP_LINK = "https://wa.me/447700900077";

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
    const [formData, setFormData] = useState({ service: "", location: "", contact: "" });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formStep < 3) {
            setFormStep(s => s + 1);
        } else {
            window.open(`${WHATSAPP_LINK}?text=Hello,%20I'm%20interested%20in%20your%20services.%20Project:%20${formData.service}.%20Location:%20${formData.location}`, '_blank');
        }
    };

    return (
        <main className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-600 selection:text-white">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <span className="font-serif font-bold text-xl text-white tracking-tight flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-500" />
                        Jigsaw <span className="text-emerald-500">Garden & Tree Care</span>
                    </span>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#services" className="text-sm font-medium text-stone-300 hover:text-white transition-colors">Services</a>
                        <a href="#rates" className="text-sm font-medium text-stone-300 hover:text-white transition-colors">Get Rates</a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-500 transition-all flex items-center gap-2">
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
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-500 transition-transform transform hover:scale-105 group md:hidden"
            >
                <MessageSquare className="w-6 h-6" />
            </a>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center pt-16">
                <div className="absolute inset-0 z-0 bg-stone-950">
                    <Image
                        src="/images/jigsaw_hero.png"
                        alt="Beautiful English garden in Sussex"
                        fill
                        className="object-cover object-center opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/20 to-stone-950/80 pointer-events-none"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-100 text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
                        <MapPin className="w-3 h-3" />
                        Brighton and Hove & Sussex Area
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 mt-4">
                        Exceptional <span className="text-emerald-400">Gardens,</span> <br />
                        Healthy Trees.
                    </h1>

                    <p className="text-base md:text-lg text-stone-200 font-medium max-w-2xl mb-10 leading-relaxed">
                        Jigsaw Garden and Tree Care. We transform and maintain outdoor spaces across the Sussex area with expert landscaping, gardening, and tree surgery.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                        <a href="#rates" className="bg-emerald-600 border border-emerald-500 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all hover:bg-emerald-500 flex items-center justify-center gap-2 shadow-lg group">
                            Request Rates
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="bg-stone-900/80 backdrop-blur-md border border-stone-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-all hover:bg-stone-800 flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Call Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-emerald-900 border-b border-emerald-800 py-12 relative z-20 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-around items-center gap-8">
                        <div className="text-center w-full">
                            <div className="text-4xl font-bold text-emerald-400 mb-2">
                                <Counter end={100} suffix="%" />
                            </div>
                            <div className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">Satisfaction</div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-emerald-800"></div>
                        <div className="text-center w-full">
                            <div className="text-4xl font-bold text-emerald-400 mb-2">
                                <Counter end={10} suffix="+" />
                            </div>
                            <div className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">Years Experience</div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-emerald-800"></div>
                        <div className="text-center w-full flex flex-col items-center">
                            <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2" />
                            <div className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">Fully Insured</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-24 bg-stone-50 text-stone-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-3">Our Expertise</h2>
                        <h3 className="text-4xl font-bold text-stone-900 mb-4 font-serif">Comprehensive Outdoor Care</h3>
                        <p className="text-stone-600 text-lg">
                            From routine maintenance to complete landscape transformations and specialized tree surgery, we have you covered.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-emerald-50/80 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                                <Leaf className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h4 className="text-xl font-bold text-stone-900 mb-3 font-serif">Garden Maintenance</h4>
                            <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                Keeping your garden pristine year-round. We tailor our schedule to your specific planting and lawn care needs.
                            </p>
                            <ul className="space-y-3">
                                {['Lawn care & mowing', 'Weeding & pruning', 'Spraying & treatments'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm font-medium text-stone-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-emerald-50/80 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                                <Scissors className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h4 className="text-xl font-bold text-stone-900 mb-3 font-serif">Tree & Hedge Work</h4>
                            <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                Professional arboriculture services. From reshaping overgrown hedges to safe and controlled tree removal.
                            </p>
                            <ul className="space-y-3">
                                {['Tree surgery & felling', 'Hedge trimming', 'Crown reduction'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm font-medium text-stone-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-emerald-50/80 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                                <Hammer className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h4 className="text-xl font-bold text-stone-900 mb-3 font-serif">Landscaping & Fencing</h4>
                            <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                Transform your outdoor living space with hard landscaping, robust fencing, and bespoke garden design.
                            </p>
                            <ul className="space-y-3">
                                {['Custom fencing solutions', 'Decking & patios', 'Complete transformations'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm font-medium text-stone-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="rates" className="py-24 bg-stone-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-emerald-400 font-bold tracking-widest text-xs uppercase mb-3">Get in Touch</h2>
                            <h3 className="text-4xl font-bold mb-6 font-serif">Rates Available on Request.</h3>
                            <p className="text-stone-400 mb-10 text-lg leading-relaxed">
                                Let us know what you're looking for, and we'll provide a transparent, competitive quote. Our team serves Brighton, Hove, and the wider Sussex area.
                            </p>

                            <div className="space-y-8 bg-stone-800/50 p-8 rounded-2xl border border-stone-700">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-stone-800 rounded-xl flex items-center justify-center border border-stone-600">
                                        <Phone className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Give us a call</p>
                                        <p className="font-bold text-xl mt-1">{PHONE_NUMBER}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-stone-800 rounded-xl flex items-center justify-center border border-stone-600">
                                        <MapPin className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Service Area</p>
                                        <p className="font-bold text-xl mt-1">Brighton, Hove & Sussex</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 bg-white text-stone-900 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
                            {/* Decorative element */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-50"></div>

                            <form onSubmit={handleFormSubmit} className="flex flex-col h-full relative z-10">
                                {/* Progress header */}
                                <div className="mb-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-400">
                                    <span>Step {formStep} of 3</span>
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(step => (
                                            <div key={step} className={`w-8 h-1.5 rounded-full transition-colors ${step <= formStep ? 'bg-emerald-500' : 'bg-stone-200'}`}></div>
                                        ))}
                                    </div>
                                </div>

                                {formStep === 1 && (
                                    <div className="space-y-5 animate-in fade-in duration-300">
                                        <h4 className="text-2xl font-bold text-stone-900 font-serif">What service do you need?</h4>
                                        <div className="space-y-3">
                                            {['Landscaping / Fencing', 'Tree Surgery', 'Garden Maintenance', 'Other'].map((opt) => (
                                                <label key={opt} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.service === opt ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold' : 'border-stone-200 hover:border-emerald-200 bg-white'}`}>
                                                    <input type="radio" name="service" className="hidden" value={opt} onChange={() => setFormData({ ...formData, service: opt })} />
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${formData.service === opt ? 'border-emerald-500' : 'border-stone-300'}`}>
                                                        {formData.service === opt && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
                                                    </div>
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {formStep === 2 && (
                                    <div className="space-y-5 animate-in fade-in duration-300">
                                        <h4 className="text-2xl font-bold text-stone-900 font-serif">Where are you located?</h4>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-5 py-4 text-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                                            placeholder="e.g. Hove, BN3..."
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                )}

                                {formStep === 3 && (
                                    <div className="space-y-5 animate-in fade-in duration-300">
                                        <h4 className="text-2xl font-bold text-stone-900 font-serif">How can we contact you?</h4>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-5 py-4 text-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                                            placeholder="Phone Number or Email"
                                            value={formData.contact}
                                            onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                        />
                                    </div>
                                )}

                                <div className="mt-10 pt-8 border-t border-stone-100 flex justify-between items-center">
                                    {formStep > 1 ? (
                                        <button
                                            type="button"
                                            onClick={() => setFormStep(s => s - 1)}
                                            className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider"
                                        >
                                            Back
                                        </button>
                                    ) : <div></div>}

                                    <button
                                        type="submit"
                                        disabled={(formStep === 1 && !formData.service) || (formStep === 2 && !formData.location)}
                                        className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {formStep < 3 ? 'Next Step' : 'Get Quote'}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <span className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-emerald-500" />
                            Jigsaw <span className="text-emerald-500">Garden & Tree Care</span>
                        </span>
                        <p className="text-stone-400 text-sm leading-relaxed max-w-sm font-medium">
                            Professional gardening, landscaping, and tree surgery services operating out of Brighton and Hove, serving the entire Sussex area.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Contact</h4>
                        <div className="space-y-4 text-sm font-medium">
                            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> Brighton and Hove, Sussex</p>
                            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-500" /> {PHONE_NUMBER}</p>
                            <a href={WHATSAPP_LINK} className="text-emerald-400 hover:text-emerald-300 transition-colors inline-block mt-2">Message us on WhatsApp</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Legal</h4>
                        <div className="space-y-4 text-sm font-medium flex flex-col items-start">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-wider uppercase">
                    <p>&copy; {new Date().getFullYear()} Jigsaw Garden and Tree Care. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
