"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  // Referencias
  const scrollLineRef = useRef(null);

  useEffect(() => {
    // Inicializar ScrollTrigger para todas las secciones
    const sections = document.querySelectorAll("section");

    // Línea de progreso de scroll
    gsap.to(scrollLineRef.current, {
      width: "100%",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Animación para cada sección
    sections.forEach((section) => {
      const headings = section.querySelectorAll("h2, h3:not(.card h3)");
      const paragraphs = section.querySelectorAll("p:not(.card p)");
      const images = section.querySelectorAll(
        "img:not(.card img), .image-container"
      );
      const cards = section.querySelectorAll(".card");

      // Animar título
      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: heading,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      // Animar párrafos
      paragraphs.forEach((paragraph, i) => {
        gsap.fromTo(
          paragraph,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2 + i * 0.1,
            scrollTrigger: {
              trigger: paragraph,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      // Animar imágenes
      images.forEach((image, i) => {
        if (!image.closest(".card")) {
          gsap.fromTo(
            image,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              delay: 0.3 + i * 0.2,
              scrollTrigger: {
                trigger: image,
                start: "top 85%",
                toggleActions: "play none none reset",
              },
            }
          );
        }
      });

      // Animar cards con stagger
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reset",
            },
          }
        );
      }
    });

    // Animación especial para estadísticas
    const statCounters = document.querySelectorAll(".stat-number");
    statCounters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-value") || "0", 10);
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        }
      );
    });

    // Efecto parallax en imágenes de fondo
    document.querySelectorAll(".parallax-bg").forEach((bg) => {
      gsap.to(bg, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: bg.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative bg-gray-900">
      {/* Barra de progreso de scroll */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 w-0"
        ref={scrollLineRef}
      ></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-bg absolute inset-0 bg-[url('/assets/stadium-lights.jpg')] opacity-10 bg-cover bg-center"></div>
        </div>

        <div className="container mx-auto px-4 z-10 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <Image
              src="/assets/LOGO.png"
              alt="Logo PRO"
              width={200}
              height={200}
              priority
              className="mb-8 mx-auto brightness-0 invert"
            />
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Conéctate. Compite. <span className="text-cyan-400">Domina.</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-10 text-gray-300 max-w-xl mx-auto">
              La plataforma definitiva para organizar partidos, unirte a equipos
              y llevar tus estadísticas deportivas al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="transition-all duration-300 rounded-lg py-3 px-8 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 hover:shadow-xl"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/signup"
                className="transition-all duration-300 rounded-lg py-3 px-8 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700/50"
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
