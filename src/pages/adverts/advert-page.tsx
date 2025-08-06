import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import placeholder from "@/assets/placeholder.webp";
import Page from "@/components/layout/page";
import Button from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { useAdvertsDetailAction } from "@/store/hooks";
import { getAdvertById } from "@/store/selectors";

function AdvertPage() {
  const params = useParams();
  const advertsDetailAction = useAdvertsDetailAction();
  const advert = useAppSelector(getAdvertById(params.advertId));
  const didFetch = useRef(false);

  useEffect(() => {
    if (!params.advertId) {
      return;
    }

    if (!didFetch.current) {
      advertsDetailAction(params.advertId);
      didFetch.current = true;
    }
  }, [params.advertId]);

  return (
    <Page title="Advert Details">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:flex-1">
          <div className="relative mb-4 h-[370px] overflow-hidden rounded-lg bg-[#384152]">
            {/* <img
              className="absolute inset-0 h-full w-full scale-120 object-cover opacity-100 blur-lg"
              src={advert?.photo ?? placeholder}
              alt="Product Image"
            /> */}
            <img
              className="relative h-full w-full object-cover"
              src={advert?.photo ?? placeholder}
              alt="Product Image"
            />
          </div>
          <div className="flex flex-col">
            <Button label="Delete this advert" variant="destructive" />
          </div>
        </div>
        <div className="rounded-lg border border-neutral-500/15 p-4 md:flex-1">
          <h3>{advert?.name}</h3>
          <div className="divide-b mb-2 flex gap-2 pb-2">
            <span className="font-bold">Price:</span>
            <span className="font-bold text-teal-600">
              ${advert?.price.toFixed(2)}
            </span>
          </div>
          <div className="divide-b mb-2 flex gap-2 pb-2">
            <span className="font-bold">Wants to:</span>
            <span className="">{advert?.sale ? "Sell" : "Buy"}</span>
          </div>
          <div className="divide-b mb-2 flex flex-wrap gap-x-2 gap-y-0.5 pb-2">
            <span className="font-bold">Tags:</span>
            {advert?.tags.map((tag) => (
              <span key={`${advert.id}-${tag}`}>#{tag}</span>
            ))}
          </div>
          <div>
            {advert?.createdAt && (
              <time dateTime={advert?.createdAt}>
                <p className="text-primary/50">
                  This advert was uploaded{" "}
                  {formatDistanceToNow(new Date(advert!.createdAt))} ago.
                </p>
              </time>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

export default AdvertPage;
