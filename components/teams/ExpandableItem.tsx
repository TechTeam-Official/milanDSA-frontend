"use client";

import { ChevronRight } from "lucide-react";
import { ImageData } from "@/components/ui/img-sphere";
// We don't need memberToImage anymore for the URL, but we can keep it if needed for other things.
// Better to construct the image object directly here to ensure we use the API's URL.

interface Member {
  code: string;
  name: string;
  position: string;
  teamKey: string;
  image: string; // <--- ADD THIS: Ensures we use the API's correct path
}

interface Props {
  item: string;
  category: "core" | "club" | "web";
  members: Member[];

  expandedItems: Set<string>;
  setExpandedItems: React.Dispatch<React.SetStateAction<Set<string>>>;

  setSelectedConvenor: (img: ImageData | null) => void;
  setSelectedSphereImage: (img: ImageData | null) => void;

  disableHover?: boolean;
  onHover?: (id: string, rect: DOMRect) => void;
  onLeave?: () => void;
}

export default function ExpandableItem({
  item,
  category,
  members = [],
  expandedItems,
  setExpandedItems,
  setSelectedConvenor,
  setSelectedSphereImage,
  disableHover,
  onHover,
  onLeave,
}: Props) {
  const itemId = `${category}-${item}`;
  const isExpanded = expandedItems.has(itemId);

  const toggle = () => {
    setExpandedItems((prev) =>
      prev.has(itemId) ? new Set() : new Set([itemId]),
    );
  };

  return (
    <div className="mb-2">
      <button
        onClick={toggle}
        className="flex items-center gap-2 w-full text-left hover:text-[#1F4D4A] transition-colors">
        <ChevronRight
          size={16}
          className="text-[#1F4D4A] transition-transform"
          style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
        />
        <span className="text-[#2A1E1A] font-medium">{item}</span>
      </button>

      {isExpanded && (
        <div className="pl-6 pt-2 space-y-2">
          {members.map((member) => {
            // 🔥 FIX: Construct ImageData using member.image from API
            // This ensures we get the long encoded path (e.g. /Teams/OPERATIONS%20...)
            // instead of the broken short path (e.g. /Teams/ORM/...)
            const img: ImageData = {
              id: member.code,
              src: member.image, // <--- TRUST THE API
              alt: member.name,
              title: member.name,
              description: member.position,
            };

            return (
              <div
                key={member.code}
                className="cursor-pointer text-[#2A1E1A]/80 hover:text-[#1F4D4A] py-1 px-2 rounded-r-md transition-all border-l-2 border-transparent hover:border-[#B89B5E] hover:bg-[#1F4D4A]/10"
                onMouseEnter={(e) =>
                  !disableHover &&
                  onHover?.(
                    member.code,
                    e.currentTarget.getBoundingClientRect(),
                  )
                }
                onMouseLeave={() => !disableHover && onLeave?.()}
                onClick={() => {
                  setSelectedConvenor(img);
                  setSelectedSphereImage(img);
                }}>
                <span className="mr-2">⤷</span>
                {member.name}{" "}
                <span className="text-xs text-[#1F4D4A]/60 block ml-6">
                  {member.position}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
