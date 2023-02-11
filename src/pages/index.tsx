import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMyProfile } from "../utils/context/myProfileContext";

type MyProfileDataFormType = {
  name: string;
  email: string;
  phoneNumber: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<MyProfileDataFormType>();

  const router = useRouter();

  const myProfile = useMyProfile();

  const onSubmit = (data: MyProfileDataFormType, e) => {
    console.log(data);
    myProfile.enterInfo(data.name, data.email, data.phoneNumber);
    router.push("chat");
  };

  const onError = (errors, e) => {
    console.log("ERROR");
    console.log(errors);
  };

  return (
    <div className="flex items-center mx-auto min-h-screen justify-center bg-purple-500">
      <main className="w-full gap-4 flex flex-col items-center justify-center h-full">
        <form className="flex flex-col gap-y-9">
          <div>
            <h3 className="font-bold text-white text-xl">Name</h3>
            <input
              type="text"
              placeholder="Name..."
              className="p-3 rounded-md outline-none"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <h3 className="font-bold text-white text-xl">Email</h3>
            <input
              type="text"
              placeholder="Email..."
              className="p-3 rounded-md outline-none"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <h3 className="font-bold text-white text-xl">Phone Number</h3>
            <input
              type="text"
              placeholder="Phone Number..."
              className="p-3 rounded-md outline-none"
              {...register("phoneNumber", { required: true })}
            />
          </div>
          <button
            onClick={handleSubmit(onSubmit, onError)}
            className="bg-white rounded-md px-4 py-2 text-xl cursor-pointer"
          >
            Go!
          </button>
        </form>
      </main>
    </div>
  );
}
