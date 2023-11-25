"use client";
import CenteredPage from "@/components/CenterContainer";
import NavBar from "@/components/navbar";
import Google from "@/assets/svgs/Google svg.svg";
import Microsoft from "@/assets/svgs/Microsoft svg.svg";
import Apple from "@/assets/svgs/Apple svg.svg";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { socials } from "@/utils/constants";
import { useEffect, useState } from "react";
import { signupSchema } from "@/utils/validation/auth.zod";
import Alert from "@/components/alert";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hook/auth.hook";
import { PageLoader } from "@/components/loader";

export default function Page() {
  const { user, error, isLoading: auth0Loading } = useUser();
  const { mutate, isLoading } = useLogin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPasswd, setShowPasswd] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("password");

  // useEffect(() => {
  //   if (!error && !auth0Loading && user) router.push("/signed/chat");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user, error, auth0Loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate
    const validated = await signupSchema.safeParseAsync({
      email,
      password,
    });

    if (!validated.success) {
      setShow(true);
      setMessage(validated.error.message);
      return;
    }

    // send to api
    setMessage("");
    try {
      mutate(validated.data);
    } catch (err: any) {
      setMessage(err?.response?.data?.detail ?? err.message);
      setShow(true);
    }
  };

  function revealPasswd() {
    setShowPasswd((prev) => !prev);
    setType((prev) => (prev === "password" ? "text" : "password"));
  }

  return (
    <main>
      <NavBar showLinks />
      {isLoading ? <PageLoader /> : null}

      <CenteredPage>
        <div className="md:w-[500px] w-[300px]">
          <div>
            <h2 className="dark:bg-clip-text dark:bg-bg-text dark:text-white text-wellgab-black-1 text-center font-semibold text-[2rem]">
              Login to your account
            </h2>
            <p className="dark:text-wellgab-white-2 text-wellgab-black-2 text-center text-sm font-normal">
              Join millions of others in getting symptom and <br /> diagnosis
              guidance with WellGab.
            </p>
          </div>

          <div className="mt-[32px]">
            {show ? (
              <Alert
                message={message}
                type="warning"
                header="Validation Error"
                show={show}
                setShow={setShow}
              />
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="pb-3 block dark:text-wellgab-white-1 text-wellgab-black-1 font-medium text-sm text-left"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="rounded-lg border-wellgab-black-2 border-[0.5px] bg-transparent block p-2 text-base text-wellgab-black-2 font-normal w-full dark:text-white focus:outline-[#078]"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="pb-3 block dark:text-wellgab-white-1 text-wellgab-black-1 font-medium text-sm text-left"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={type}
                    name="password"
                    id="password"
                    required
                    placeholder="Enter your Password"
                    className="rounded-lg border-wellgab-black-2 border-[0.5px] bg-transparent block p-2 text-base text-wellgab-black-2 font-normal w-full dark:text-white focus:outline-[#078]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="absolute right-[10px] top-[10px]">
                    {showPasswd ? (
                      <span onClick={revealPasswd} className=" cursor-pointer">
                        <FaEye />
                      </span>
                    ) : (
                      <span onClick={revealPasswd} className=" cursor-pointer">
                        <FaEyeSlash />
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center my-8">
                <div className="border-t border-gray-500 w-full"></div>
                <div className="mx-4 text-gray-500 uppercase">or</div>
                <div className="border-t border-gray-500 w-full"></div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 my-4">
                <a
                  href={`/api/auth/login?connection=${socials.google}&returnTo=/auth/social`}
                  className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-7 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:scale-105 transition focus:text-grey-100 flex gap-4"
                >
                  <Image priority src={Google} alt="Google sign in button" />
                  Continue with Google
                </a>
                <a
                  href={`/api/auth/login?connection=${socials.windows}&returnTo=/auth/social`}
                  className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-6 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:scale-105 transition focus:text-grey-100 flex gap-4"
                >
                  <Image
                    priority
                    src={Microsoft}
                    alt="Microsoft sign in button"
                  />
                  Continue with Microsoft
                </a>
                <a
                  href={`/api/auth/login?connection=${socials.apple}&returnTo=/auth/social`}
                  className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-6 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:scale-105 transition focus:text-grey-100 flex gap-4 items-center"
                >
                  <Image priority src={Apple} alt="Apple sign in button" />
                  Continue with Apple
                </a>
                <button
                  disabled={isLoading}
                  className="rounded-lg bg-wellgab-green py-2 px-6 dark:text-white text-wellgab-white-1 text-lg text-center font-normal w-full hover:scale-105 transition"
                >
                  Login
                </button>
              </div>
            </form>
            <div>
              <p className="dark:text-white text-wellgab-black-2 text-center text-sm font-normal">
                Want to create an account?{" "}
                <a
                  href="/auth/signup"
                  className="dark:text-wellgab-green text-wellgab-green hover:underline"
                >
                  create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </CenteredPage>
    </main>
  );
}
