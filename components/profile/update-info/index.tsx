import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  otp: string;
  setOtp: (otp: string) => void;
  onVerify: () => void;
  updateType: "email" | "username" | null;
  // setIsOpen: (isOpen: boolean) => void;
}

export const UpdateInfo = ({
  isOpen,
  onClose,
  otp,
  setOtp,
  onVerify,
  updateType,
  // setIsOpen,
}: OTPVerificationModalProps) => {

  return (
    <>
      <ToastContainer />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Email</DialogTitle>
            <DialogDescription>
              We have send you an one time password on your email to update{" "}
              {updateType === "email" ? "Email" : "Username"}.
            </DialogDescription>
            <div className="mt-4">
              <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
              <Button onClick={onVerify} className="mt-2">
                Verify
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
