import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { signIn } from "next-auth/react";
interface LoginMenuProps {
  providers: any;
  csrfToken?: string;
}
export default function LoginMenuLayout({
  providers,
  csrfToken,
}: LoginMenuProps) {
  return (
    <div className="flex flex-col center content-center justify-center my-10">
      <div className="mt-auto flex flex-col items-center justify-center  gap-4">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        {Object.values(providers).map((provider: any, index) => (
          <ProviderButton
            key={index}
            providerName={provider.name}
            providerId={provider.id}
            providerImg={`/${provider.name.toLowerCase()}.svg`}
          />
        ))}
      </div>
    </div>
  );
}

interface ProviderButtonProps {
  providerName: string;
  providerId: string;
  providerImg?: string;
}
function ProviderButton({
  providerName,
  providerId,
  providerImg,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ProviderButtonProps) {
  return (
    <button
      {...props}
      onClick={() => signIn(providerId)}
      className="bg-white max-w-[230px] p-2 px-4 w-full rounded-2xl flex items-center active:scale-90 hover:brightness-110 flex-nowrap"
    >
      <span className="w-4 h-4 flex items-center justify-center ">
        <Image
          src={providerImg || ""}
          width={25}
          height={25}
          alt={providerName}
          className="min-w-[1.5rem] w-[1.5rem]"
        />
      </span>
      <span className="whitespace-nowrap text-sm ml-4">
        Continue with {providerName}
      </span>
    </button>
  );
}
