"use client";
import CenteredPage from "@/components/CenterContainer";
import NavBar from "@/components/navbar";
import Google from "@/assets/svgs/Google svg.svg";
import Microsoft from "@/assets/svgs/Microsoft svg.svg";
import Apple from "@/assets/svgs/Apple svg.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { socials } from "@/utils/constants";
import { useState } from "react";
import { signupSchema } from "@/utils/validation/auth.zod";
import Alert from "@/components/alert";
import $http from "@/http/fetcher";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Page() {
  const { user, error, isLoading : authoLoading} = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPasswd, setShowPasswd] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("password");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // validate
    const validated = await signupSchema.safeParseAsync({
      email,
      password,
    });

    if (!validated.success) {
      setShow(true);
      setMessage(validated.error.message);
      setLoading(false);
      return;
    }

    // send to api
    setMessage("");
    try {
      const data = await $http.post("/api/v1/auth/sign-up", validated.data);
      localStorage.setItem("token", JSON.stringify(data.data.data));
      setLoading(false);
      toast.success(data.data.message);
      router.push("/signed/chat");
    } catch (err: any) {
      setMessage(err?.response?.data?.detail ?? err.message);
      setShow(true);
      setLoading(false);
    }
  };

  function revealPasswd() {
    setShowPasswd((prev) => !prev);
    setType((prev) => (prev === "password" ? "text" : "password"));
  }

  return (
    <main>
      <NavBar />
      <CenteredPage>
        <div className="md:w-[500px] w-[300px]">
          <div>
            <h2 className="dark:bg-clip-text dark:bg-bg-text dark:text-white text-wellgab-black-1 text-center font-semibold text-[2rem]">
              Create your account
            </h2>
            <p className="dark:text-white text-wellgab-black-2 text-center text-sm font-normal">
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
                  required
                  className="rounded-lg border-wellgab-black-2 border-[0.5px] bg-transparent block p-2 text-base text-wellgab-black-2 font-normal w-full"
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
                    placeholder="*********"
                    className="rounded-lg border-wellgab-black-2 border-[0.5px] bg-transparent block p-2 text-base text-wellgab-black-2 font-normal w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="absolute right-[10px] top-[10px]">
                    {showPasswd ? (
                      <span onClick={revealPasswd}>
                        <FaEye />
                      </span>
                    ) : (
                      <span onClick={revealPasswd}>
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
                  href={`/api/auth/login?connection=${socials.google}`}
                  className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-6 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:border-0 focus:text-grey-100 flex gap-4 items-center"
                >
                  <Image priority src={Google} alt="Google sign in button" />
                  Continue with Google
                </a>
                <a
                  href={`/api/auth/login?connection=${socials.windows}`}
                  className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-6 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:border-0 focus:text-grey-100 flex gap-4 items-center"
                >
                  <Image
                    priority
                    src={Microsoft}
                    alt="Microsoft sign in button"
                  />
                  Continue with Microsoft
                </a>
                <a
                  href={`/api/auth/login?connection=${socials.apple}`}
                  className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-6 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:border-0 focus:text-grey-100 flex gap-4 items-center"
                >
                  <Image priority src={Apple} alt="Apple sign in button" />
                  Continue with Apple
                </a>
                <button
                  disabled={isLoading}
                  className="rounded-lg bg-wellgab-green py-2 px-6 dark:text-white text-wellgab-white-1 text-lg text-center font-normal w-full hover:text-black focus:text-black"
                >
                  {isLoading ? "loading..." : "Sign up"}
                </button>
              </div>
            </form>
            <div>
              <p className="dark:text-white text-wellgab-black-2 text-center text-sm font-normal">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="dark:text-wellgab-green text-wellgab-green hover:underline"
                >
                  login
                </a>
              </p>
            </div>
          </div>
        </div>
      </CenteredPage>
    </main>
  );
}
