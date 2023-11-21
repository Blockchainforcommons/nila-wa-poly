import { useEffect, ChangeEvent, forwardRef } from "react";
import S from "./searchbar.styled";

interface CustomProps {
  searchHandler?: (searchText: string) => void;
}
type Ref = HTMLInputElement;

let debounceTimer: undefined | NodeJS.Timeout;
function debounce(cb: () => void) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(cb, 500); // .5s is the debounce time.
}

const SearchBar = forwardRef<Ref, CustomProps>(({ searchHandler }, ref) => {
  // to clear search text on component unmount
  useEffect(
    () => () => {
      searchHandler && searchHandler("");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <S.SearchBarPaper>
      <S.IconGreen>search</S.IconGreen>
      <S.SearchBar
        placeholder="  Search..."
        ref={ref}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          debounce(function () {
            searchHandler && searchHandler((e.target as HTMLInputElement).value);
          })
        }
      />
    </S.SearchBarPaper>
  );
});
export default SearchBar;
