export const Spinner = (props: { className?: string }) => {
  return (
    <div className={`lds-ring ${props.className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
