"use client";

import { useState, useEffect } from "react";
import { DocumentDuplicateIcon, CheckIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

const parseSpintax = (text: string) => {
    const spintaxRegex = /\{([^}]+)\}/g;
    return text.replace(spintaxRegex, (match, contents) => {
        const choices = contents.split('|');
        return choices[Math.floor(Math.random() * choices.length)];
    });
};

const RAW_SCRIPTS = {
    FR: `{Bonjour !|Bonjour,|Salut !|Hello} {Je m'appelle|Je suis|Moi c'est} Julius, je suis {étudiant en informatique|étudiant en développement web} à {l'Université de Caen|Caen}.

{Je vous contacte car|Je vous écris car|Je me permets de vous contacter car} je réalise {des sites internet vitrines|des sites vitrines modernes|des sites web} pour {dynamiser les entreprises locales|aider les entreprises locales|mettre en avant les petites entreprises}. {J'ai pris la liberté de|J'ai décidé de|J'ai pris l'initiative de} créer une maquette gratuite pour vous {afin de vous montrer|pour vous montrer|pour vous illustrer} ce qu'un site {moderne et rapide|rapide et professionnel|moderne et performant} pourrait apporter à votre activité.

{Est-ce que je peux vous envoyer|Pourrais-je vous faire parvenir|Serait-il possible de vous envoyer} le lien ici pour avoir votre avis ? C'est {totalement gratuit|entièrement gratuit|100% gratuit} et {sans engagement|sans aucune obligation}, juste pour vous {montrer le rendu|donner une idée}.

{Bonne journée|Excellente journée|Bien à vous|Cordialement}, Julius`,

    EN: `{Hi there!|Hello!|Hi!|Hey!} My name is Julius, I'm a {first-year Computer Science student|Computer Science student|CS student} from France {currently building|making|creating} {modern websites|custom websites|professional sites} for {local independent businesses|local businesses|independent companies}.

{I was looking at your business|I came across your business|I was checking out your business} and {noticed you don't have|saw that you don't have|realized you're missing} a {mobile-friendly website|modern website|custom site} yet. As part of my portfolio {project|work}, I’ve actually {built|created|designed} a {free custom demo|free mockup|custom visual demo} for you to show you what a {high-end site|modern website|professional site} would look like for your {brand|business}.

{Could I send you the link over|Would you mind if I sent the link|Can I drop the link here} to get your thoughts? {No strings attached|Totally free|No commitment}, I'd just love to see what you think!

{Best regards|Best|Have a great day|Cheers}, Julius`
};

export default function ScriptBox() {
    const [language, setLanguage] = useState<"EN" | "FR">("FR");
    const [copied, setCopied] = useState(false);
    const [currentScript, setCurrentScript] = useState("");

    const generateVariant = (lang: "EN" | "FR") => {
        setCurrentScript(parseSpintax(RAW_SCRIPTS[lang]));
    };

    // Initialize on mount or language change
    useEffect(() => {
        generateVariant(language);
    }, [language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(currentScript);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
            // Automatically regenerate after copy so the next one is fresh
            generateVariant(language);
        }, 2000);
    };

    const handleRegenerate = () => {
        generateVariant(language);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 w-full mt-8">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Introductory Message</h3>
                    <button
                        onClick={handleRegenerate}
                        className="p-1 text-slate-400 hover:text-indigo-500 transition-colors rounded-md"
                        title="Generate distinct variation"
                    >
                        <ArrowPathIcon className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded-md font-medium uppercase tracking-wider">
                        Anti-Spam
                    </span>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-950 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => setLanguage("FR")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${language === "FR" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                        FR
                    </button>
                    <button
                        onClick={() => setLanguage("EN")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${language === "EN" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                        EN
                    </button>
                </div>
            </div>
            <div className="relative">
                <textarea
                    readOnly
                    value={currentScript}
                    className="w-full h-56 p-3 pr-10 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 resize-none focus:outline-none leading-relaxed"
                />
                <button
                    onClick={handleCopy}
                    className="absolute bottom-3 right-3 p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center shadow-sm"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <CheckIcon className="w-4 h-4 text-emerald-500" />
                    ) : (
                        <DocumentDuplicateIcon className="w-4 h-4" />
                    )}
                </button>
            </div>
        </div>
    );
}
