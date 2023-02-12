import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMyProfile } from "../utils/context/myProfileContext";

type MyProfileDataFormType = {
  name: string;
  email: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<MyProfileDataFormType>({
    shouldFocusError: true,
  });

  const router = useRouter();

  const myProfile = useMyProfile();

  const onSubmit = (data: MyProfileDataFormType, e) => {
    console.log(data);
    myProfile.enterInfo(data.name, data.email);
    router.push("chat");
  };

  const onError = (errors, e) => {
    console.log("ERROR");
    console.log(errors);
  };

  return (
    <div className="flex items-center mx-auto min-h-screen justify-center bg-purple-500">
      <main className="max-w-5xl flex flex-col items-center justify-center h-full">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-6xl text-white font-extrabold">
            Takin It To The Next Level
          </h1>
          <div className="text-white">
            A loving relationship is a trusting one. Are you ready to trust your
            potential match with your sensitive data?
          </div>
          <div className="text-white">
            Chat with anonymous strangers at the beginning. As you become more
            comfortable with your partner,{" "}
            <span className="font-bold text-black">
              "Take it to the next level"
            </span>{" "}
            by giving your partner more ways to destroy you!
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-2xl font-bold mt-10">Sign up</h1>
          <div className="flex flex-col gap-y-9 mt-5 w-full">
            <div className="w-full">
              <h3 className="font-bold text-white text-l">Name</h3>
              <input
                type="text"
                placeholder="Name..."
                className="p-3 rounded-md outline-none w-full"
                {...register("name", { required: true })}
                required
              />
            </div>
            <div className="w-full">
              <h3 className="font-bold text-white text-l">Email</h3>
              <input
                type="text"
                placeholder="Email..."
                className="p-3 rounded-md outline-none w-full"
                {...register("email", { required: true })}
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit, onError)}
              className="bg-white rounded-md px-4 py-2 text-xl cursor-pointer"
            >
              Go!
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
