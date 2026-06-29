'use client';

export default function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-pixel text-[14px] text-[#808080]">
        [{number}]
      </span>
      <h2 className="font-pixel text-[16px] md:text-[20px] text-[#FFFFFF] tracking-wider">
        {label}
      </h2>
      <div className="flex-1 h-[2px] bg-[#333]" />
    </div>
  );
}
