import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Filter } from "./types";
import AdvertCard from "./components/advert-card";
import AdvertsFilter from "./components/adverts-filter";
import AdvertsEmptyWarning from "./components/adverts-empty-warning";
import AdvertsNotFoundWarning from "./components/adverts-not-found-warning";
import Page from "@/components/layout/page";
import Dropdown from "@/components/shared/dropdown";
import Alert from "@/components/ui/alert";
import Loader from "@/components/ui/loader";
import NavBar from "@/components/ui/nav-bar";
import NavItem from "@/components/ui/nav-item";
import { useAppSelector } from "@/store";
import { useAdvertsLoadedAction, useUiResetErrorAction } from "@/store/hooks";
import { getAdverts, getUi } from "@/store/selectors";

function AdvertsPage() {
  const advertsLoadedAction = useAdvertsLoadedAction();
  const adverts = useAppSelector(getAdverts);
  const uiResetErrorAction = useUiResetErrorAction();
  const { pending, error } = useAppSelector(getUi);
  const [filter, setFilter] = useState<Filter>({});
  const didFetch = useRef(false);

  const filteredAdverts = adverts.filter((advert) => {
    const filterByName = filter.name
      ? advert.name.toLowerCase().includes(filter.name.toLowerCase())
      : true;
    const filterBySale =
      typeof filter.sale === "boolean" ? advert.sale === filter.sale : true;
    const filterByMinPrice =
      typeof filter.minPrice === "number"
        ? advert.price >= filter.minPrice
        : true;
    const filterByMaxPrice =
      typeof filter.maxPrice === "number"
        ? advert.price <= filter.maxPrice
        : true;
    const filterByTags = filter.tags?.length
      ? filter.tags.every((tag) => advert.tags.includes(tag))
      : true;

    return (
      filterByName &&
      filterBySale &&
      filterByMinPrice &&
      filterByMaxPrice &&
      filterByTags
    );
  });

  useEffect(() => {
    if (!didFetch.current) {
      advertsLoadedAction();
      didFetch.current = true;
    }
  }, []);

  return (
    <>
      <NavBar>
        <li>
          <Dropdown icon="filter_list" label="Filters">
            <AdvertsFilter onChange={setFilter} />
          </Dropdown>
        </li>
        <li>
          <NavItem to="/adverts/new" label="New Advert" icon="add" />
        </li>

        {import.meta.env.DEV && (
          <li>
            <NavItem
              to="http://localhost:3001/swagger/"
              label="API Documentation"
              icon="api"
              target="_blank"
            />
          </li>
        )}
      </NavBar>
      <Page title="Latest Adverts">
        {pending.adverts || pending.tags ? (
          <Loader />
        ) : adverts.length ? (
          <ul
            className={clsx({
              "mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3":
                filteredAdverts.length !== 0,
            })}
          >
            {filteredAdverts.length ? (
              filteredAdverts.map((advert) => (
                <li key={advert.id}>
                  <Link to={`/adverts/${advert.id}`}>
                    <AdvertCard advert={advert} />
                  </Link>
                </li>
              ))
            ) : (
              <AdvertsNotFoundWarning />
            )}
          </ul>
        ) : (
          <AdvertsEmptyWarning />
        )}
      </Page>
      <div className="fixed top-11.5 left-1/2 z-50 -translate-x-1/2">
        {error && (
          <Alert
            text={error.response?.data?.message || error.message}
            variant="error"
            onClick={() => uiResetErrorAction()}
          />
        )}
      </div>
    </>
  );
}

export default AdvertsPage;
