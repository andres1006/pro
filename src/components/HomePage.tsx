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
      const headings = section.querySelectorAll("h2, h3");
      const paragraphs = section.querySelectorAll("p");
      const images = section.querySelectorAll("img, .image-container");
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
      });

      // Animar cards con stagger
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
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
    <div className="relative">
      {/* Barra de progreso de scroll */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 w-0"
        ref={scrollLineRef}
      ></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-cyan-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-bg absolute inset-0 bg-[url('/assets/img-1.png')] opacity-10 bg-repeat scale-150"></div>
        </div>

        <div className="container mx-auto px-4 z-10 py-24">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex flex-col justify-center items-center md:full text-center md:text-center mb-12 md:mb-0 ">
              <Image
                src="/assets/LOGO.png"
                alt="Logo"
                width={500}
                height={500}
                priority
                className="mb-6 brightness-0 invert"
              />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Practica <span className="text-cyan-400">Deporte</span> como un
                profesional
              </h1>
              <p className="text-md font-light mb-8 text-gray-300">
                Encuentra tu equipo, organiza partidos, reta a tus amigos y
                sigue tus estadísticas como un verdadero profesional.
              </p>
              <div className="flex flex-col sm:flex-col gap-4 justify-center md:justify-start">
                <Link
                  href="/login"
                  className="transition-all duration-300 rounded-lg p-2 text-xl font-normal px-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:text-2xl hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-700"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/signup"
                  className=" text-lg font-normal  text-white"
                >
                  Crear cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
