"use client";

import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { resetStreak, updateProfile } from "@/server/actions";
import { useActionState, useState } from "react";
import { toast } from "sonner";

interface UserControlsProps {
  username: string;
}

export default function UserControls({ username }: UserControlsProps) {
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [resetDate, setResetDate] = useState<Date | undefined>(undefined);

  // Action state for reset form
  const [resetState, resetAction, isResetPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      formData.append("username", username);

      try {
        const result = await resetStreak(formData);
        if (result.success) {
          toast.success(result.data.message);
          setIsResetOpen(false);
          setResetDate(undefined); // Reset the date after successful submission
          return { success: true };
        } else {
          toast.error(result.error);
          return { success: false, error: result.error };
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
        return { success: false, error: "An unexpected error occurred" };
      }
    },
    null
  );

  // Action state for update form
  const [updateState, updateAction, isUpdatePending] = useActionState(
    async (prevState: any, formData: FormData) => {
      formData.append("username", username);

      try {
        const result = await updateProfile(formData);
        if (result.success) {
          toast.success(result.data.message);
          setIsUpdateOpen(false);
          return { success: true };
        } else {
          toast.error(result.error);
          return { success: false, error: result.error };
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
        return { success: false, error: "An unexpected error occurred" };
      }
    },
    null
  );

  return (
    <div className="fixed top-4 right-4 z-10 space-y-2">
      {/* Control Buttons */}
      <div className="flex flex-row gap-3 md:flex-col">
        <Popover open={isResetOpen} onOpenChange={setIsResetOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Reset Streak
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-80 backdrop-blur-sm bg-white/10 border-white/20"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-white text-lg font-semibold">
                  Reset Streak
                </h3>
                <p className="text-white/70 text-sm">
                  Enter your secret to reset your streak
                </p>
              </div>

              <form action={resetAction} className="space-y-4">
                <div className="space-y-2">
                  <DatePicker
                    name="resetDate"
                    value={resetDate}
                    onChange={setResetDate}
                    disabled={isResetPending}
                  />
                  <Label
                    htmlFor="reset-secret"
                    className="text-sm font-medium text-white"
                  >
                    Secret Phrase
                  </Label>
                  <Input
                    id="reset-secret"
                    name="secret"
                    type="password"
                    required
                    placeholder="Your secret phrase"
                    disabled={isResetPending}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isResetPending}
                  className="w-full"
                  variant="destructive"
                >
                  {isResetPending ? "Resetting..." : "Reset"}
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Update Profile
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-80 backdrop-blur-sm bg-white/10 border-white/20"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-white text-lg font-semibold">
                  Update Profile
                </h3>
                <p className="text-white/70 text-sm">
                  Change your display name
                </p>
              </div>

              <form action={updateAction} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="update-name"
                    className="text-sm font-medium text-white"
                  >
                    New Display Name
                  </Label>
                  <Input
                    id="update-name"
                    name="name"
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Your new display name"
                    disabled={isUpdatePending}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="update-secret"
                    className="text-sm font-medium text-white"
                  >
                    Secret Phrase
                  </Label>
                  <Input
                    id="update-secret"
                    name="secret"
                    type="password"
                    required
                    placeholder="Your secret phrase"
                    disabled={isUpdatePending}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isUpdatePending}
                  className=" bg-white text-[#085078] hover:bg-white/90 w-full"
                  variant="outline"
                >
                  {isUpdatePending ? "Updating..." : "Update"}
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
