import { useState, type ChangeEvent, type FormEvent } from "react";
import TagsSelector from "./components/tags-selector";
import SaleSelector from "./components/sale-selector";
import Page from "@/components/layout/page";
import ImageField from "@/components/shared/image-field";
import InputField from "@/components/shared/input-field";
import Alert from "@/components/ui/alert";
import Loader from "@/components/ui/loader";
import Button from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { useAdvertsCreatedAction, useUiResetErrorAction } from "@/store/hooks";
import { getUi } from "@/store/selectors";

function NewAdvertPage() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [sale, setSale] = useState<boolean>(true);
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const advertsCreatedAction = useAdvertsCreatedAction();
  const uiResetErrorAction = useUiResetErrorAction();
  const { pending, error } = useAppSelector(getUi);
  const charProgress = `${name.length} / ${import.meta.env.VITE_ADVERT_MAX_CHARS}`;

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    setPrice(Number(event.target.value));
  }

  function handleTagsChange(tags: string[]) {
    setTags(tags);
  }

  function handleSaleChange(value: boolean) {
    setSale(value);
  }

  function handlePhotoChange(file?: File) {
    setPhoto(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newAdvert = { name, price, tags, sale, photo };
    advertsCreatedAction(newAdvert);
  }

  return (
    <Page title="New Advert">
      {pending.adverts && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="justify-start md:flex md:gap-4 lg:gap-10">
          <div>
            <span className="flex justify-end text-xs" aria-hidden="true">
              {charProgress}
            </span>
            <InputField
              type="text"
              label="Name"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
              maxLength={import.meta.env.VITE_ADVERT_MAX_CHARS}
              help={`Max length ${import.meta.env.VITE_ADVERT_MAX_CHARS} characters.`}
              aria-describedby="name-help"
            />
            <InputField
              type="number"
              label="Price"
              id="price"
              name="price"
              onChange={handlePriceChange}
              required
              step={0.01}
              min={import.meta.env.VITE_ADVERT_MIN_PRICE}
              max={import.meta.env.VITE_ADVERT_MAX_PRICE}
              help={`Price range from ${import.meta.env.VITE_ADVERT_MIN_PRICE}$ to ${import.meta.env.VITE_ADVERT_MAX_PRICE}$.`}
              aria-describedby="price-help"
            />
            <TagsSelector
              onChange={handleTagsChange}
              help="Select at least one tag."
            />
            <SaleSelector value={sale} onChange={handleSaleChange} />
          </div>
          <div className="flex-1">
            <ImageField onChange={handlePhotoChange} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button label="Upload Advert" variant="primary" />
        </div>
      </form>
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

export default NewAdvertPage;
