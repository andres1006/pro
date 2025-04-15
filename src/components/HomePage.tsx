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
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 z-50 w-0"
        ref={scrollLineRef}
      ></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 via-indigo-900 to-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-bg absolute inset-0 bg-[url('/assets/stadium-lights.jpg')] opacity-10 bg-cover bg-center"></div>
        </div>

        <div className="container mx-auto px-4 z-10 py-24 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
            <Image
              src="/assets/LOGO.png"
              alt="Logo PRO"
              width={200}
              height={200}
              priority
              className="mb-8 md:w-1/2 md:h-1/2 mx-auto brightness-0 invert"
            />
            <h1 className="text-2xl md:text-2xl font-extrabold mb-6 leading-tight text-center animate-fade-in">
              <span className=" hover:animate-zoom">Conéctate.</span>{" "}
              <span className="text-teal-500 hover:animate-zoom">Compite.</span>{" "}
              <span className="text-cyan-500 hover:animate-zoom">Domina</span>
            </h1>
            <p className="text-md md:text-md font-light mb-10 text-white max-w-xl mx-auto animate-fade-in-up">
              Encuentra tu equipo ideal ⚽️, organiza partidos en minutos 🏀 y
              lleva registro de cada victoria 🏆. <br />
              <br />
              ¡Tu próxima aventura deportiva comienza aquí! 🚀
            </p>
            <div className="flex flex-col  gap-2 justify-center px-5 animate-fade-in-up">
              <Link
                href="/login"
                className="transition-all duration-300 rounded-lg py-3 px-8 text-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 hover:shadow-xl hover:from-cyan-600 hover:to-purple-700 transform hover:-translate-y-1 "
              >
                Iniciar Sesión ✨
              </Link>
              <Link
                href="/signup"
                className="transition-all duration-300 rounded-lg py-3 px-8 text-md font-medium text-white hover:text-white hover:bg-transparent hover:scale-105 transform hover:-translate-y-1 "
              >
                No tienes una cuenta?{" "}
                <span className="text-teal-500 hover:text-teal-400">
                  Regístrate 🎯
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
