import { GitHubIcon, LinkedinIcon, XIcon, HeartIcon, ShieldIcon, BoltIcon, CheckIcon, RobotIcon } from "@src/assets/icons";
import { Layout } from "@src/components/ui/Layout";
import { Link } from "react-router";
import { HOME, ALL_MODELS, ADD_MODEL, MY_MODELS, MY_PURCHASES } from "@src/constants/";

export const Footer: React.FC = () => {
    return (
        <Layout
            data={
                {
                    content: [
                        {
                            logo: <h4 className="bg-background flex items-center gap-2"><Link to="/" className="flex items-center gap-2"><RobotIcon className="w-6 h-6" /> AI Model Inventory</Link></h4>,
                            text: <p>Manage and discover AI models with ease. Your comprehensive platform for cataloging machine learning models, frameworks, and datasets.</p>,
                            socials: [
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>,
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"><XIcon /></a>,
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
                            ]
                        },
                        {
                            title: <h5>Quick Links</h5>,
                            items: [
                                <Link to={HOME}>Home</Link>,
                                <Link to={ALL_MODELS}>All Models</Link>,
                                <Link to={ADD_MODEL}>Add Model</Link>,
                                <Link to={MY_MODELS}>My Models</Link>,
                                <Link to={MY_PURCHASES}>My Purchases</Link>
                            ]
                        },
                        {
                            title: <h5>Resources</h5>,
                            items: [
                                <a href="/docs">Documentation</a>,
                                <a href="/api">API Reference</a>,
                                <a href="/tutorials">Tutorials</a>,
                                <a href="/blog">Blog</a>,
                                <a href="/support">Support</a>
                            ]
                        },
                        {
                            title: <h5>Legal</h5>,
                            items: [
                                <a href="/privacy">Privacy Policy</a>,
                                <a href="/terms">Terms of Service</a>,
                                <a href="/cookies">Cookie Policy</a>,
                                <a href="/licenses">Licenses</a>
                            ]
                        }
                    ],
                    bottom: {
                        copyright: <p>© 2025 AI Model Inventory Manager. All rights reserved. Built with <HeartIcon className="inline w-4 h-4 text-red-500" /> for the AI community</p>,
                        badges: [
                            <span><ShieldIcon className="w-4 h-4" /> SSL Secured</span>,
                            <span><CheckIcon className="w-4 h-4" /> GDPR Compliant</span>,
                            <span><BoltIcon className="w-4 h-4" /> Fast & Reliable</span>
                        ]
                    }
                }
            }
            style={{
                container: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 border-t border-slate-700',
                item: 'space-y-4',

                content: {
                    container: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-x-10 md:gap-x-8 lg:justify-items-center max-w-7xl mx-auto text-center sm:text-left px-6 sm:px-8 py-12 sm:pl-12',

                    item: {
                        logo: 'text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 inline-block',
                        text: 'text-sm text-gray-400 leading-relaxed max-w-xs mx-auto sm:mx-0',
                        socials: {
                            container: 'flex gap-4 mt-6 justify-center sm:justify-start',
                            item: 'w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-6'
                        },

                        title: 'mb-2 relative inline-block sm:block border-b-2 border-cyan-500/50 pb-1',
                        items: {
                            container: 'space-y-1 flex flex-col',
                            item: 'text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block relative overflow-hidden'
                        }
                    }
                },

                bottom: {
                    container: 'border-t border-slate-700 py-8',
                    copyright: 'text-center text-sm text-gray-500 px-6',
                    badges: {
                        container: 'flex flex-wrap justify-center gap-6 mt-4',
                        item: 'flex items-center gap-1 text-xs text-gray-500 bg-slate-800 px-4 py-2 rounded-full border border-slate-700'
                    }
                }
            }}
        />
    );
};

