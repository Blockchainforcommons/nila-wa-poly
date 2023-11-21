import S from "./toggleButton.styled";

interface Props {
  selectedMode: string;
  setSelectedMode: (option: string) => void;
  options: string[];
}

const ToggleButton = ({ selectedMode, setSelectedMode, options }: Props) => {
  return (
    <S.ToggleButtonContainer>
      {options.map((option, i) => (
        <S.CustomToggleButton colorToggle={selectedMode === option ? true : false} key={i} onClick={() => setSelectedMode(option)}>
          {option}
        </S.CustomToggleButton>
      ))}
    </S.ToggleButtonContainer>
  );
};

export default ToggleButton;
