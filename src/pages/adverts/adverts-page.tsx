import Page from "../../components/layout/page";
import NavBar from "../../components/shared/nav-bar";
import NavItem from "../../components/ui/nav-item";
import Button from "../../components/ui/button";

function AdvertsPage() {
  return (
    <>
      <NavBar>
        <li>
          <Button
            variant="outline"
            label="Filters"
            icon="filter_list"
            className="nav-item"
          ></Button>
        </li>
        <li>
          <NavItem to="/adverts/new" label="New advert" icon="add" />
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
      <Page title="Newsfeed">
        <div></div>
      </Page>
    </>
  );
}

export default AdvertsPage;
