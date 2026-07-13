"use client";

import { useState } from 'react';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import SectionTitle from '../../components/ui/SectionTittle';
import Button from '../../components/ui/Button';

import animeData from '@/public/Data/animelist.json';

interface IncomingAnimeItem {
  series_title: string;
  series_type: string;
  series_episodes: string;
}

interface AnimeItem {
  id: string;
  title: string;
  studio: string;
  tags: string[];
  rating: string;
  year: string;
}

// Extract raw data from Next.js module bundle layer safely
const rawData = (animeData as { default?: unknown } | unknown)
  ? ((animeData as { default?: unknown }).default ?? animeData)
  : animeData;
const rawArray: IncomingAnimeItem[] = rawData && typeof rawData === 'object' && 'anime' in rawData
  ? ((rawData as { anime: IncomingAnimeItem[] }).anime)
  : Array.isArray(rawData)
  ? (rawData as IncomingAnimeItem[])
  : [];

// Map to your UI schema structure
const allAnimeData: AnimeItem[] = rawArray.map((item, index) => ({
  id: `anime-${index}`,
  title: item.series_title,
  studio: item.series_type,
  tags: [`${item.series_episodes} EPS`],
  rating: 'N/A',
  year: 'Completed'
}));

export default function AnimePage() {
  // --- Pagination Config ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust number of items per page here (e.g., 12, 16, 24)

  const totalItems = allAnimeData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate slice parameters for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allAnimeData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page handler
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll back up to the grid when switching pages
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark">
      <Navbar />

      <section className="py-16">
        <Container>
          <SectionTitle
            title="Anime Vault"
            subtitle="My personal collection of masterclass cinema, boundary-pushing animation, and absolute favorites."
            centered
          />

          <div className="mt-6 flex justify-center mb-14">
            <Link href="/playground">
              <Button>← Back to Playground</Button>
            </Link>
          </div>

          {/* Dynamic Grid Layout showing only the current page items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((anime) => (
              <div
                key={anime.id}
                className="relative aspect-[16/9] bg-surface dark:bg-surface-dark border-border dark:border-border-dark rounded-md overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:border-accent dark:hover:border-accent-dark"
              >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#E50914] font-bold mb-1">
                    {anime.studio}
                  </span>

                  <h4 className="text-base font-bold text-white mb-1 line-clamp-1">
                    {anime.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-[#B0B0B0] mb-2">
                    <span className="text-green-500 font-semibold"> {/* Assuming green-500 is a status color that remains consistent */}
                      {anime.rating}
                    </span>
                    <span>{anime.year}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {anime.tags?.map((tag) => (
                      <span
                        key={tag} 
                        className="text-[10px] bg-border dark:bg-border-dark text-text-secondary dark:text-text-secondary-dark px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {totalItems === 0 && (
            <div className="text-center text-gray-400 mt-10">
              No anime data found.
            </div>
          )}

          {/* --- Pagination UI Controls --- */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2 font-mono">
              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark text-xs font-medium transition hover:bg-accent dark:hover:bg-accent-dark disabled:opacity-40 disabled:hover:bg-surface dark:disabled:hover:bg-surface-dark disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {/* Page Numbers Block */}
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNum = idx + 1;
                // Optional optimization: Only render surrounding pages if your collection list gets exceptionally large
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded text-xs transition font-bold ${
                      currentPage === pageNum
                        ? 'bg-brand-primary text-text-primary dark:text-text-primary-dark border-brand-primary'
                        : 'border-border dark:border-border-dark bg-transparent text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface dark:hover:bg-surface-dark'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark text-xs font-medium transition hover:bg-accent dark:hover:bg-accent-dark disabled:opacity-40 disabled:hover:bg-surface dark:disabled:hover:bg-surface-dark disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  );
}