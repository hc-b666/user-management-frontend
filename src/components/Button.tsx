interface ButtonProps {
  text: string;
}

export function Button({ text }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full text-white text-lg font-medium bg-blue-500 py-2 rounded-lg"
    >
      {text}
    </button>
  );
}
