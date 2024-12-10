import Custom404 from "@/app/not-found";

export const EmailSent = ({
  params,
}: {
  params: { email: string; ttl: string };
}) => {
  if (new Date().getTime() > parseInt(params.ttl)) return <Custom404 />;
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
          Check your inbox
        </h2>
        <p className="mb-2 text-lg text-zinc-500">
          We are glad, that you’re with us ? We’ve sent you a verification link
          to the email address{" "}
          <span className="font-medium text-indigo-500">{params.email}</span>.
        </p>
      </div>
    </div>
  );
};
