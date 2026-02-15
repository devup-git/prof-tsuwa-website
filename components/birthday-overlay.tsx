"use client"

import { useState, useEffect } from "react"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ConfettiEffect from "./confetti-effect"

export default function BirthdayOverlay() {
    const [isVisible, setIsVisible] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        // Check if we are in the date range (Feb 15 - Feb 19, 2026)
        const today = new Date()
        const start = new Date("2026-02-15")
        const end = new Date("2026-02-20") // Show until the end of the 19th

        const isCorrectDate = today >= start && today < end
        const hasSeenToday = sessionStorage.getItem("birthday_overlay_seen_v3")

        if (isCorrectDate && !hasSeenToday) {
            setShouldRender(true)
            // Delay slightly for better impact
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        sessionStorage.setItem("birthday_overlay_seen_v3", "true")
        setTimeout(() => setShouldRender(false), 500)
    }

    if (!shouldRender) return null

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <ConfettiEffect />
            <div
                className={`relative max-w-2xl w-full bg-gradient-to-br from-[#1a1c2e] via-[#2a2d4a] to-[#1a1c2e] rounded-3xl overflow-hidden border border-yellow-500/30 shadow-[0_0_50px_rgba(234,179,8,0.2)] transition-all duration-500 transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4'}`}
            >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[80px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[80px]" />
                </div>

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="relative p-8 md:p-12 text-center">
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-semibold mb-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Sparkles size={14} />
                        <span>A Golden Jubilee Celebration</span>
                    </div>

                    <h2
                        className={`text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 leading-tight mb-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                        50 Years of Excellence
                    </h2>

                    <div
                        className={`space-y-4 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">
                            Happy Birthday, <br />
                            <span className="text-3xl md:text-4xl font-bold">John Tor Tsuwa, Ph.D</span>
                        </p>

                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mx-auto my-6" />

                        <p className="text-white/70 max-w-md mx-auto leading-relaxed italic">
                            "A journey of 50 years marked by academic leadership, peace-building, and profound impact on humanity."
                        </p>

                        <p className="text-yellow-500/60 text-sm font-medium pt-4">
                            February 19th, 2026
                        </p>
                    </div>

                    <div
                        className={`mt-10 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                        <Button
                            onClick={handleClose}
                            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white border-none px-8 py-6 rounded-xl text-lg font-bold shadow-lg shadow-yellow-900/20"
                        >
                            Enter Website
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
