import type { Advert } from "../types";
import placeholder from "@/assets/placeholder.webp";

interface AdvertCardProps {
  advert: Advert;
}

function AdvertCard({ advert }: AdvertCardProps) {
  return (
    <div className="group border-primary/15 bg-background overflow-hidden rounded-lg border transition hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={advert.photo ? advert.photo : placeholder}
          alt="Product image"
          className="h-60 w-full object-cover transition-transform"
        />
        <div className="absolute top-3 right-3">
          {advert.sale ? (
            <span className="ads-type">WANT TO SELL</span>
          ) : (
            <span className="ads-type">WANT TO BUY</span>
          )}
        </div>
      </div>
      <div className="p-5">
        <span className="mb-2 flex text-lg font-bold text-gray-900 dark:text-gray-100">
          {advert.name}
        </span>
        <div className="mb-2 flex flex-wrap gap-2">
          {advert.tags.map((tag) => (
            <span className="text-primary text-sm" key={`${advert.id}-${tag}`}>
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="!m-0 text-lg font-semibold text-teal-600">
            ${advert.price.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AdvertCard;
