import { useEffect, useRef, useState, type ChangeEvent } from "react";
import CheckboxField from "@/components/shared/checkbox-field";
import { useAppSelector } from "@/store";
import { useAdvertsTagsAction } from "@/store/hooks";
import { getAdvertsTags } from "@/store/selectors";

interface TagsSelectorProps {
  onChange: (tag: string[]) => void;
  help?: string;
}

function TagsSelector({ onChange, help }: TagsSelectorProps) {
  const advertsTagsAction = useAdvertsTagsAction();
  const tags = useAppSelector(getAdvertsTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const didFetch = useRef(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const updatedTags = event.target.checked
      ? [...selectedTags, event.target.value]
      : selectedTags.filter((tag) => tag !== event.target.value);

    setSelectedTags(updatedTags);
    onChange(updatedTags);
  }

  useEffect(() => {
    if (!didFetch.current) {
      advertsTagsAction();
      didFetch.current = true;
    }
  });

  return (
    <div>
      <p className="mb-2 font-medium">Tags:</p>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {tags.map((tag) => (
          <CheckboxField
            label={tag}
            name="tag"
            key={tag}
            value={tag}
            id={tag}
            checked={selectedTags.includes(tag)}
            onChange={handleChange}
            aria-describedby="tags-help"
          />
        ))}
      </div>
      {help && (
        <p className="mb-4 text-xs" aria-hidden="true" id="tags-help">
          {help}
        </p>
      )}
    </div>
  );
}

export default TagsSelector;
