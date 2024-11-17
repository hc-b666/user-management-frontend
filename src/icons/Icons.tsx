import EmailIcon from "./EmailIcon";
import EyeIcon from "./EyeIcon";
import UserIcon from "./UserIcon";

export function EmailIconElement() {
  return (
    <div className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-4">
      <EmailIcon />
    </div>
  );
}

export function EyeIconElement() {
  return (
    <div className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer">
      <EyeIcon />
    </div>
  );
}

export function UserIconElement() {
  return (
    <div className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-4">
      <UserIcon />
    </div>
  );
}
