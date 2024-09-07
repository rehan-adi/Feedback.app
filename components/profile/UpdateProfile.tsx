import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { updateProfileValidation } from "@/validation/profile.validation";


type UpdateProfileFormData = z.infer<typeof updateProfileValidation>;

const UpdateProfile = () => {
  const methods = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileValidation),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    try {
      const response = await axios.post('/api/update-profile', data);
      console.log(response.data);
      toast.success(response.data.message, { duration: 2000 });
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        "An error occurred while updating the profile.";
      toast.error(message, { duration: 2000 });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
          control={methods.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  className="bg-black border-white text-white"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-5 space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Handle cancel
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateProfile;
