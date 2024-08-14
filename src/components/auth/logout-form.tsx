import { LogoutButtons } from "./logout-buttons";

export const LogoutForm = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Are you sure?</h1>
        <p className="text-sm text-muted-foreground">If you logout, you will be sent to the home page.</p>
      </div>
      <LogoutButtons />
    </div>
  );
};
