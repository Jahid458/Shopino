"use client";

import { Sparkles, Heart, Globe, Users } from "lucide-react";
import Image from "next/image";

const stats = [
  { icon: Users,     label: "Happy shoppers",  value: "50k+" },
  { icon: Globe,     label: "Countries served", value: "42"   },
  { icon: Heart,     label: "Average rating",   value: "4.9"  },
  { icon: Sparkles,  label: "New drops weekly", value: "100+" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">


      <section className="bg-linear-to-br from-sky-50 via-white to-sky-100 border-b border-sky-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-800"> We make shopping
            <span className="text-sky-500">feel alive.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Shopino is a shopping marketplace built for people who believe everyday
            objects should bring joy. We curate bold beautiful products from
            independent makers and trusted brands all in one playful place.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 mb-3">
                <s.icon className="h-6 w-6 text-sky-500" />
              </div>
              <p className="text-3xl font-extrabold text-sky-500">{s.value}</p>
              <p className="text-sm text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">

          <div className="rounded-3xl overflow-hidden aspect-4/3 bg-sky-100 flex items-center justify-center shadow-lg">
            <Image
              src="/shopping.jpg"
              width={400}
              height={320}
              alt="Our story"
              className="w-full h-full object-cover "
            />
            {/* Fallback shown when image is blank/broken */}
        
          </div>

    
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl text-center font-extrabold text-slate-800">
              Our story
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Founded in 2024 by a tiny team of designers and shopkeepers, Vivid
              grew out of a simple idea: the internet was filled with beige
              stores. We wanted color back. We wanted character back. We wanted
              the joy of finding something special back.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Today, we partner with hundreds of independent makers worldwide to
              bring you a catalog that never feels boring just bold, fresh, and
              a little bit magical.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}