'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import Container from '../../components/Container';
import SectionTitle from '../../components/ui/SectionTittle';
import GameShowcase from './GameShowcase/GameShowcase';

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="py-16">
        <Container>
          <SectionTitle
            title="Game Archive"
            subtitle="A survival horror index and narrative analysis dataset."
            centered
          />
          <div className="mt-8 flex justify-start mb-12">
            <Link href="/playground" passHref>
              <Button className="border-[2px] border-[#222222] bg-white hover:bg-[#111111] text-xs font-mono">
                ← Return to Playground
              </Button>
            </Link>
          </div>
        </Container>
        <GameShowcase />
      </section>
      <Footer />
    </main>
  );
}
