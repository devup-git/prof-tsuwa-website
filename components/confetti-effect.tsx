"use client"

import { useEffect, useRef } from "react"

export default function ConfettiEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const pieces: any[] = []
        const numberOfPieces = 150
        const colors = ["#facc15", "#eab308", "#ca8a04", "#a16207", "#ffffff", "#94a3b8"]

        class Piece {
            x: number
            y: number
            size: number
            color: string
            speed: number
            rotation: number
            rotationSpeed: number

            constructor(w: number) {
                this.x = Math.random() * w
                this.y = Math.random() * -1000
                this.size = Math.random() * 8 + 4
                this.color = colors[Math.floor(Math.random() * colors.length)]
                this.speed = Math.random() * 3 + 2
                this.rotation = Math.random() * 360
                this.rotationSpeed = Math.random() * 4 - 2
            }

            update(w: number, h: number) {
                this.y += this.speed
                this.rotation += this.rotationSpeed
                if (this.y > h) {
                    this.y = -20
                    this.x = Math.random() * w
                }
            }

            draw() {
                if (!ctx) return
                ctx.save()
                ctx.translate(this.x, this.y)
                ctx.rotate((this.rotation * Math.PI) / 180)
                ctx.fillStyle = this.color
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
                ctx.restore()
            }
        }

        for (let i = 0; i < numberOfPieces; i++) {
            pieces.push(new Piece(canvas.width))
        }

        let animationFrameId: number

        function animate() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            pieces.forEach((piece) => {
                piece.update(canvas.width, canvas.height)
                piece.draw()
            })
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[101]"
            style={{ width: "100%", height: "100%" }}
        />
    )
}
