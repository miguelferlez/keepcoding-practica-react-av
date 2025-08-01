import NavBar from "../../components/shared/nav-bar";
import NavItem from "../../components/ui/nav-item";
import Dropdown from "../../components/shared/dropdown";
import AdvertsFilter from "./components/adverts-filter";
import Page from "../../components/layout/page";
import AdvertsEmptyWarning from "./components/adverts-empty-warning";
import AdvertsNotFoundWarning from "./components/adverts-not-found-warning";
import clsx from "clsx";
import AdvertCard from "./components/advert-card";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdverts, getUi } from "../../store/selectors";
import { useEffect } from "react";
import { advertsLoaded } from "../../store/actions";
import { useUiResetErrorAction } from "../../store/hooks";
import Alert from "../../components/ui/alert";

function AdvertsPage() {
  const dispatch = useAppDispatch();
  const adverts = useAppSelector(getAdverts);
  const uiResetErrorAction = useUiResetErrorAction();
  const { error } = useAppSelector(getUi);

  useEffect(() => {
    dispatch(advertsLoaded());
  }, [dispatch]);

  return (
    <>
      <NavBar>
        <li>
          <Dropdown icon="filter_list" label="Filters">
            <AdvertsFilter />
          </Dropdown>
        </li>
        <li>
          <NavItem to="/adverts/new" label="New Advert" icon="add" />
        </li>
        <li>
          <NavItem
            to="http://localhost:3001/swagger/"
            label="API Documentation"
            icon="api"
            target="_blank"
          />
        </li>
      </NavBar>
      <Page title="Latest Adverts">
        {adverts.length ? (
          <ul
            className={clsx({
              "mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3":
                adverts.length !== 0,
            })}
          >
            {adverts.length ? (
              adverts.map((advert) => (
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
