import { Dropdown } from "@nextui-org/react";
import { useI18N } from "context/i18n";
import { useRouter } from "next/router";

export default function LangDropdown() {
  const { locale, locales, ...router } = useRouter();
  const { trans } = useI18N();

  const handleChangeLang = (localesSet) => {
    // localesSet es un objecto Set de js
    const [newLocale] = [...localesSet];
    const homePath = "/";
    // se pasa el locale como tercer parámetro para redireccionarlo
    router.push(homePath, homePath, { locale: newLocale });

    // para hacer el mismo proceso con el componenente Link se debe pasar el local como prop, asi:
    // <Link to={pathname} locale={newLocale}>Soy un link</Link>
  };

  return (
    <Dropdown>
      <Dropdown.Button light>{locale}</Dropdown.Button>
      <Dropdown.Menu
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[locale]}
        onSelectionChange={handleChangeLang}
      >
        <Dropdown.Section title={trans("LANGUAGE")}>
          {locales.map((locale) => (
            <Dropdown.Item key={locale}>{locale}</Dropdown.Item>
          ))}
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
}
