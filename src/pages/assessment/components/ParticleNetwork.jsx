import { useEffect, useRef } from "react";

export default function ParticleNetwork() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let particles = [];
        const count = 60;
        const linkDistance = 120;
        let mouse = { x: -999, y: -999, lastX: -999, lastY: -999 };
        let sparks = [];
        const mouseDistance = 220;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e) => {
            mouse.lastX = mouse.x;
            mouse.lastY = mouse.y;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                const mx = p.x - mouse.x;
                const my = p.y - mouse.y;
                const mouseDist = Math.sqrt(mx * mx + my * my);

                if (mouseDist < 160 && mouseDist > 0) {
                    const force = ((160 - mouseDist) / 160) * 0.8;
                    p.x += (mx / mouseDist) * force;
                    p.y += (my / mouseDist) * force;
                }
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < linkDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / linkDistance) * 0.12
                            })`;
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach((p) => {
                const mx = p.x - mouse.x;
                const my = p.y - mouse.y;
                const mouseDist = Math.sqrt(mx * mx + my * my);

                if (mouseDist < mouseDistance) {
                    if (mouseDist < 45 && Math.random() > 0.75) {
                        sparks.push({
                            x: p.x,
                            y: p.y,
                            life: 1,
                            dx: (Math.random() - 0.5) * 1.2,
                            dy: (Math.random() - 0.5) * 1.2,
                        });
                    }
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255,115,0,${(1 - mouseDist / mouseDistance) * 0.35
                        })`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            });

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.04)";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.6)";
                ctx.fill();
            });
            sparks = sparks.filter((spark) => spark.life > 0);

            sparks.forEach((spark) => {
                spark.x += spark.dx;
                spark.y += spark.dy;
                spark.life -= 0.025;

                ctx.beginPath();
                ctx.arc(spark.x, spark.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,115,0,${spark.life * 0.18})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(spark.x, spark.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,210,120,${spark.life * 0.65})`;
                ctx.fill();
            });

            requestAnimationFrame(draw);
        }

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[1] pointer-events-none opacity-70"
        />
    );
}