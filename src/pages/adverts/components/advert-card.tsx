import type { Advert } from "../types";

interface AdvertCardProps {
  advert: Advert;
}

function AdvertCard({ advert }: AdvertCardProps) {
  return (
    <div className="group border-primary/15 overflow-hidden rounded-lg border bg-white transition hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={advert.photo ? advert.photo : ""}
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
        <span className="mb-2 flex text-lg font-bold text-gray-900">
          {advert.name}
        </span>
        <div className="mb-2 flex flex-wrap gap-1">
          {advert.tags.map((tag) => (
            <span className="text-primary text-sm" key={`${advert.id}-${tag}`}>
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <h3 className="!m-0 text-lg font-semibold text-teal-600">
            ${advert.price.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AdvertCard;
