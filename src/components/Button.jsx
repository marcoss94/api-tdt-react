export const Button = ({ text, type, handleClick }) => {
  return (
    <button className={type} onClick={handleClick}>
      {text}
    </button>
  );
};
