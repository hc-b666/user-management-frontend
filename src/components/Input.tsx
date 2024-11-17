interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  Icon: () => JSX.Element;
}

export function Input({ id, type, placeholder, Icon }: InputProps) {
  return (
    <div className="w-full relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg py-2 px-4"
        required
      />
      <Icon />
    </div>
  );
}

export function RememberMeInput() {
  return (
    <div className="w-full flex items-center gap-2">
      <input type="checkbox" className="cursor-pointer" />
      <p>Remember me</p>
    </div>
  );
}
