import { Navbar, Text, Link as NextUiLink, Dropdown } from "@nextui-org/react";
import { useI18N } from "context/i18n";
import Link from "next/link";
import { useRouter } from "next/router";
import LangDropdown from "./LangDropdown";
import SearchAutoComplete from "./SearchAutoComplete";

export const Header = () => {
  const linkItems = [
    { title: "About", href: "/about" },
    { title: "Home", href: "/" },
    { title: "Search", href: "/search" },
  ];

  const { pathname } = useRouter();

  const { trans } = useI18N();

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn={"xs"} />

        <Link href={"/"}>
          <NextUiLink color={"primary"}>
            <Text h1 css={{ fontSize: "$3xl", marginBottom: 0 }}>
              Next{" "}
              <Text as={"span"} size={"inherit"} weight={"light"}>
                XKCD
              </Text>
            </Text>
          </NextUiLink>
        </Link>
      </Navbar.Brand>

      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        {linkItems.map((item) => (
          <Link key={`header-link-item-${item.title}`} href={item.href}>
            <Navbar.Link block isActive={item.href === pathname}>
              {trans(item.title.toUpperCase())}
            </Navbar.Link>
          </Link>
        ))}

        <Navbar.Item>
          <LangDropdown />
        </Navbar.Item>

        <Navbar.Item
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}
        >
          <SearchAutoComplete />
        </Navbar.Item>
      </Navbar.Content>

      <Navbar.Collapse>
        {linkItems.map(({ href, title }) => (
          <Navbar.CollapseItem key={`collapse-navbar-${title}`}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href={href}
            >
              <a>{title}</a>
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
