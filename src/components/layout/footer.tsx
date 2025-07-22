import GitHubIcon from "../icons/github-icon";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="wrapper mt-8">
      <div className="divide-t flex items-center justify-between gap-4 py-4">
        <span>{`© ${year} KeepCoding. All Rights Reserved.`}</span>
        <a
          href="https://github.com/miguelferlez/keepcoding-practica-react-av"
          target="_blank"
        >
          <GitHubIcon className="fill-primary transition-opacity hover:opacity-75" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
