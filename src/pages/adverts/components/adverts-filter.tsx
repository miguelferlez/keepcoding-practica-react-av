import { useRef, type ChangeEvent } from "react";
import type { Filter } from "../types";
import TagsSelector from "./tags-selector";
import SaleSelector from "./sale-selector";
import InputField from "@/components/shared/input-field";
import Button from "@/components/ui/button";

function AdvertsFilter({ onChange }: { onChange: (filter: Filter) => void }) {
  const filters = useRef<Filter>({});

  function handleChange() {
    onChange({ ...filters.current });
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    filters.current.name = event.target.value;
    handleChange();
  }

  function handleMinPriceChange(event: ChangeEvent<HTMLInputElement>) {
    filters.current.minPrice = Number(event.target.value);
    handleChange();
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    filters.current.maxPrice = Number(event.target.value);
    handleChange();
  }

  function handleTagsChange(tags: string[]) {
    filters.current.tags = tags;
    handleChange();
  }

  function handleSaleChange(value: boolean) {
    filters.current.sale = value;
    handleChange();
  }

  function handleReset() {
    filters.current = {};
    onChange({});
  }

  return (
    <form onReset={handleReset}>
      <InputField
        label="Name"
        type="search"
        id="name"
        name="name"
        maxLength={import.meta.env.VITE_ADVERT_MAX_CHARS}
        onChange={handleNameChange}
      />
      <InputField
        label="Minimum price"
        type="number"
        id="min-price"
        name="price"
        min={import.meta.env.VITE_ADVERT_MIN_PRICE}
        max={import.meta.env.VITE_ADVERT_MAX_PRICE}
        onChange={handleMinPriceChange}
      />
      <InputField
        label="Maximum price"
        type="number"
        id="max-price"
        name="price"
        min={import.meta.env.VITE_ADVERT_MIN_PRICE}
        max={import.meta.env.VITE_ADVERT_MAX_PRICE}
        onChange={handleMaxPriceChange}
      />
      <TagsSelector onChange={handleTagsChange} />
      <SaleSelector value={filters.current.sale} onChange={handleSaleChange} />
      <div className="flex justify-end">
        <Button
          label="Reset filters"
          variant="destructive"
          type="reset"
          icon="reset_settings"
        />
      </div>
    </form>
  );
}

export default AdvertsFilter;
