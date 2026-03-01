"use client";

import { useState } from "react";
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function ScriptBox() {
    const [language, setLanguage] = useState<"EN" | "FR">("FR");
    const [copied, setCopied] = useState(false);

    const scripts = {
        FR: `Bonjour ! Je m'appelle [Ton Prénom], je suis étudiant en informatique à l'Université de Caen (Campus 2).

Je vous contacte car je réalise des sites vitrines pour dynamiser les entreprises locales de la région. J'ai pris la liberté de créer une maquette gratuite pour [Nom de l'Entreprise] afin de vous montrer ce qu'un site moderne et rapide pourrait apporter à votre activité.

Est-ce que je peux vous envoyer le lien ici pour avoir votre avis ? C'est totalement gratuit et sans engagement, juste pour vous montrer le rendu.

Bonne journée, [Ton Prénom]`,
        EN: `Hi there! My name is [Your Name], I'm a Computer Science student currently building modern websites for local independent businesses.

I was looking at your business, [Business Name], and noticed you don't have a mobile-friendly site yet. As part of my portfolio project, I’ve actually built a free custom demo for you to show you what a high-end site would look like for your brand.

Could I send you the link over to get your thoughts? No strings attached, I'd just love to see what you think!

Best regards, [Your Name]`
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(scripts[language]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 w-full mt-8">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Introductory Message</h3>
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
                    value={scripts[language]}
                    className="w-full h-56 p-3 pr-10 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 resize-none focus:outline-none"
                />
                <button
                    onClick={handleCopy}
                    className="absolute bottom-3 right-3 p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
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
