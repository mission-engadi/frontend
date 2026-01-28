'use client';

import ServiceHealth from "@/components/ServiceHealth";
import { ArrowRight, LayoutDashboard, Heart, Globe, Users, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

/**
 * Landing Page - Neo-Brutalist Design
 *
 * Characteristics applied:
 * - Bold, high-contrast colors
 * - Hard-edged shadows (no blur)
 * - Thick borders
 * - Sharp corners
 * - Strong typography
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header - Neo-Brutalist */}
      <header className="bg-white border-b-[3px] border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-[#0066FF] border-[2px] border-black p-2">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-black text-black tracking-tight">
                  MinistryOS
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-black hover:text-[#0066FF] font-bold text-sm transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-5 py-2 border-[3px] border-black text-sm font-bold bg-[#0066FF] text-white shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section - Neo-Brutalist */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 border-[2px] border-black bg-[#DFFF00] text-black text-sm font-bold mb-6 shadow-[3px_3px_0px_#000]">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Humanitarian Platform
          </div>
          <h1 className="text-5xl font-black text-black sm:text-6xl lg:text-7xl leading-tight tracking-tight">
            Transforming Ministries
            <br className="hidden sm:inline" />
            Through{" "}
            <span className="text-[#0066FF]">
              AI-Powered Ministry OS
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-black/70 leading-relaxed font-medium">
            A modular Ministry Operating System connecting worship, operations, finance, and outreach
            with AI-driven insights for churches of all sizes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center px-8 py-4 border-[3px] border-black text-base font-bold bg-[#0066FF] text-white shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              Explore Projects
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/partners"
              className="inline-flex items-center px-8 py-4 border-[3px] border-black text-base font-bold bg-white text-black shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              Partner With Us
            </Link>
          </div>

          {/* Stats Section - Neo-Brutalist */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="text-5xl font-black text-[#0066FF]">
                11
              </div>
              <div className="mt-2 text-sm font-bold text-black uppercase tracking-wide">Microservices</div>
            </div>
            <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="text-5xl font-black text-[#00CC66]">
                4
              </div>
              <div className="mt-2 text-sm font-bold text-black uppercase tracking-wide">Languages Supported</div>
            </div>
            <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="text-5xl font-black text-[#FF1493]">
                8
              </div>
              <div className="mt-2 text-sm font-bold text-black uppercase tracking-wide">AI Providers</div>
            </div>
          </div>
        </div>

        {/* System Status Section - Neo-Brutalist */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-black">Platform Status</h2>
              <p className="text-black/70 mt-1 font-medium">Real-time monitoring of all services</p>
            </div>
          </div>
          <ServiceHealth />
        </div>

        {/* Feature Grid - Neo-Brutalist */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-black text-center mb-12">
            Everything You Need in One Platform
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
              <div className="inline-flex items-center justify-center p-4 bg-[#0066FF] border-[2px] border-black">
                <LayoutDashboard className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-black">Mission Control</h3>
              <p className="mt-4 text-base text-black/70 leading-relaxed">
                Centralized dashboard for managing 11 microservices, from AI-powered content generation to partner relationships.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
              <div className="inline-flex items-center justify-center p-4 bg-[#00CC66] border-[2px] border-black">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-black">Impact Tracking</h3>
              <p className="mt-4 text-base text-black/70 leading-relaxed">
                Measure real-time impact of humanitarian projects with analytics, forecasting, and comprehensive reporting.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
              <div className="inline-flex items-center justify-center p-4 bg-[#FF1493] border-[2px] border-black">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-black">Global Reach</h3>
              <p className="mt-4 text-base text-black/70 leading-relaxed">
                Multi-language support with AI-driven translation reaching beneficiaries and partners in 4 languages.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
              <div className="inline-flex items-center justify-center p-4 bg-[#FF6B00] border-[2px] border-black">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-black">Partner Management</h3>
              <p className="mt-4 text-base text-black/70 leading-relaxed">
                Complete CRM for donors, partners, and volunteers with automated engagement and donor retention.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
              <div className="inline-flex items-center justify-center p-4 bg-[#DFFF00] border-[2px] border-black">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-black">AI Automation</h3>
              <p className="mt-4 text-base text-black/70 leading-relaxed">
                Leverage 8 AI providers for content generation, translation, image creation, and intelligent automation.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
              <div className="inline-flex items-center justify-center p-4 bg-[#0099FF] border-[2px] border-black">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-black">Analytics & Insights</h3>
              <p className="mt-4 text-base text-black/70 leading-relaxed">
                Advanced analytics with forecasting, trend analysis, and AI-powered insights for data-driven decisions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section - Neo-Brutalist */}
        <div className="bg-[#0066FF] border-[3px] border-black p-12 text-center shadow-[8px_8px_0px_#000]">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Join us in transforming lives through faith-driven humanitarian work powered by cutting-edge technology.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 border-[3px] border-white text-base font-bold bg-transparent text-white hover:bg-white hover:text-[#0066FF] transition-all"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center px-8 py-4 border-[3px] border-black text-base font-bold text-black bg-white shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - Neo-Brutalist */}
      <footer className="bg-black mt-20 border-t-[3px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-[#0066FF] border-[2px] border-white p-2">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-black text-white">MinistryOS</span>
              </div>
              <p className="text-white/70 max-w-md font-medium">
                Empowering ministries with modular, AI-powered tools to reduce costs,
                increase impact, and focus on mission.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wide">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors font-medium">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/projects" className="text-white/70 hover:text-white transition-colors font-medium">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/partners" className="text-white/70 hover:text-white transition-colors font-medium">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wide">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors font-medium">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors font-medium">
                    Support
                  </a>
                </li>
                <li>
                  <Link href="/login" className="text-white/70 hover:text-white transition-colors font-medium">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t-[2px] border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/50 text-sm font-medium">
              2026 MinistryOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
