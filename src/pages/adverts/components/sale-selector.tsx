import RadioField from "@/components/shared/radio-field";

function SaleSelector({
  value,
  onChange,
}: {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}) {
  return (
    <div>
      <p className="mb-2 font-medium">Advert Type:</p>
      <div className="flex flex-wrap gap-2">
        <RadioField
          label="Want to Buy"
          name="type"
          value="buy"
          id="buy"
          checked={value === false}
          onChange={() => onChange(false)}
        />
        <RadioField
          label="Want to Sell"
          name="type"
          value="sell"
          id="sell"
          checked={value === true}
          onChange={() => onChange(true)}
        />
      </div>
    </div>
  );
}

export default SaleSelector;
