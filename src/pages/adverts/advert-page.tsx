import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import placeholder from "@/assets/placeholder.webp";
import Page from "@/components/layout/page";
import Modal from "@/components/shared/modal";
import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import { useAppSelector } from "@/store";
import {
  useAdvertsDeletedAction,
  useAdvertsDetailAction,
  useModal,
  useUiResetErrorAction,
} from "@/store/hooks";
import { getAdvertById, getUi } from "@/store/selectors";
import Loader from "@/components/ui/loader";

function AdvertPage() {
  const params = useParams();
  const advertsDetailAction = useAdvertsDetailAction();
  const advertsDeletedAction = useAdvertsDeletedAction();
  const advert = useAppSelector(getAdvertById(params.advertId));
  const didFetch = useRef(false);
  const { isModalOpen, showModal, closeModal } = useModal();
  const uiResetErrorAction = useUiResetErrorAction();
  const { pending, error } = useAppSelector(getUi);

  async function handleDelete() {
    await advertsDeletedAction(advert!.id);
    closeModal();
  }

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
      {pending.adverts && <Loader />}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:flex-1">
          <div className="mb-4 h-[370px] overflow-hidden rounded-lg bg-[#384152]">
            <img
              className="h-full w-full object-cover"
              src={advert?.photo ?? placeholder}
              alt="Product Image"
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              label="Delete this advert"
              variant="destructive"
              onClick={showModal}
            />
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
      {isModalOpen && (
        <Modal
          title="Delete advert?"
          text="Are you sure you want to delete this advert? This action can't be undone and you'll be redirected to main page."
          buttonLabel="Yes, confirm deletion"
          type="warning"
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDelete}
        />
      )}
      <div className="fixed top-11.5 left-1/2 z-50 -translate-x-1/2">
        {error && (
          <Alert
            text={error.response?.data?.message || error.message}
            variant="error"
            onClick={() => uiResetErrorAction()}
          />
        )}
      </div>
    </Page>
  );
}

export default AdvertPage;
