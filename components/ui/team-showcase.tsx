"use client";

import { useState } from 'react';
import { FaLinkedinIn, FaGithub, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Chadrack',
    role: 'director of photography',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    social: { github: '#', linkedin: '#', behance: '#' },
  },
  {
    id: '2',
    name: 'Mak VieSAinte',
    role: 'FOUNDER',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    social: { github: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Osiris Balonga',
    role: 'LEAD FRONT-END',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    social: { github: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'Jacques',
    role: 'PRODUCT OWNER',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    social: { linkedin: '#' },
  },
  {
    id: '5',
    name: 'Riche Makso',
    role: 'CTO - PRODUCT DESIGNER',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    social: { github: '#', linkedin: '#' },
  },
  {
    id: '6',
    name: 'Jemima',
    role: 'MAKE-UP ARTISTE',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    social: { instagram: '#' } as TeamMember['social'],
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mobile 2-column split (even / odd)
  const mobCol1 = members.filter((_, i) => i % 2 === 0);
  const mobCol2 = members.filter((_, i) => i % 2 === 1);

  // Desktop 3-column split
  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 lg:gap-12 select-none w-full max-w-5xl mx-auto py-4 px-3 md:px-5 font-sans">
      {/* ── Left: photo grid (Mobile: 2 columns) ── */}
      <div className="flex md:hidden gap-3 justify-center items-start flex-shrink-0 max-w-full pb-1">
        {/* Mobile Column 1 */}
        <div className="flex flex-col gap-2.5">
          {mobCol1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Mobile Column 2 */}
        <div className="flex flex-col gap-2.5 mt-5">
          {mobCol2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[115px] h-[125px] sm:w-[135px] sm:h-[145px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Left: photo grid (Desktop: 3 columns) ── */}
      <div className="hidden md:flex gap-3 flex-shrink-0 pb-0">
        {/* Desktop Column 1 */}
        <div className="flex flex-col gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[140px] h-[150px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Desktop Column 2 */}
        <div className="flex flex-col gap-3 mt-[52px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[150px] h-[160px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Desktop Column 3 */}
        <div className="flex flex-col gap-3 mt-[26px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[145px] h-[155px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list ── */}
      <div className="flex flex-col gap-2.5 pt-1 flex-1 w-full max-w-md">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-400',
        className,
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.github ?? member.social?.linkedin ?? member.social?.instagram ?? member.social?.behance;

  return (
    <div
      className={cn(
        'dept-member-item cursor-pointer transition-opacity duration-300 flex items-start gap-2.5',
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <span
        className={cn(
          'w-3 h-2.5 mt-1 rounded-[4px] flex-shrink-0 transition-all duration-300',
          isActive ? 'bg-primary-light w-4' : 'bg-foreground/25',
        )}
      />
      <div className="flex flex-col min-w-0">
        {/* Name + Social icons */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-sm sm:text-base font-semibold md:font-bold leading-tight tracking-tight transition-colors duration-300 truncate',
              isActive ? 'text-foreground' : 'text-foreground/90',
            )}
          >
            {member.name}
          </span>

          {/* Social icons */}
          {hasSocial && (
            <div
              className={cn(
                'flex items-center gap-1 ml-0.5 transition-all duration-200',
                isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 pointer-events-none',
              )}
            >
              {member.social?.github && (
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150"
                  title="GitHub"
                >
                  <FaGithub size={13} />
                </a>
              )}
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded text-muted-foreground hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-150"
                  title="LinkedIn"
                >
                  <FaLinkedinIn size={13} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Designation directly below name */}
        <p className="mt-0.5 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground truncate">
          {member.role}
        </p>
      </div>
    </div>
  );
}
