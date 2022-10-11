import { Text, Input } from "@nextui-org/react";
import { useI18N } from "context/i18n";
import useClickAway from "hooks/useClickAway";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Box } from "./Box";
import { SearchIcon } from "./SearchIcon";

export default function SearchAutoComplete() {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  const handleClose = (e) => {
    if (showSearchResults) {
      setShowSearchResults(false);
    }
  };

  useClickAway(searchRef, handleClose);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`/api/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((results) => {
        setSearchResults(results);
      });
  }, [searchQuery]);

  const handleChangeInputSearch = () => {
    setSearchQuery(searchRef.current.value);
  };

  const handleFocusSearch = () => {
    setShowSearchResults(true);
  };

  const { trans } = useI18N();

  return (
    <Box>
      <Input
        aria-label="Search"
        clearable
        contentLeft={
          <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
        }
        contentLeftStyling={false}
        css={{
          w: "100%",
          "@xsMax": {
            mw: "300px",
          },
          "& .nextui-input-content--left": {
            h: "100%",
            ml: "$4",
            dflex: "center",
          },
        }}
        placeholder={`${trans("SEARCH")}...`}
        ref={searchRef}
        onChange={handleChangeInputSearch}
        onFocus={handleFocusSearch}
      />
      <Box
        as={"ul"}
        css={{
          position: "absolute",
          mx: "$0",
          bg: "$white",
          shadow: "$md",
          w: "100%",
        }}
        hidden={!showSearchResults}
      >
        {searchResults.map((comic) => (
          <Box as={"li"} key={comic.id}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href={`/comic/${comic.id}`}
            >
              <Text
                css={{
                  display: "flex",
                  "&:hover": { bg: "$primaryLight" },
                  p: "$5",
                }}
                as={"a"}
              >
                {comic.title}
              </Text>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
