'use client';

import { useState, useEffect } from 'react';
import { Copy, Trash2, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Converter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const stripMarkdown = (markdown: string) => {
            if (!markdown) return '';
            return markdown
                // Headers
                .replace(/^#+\s+/gm, '')
                // Bold/Italic
                .replace(/(\*\*|__)(.*?)\1/g, '$2')
                .replace(/(\*|_)(.*?)\1/g, '$2')
                // Strikethrough
                .replace(/~~(.*?)~~/g, '$1')
                // Links
                .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
                // Images (keep alt)
                .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
                // Blockquotes
                .replace(/^>\s+/gm, '')
                // Code blocks (fenced) - keeping content, removing fences
                .replace(/```[\s\S]*?```/g, (match) => {
                    return match.replace(/```.*\n?/g, '');
                })
                // Inline code
                .replace(/`([^`]+)`/g, '$1')
                // Horizontal rules
                .replace(/^-{3,}|^\*{3,}|^_{3,}/gm, '')
                // List items (unordered)
                .replace(/^[\*\-\+]\s+/gm, '')
                // List items (ordered)
                .replace(/^\d+\.\s+/gm, '');
        };

        setOutput(stripMarkdown(input));
    }, [input]);

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleClear = () => {
        setInput('');
    };

    return (
        <div className="flex flex-col h-screen md:flex-row">
            {/* Left Panel: Input (Dark) */}
            <div className="relative flex flex-col w-full h-1/2 md:h-full md:w-1/2 bg-[#0d1117] text-gray-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                    <span className="text-sm font-mono text-gray-500">MARKDOWN</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setInput('# Hello World\n\nThis is **bold** and *italic* text.\n\n- List item 1\n- List item 2\n\n[Link](https://example.com)')}
                            className="px-3 py-1 text-xs font-medium text-gray-500 transition-colors border border-gray-700 rounded hover:text-gray-300 hover:border-gray-500"
                        >
                            Example
                        </button>
                        <button
                            onClick={handleClear}
                            className="p-2 text-gray-500 transition-colors hover:text-red-400"
                            title="Clear"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type or paste Markdown here..."
                    className="flex-1 w-full p-6 font-mono text-sm bg-transparent border-none resize-none focus:ring-0 focus:outline-none placeholder-gray-700"
                    spellCheck={false}
                />
            </div>

            {/* Right Panel: Output (Light) */}
            <div className="relative flex flex-col w-full h-1/2 md:h-full md:w-1/2 bg-[#ffffff] text-gray-900">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <span className="text-sm font-sans font-semibold text-gray-400">PLAIN TEXT</span>
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all rounded-full ${isCopied
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {isCopied ? (
                            <>
                                <span className="animate-pulse">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
                <div className="flex-1 w-full p-6 overflow-auto font-sans text-base leading-relaxed whitespace-pre-wrap">
                    {output ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {output}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-300 pointer-events-none select-none">
                            <FileText size={48} className="mb-4 opacity-20" />
                            <p>Conversion result will appear here</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Divider / Action Button (Optional) */}
            <div className="absolute hidden md:flex left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                    <ArrowRight size={20} className="text-gray-400" />
                </div>
            </div>
        </div>
    );
}
