import CenteredPage from "@/components/CenterContainer";
import NavBar from "@/components/navbar";
import Google from "@/assets/svgs/Google svg.svg";
import Microsoft from "@/assets/svgs/Microsoft svg.svg";
import Apple from "@/assets/svgs/Apple svg.svg";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <NavBar />
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
            <form>
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
                  className="rounded-lg border-wellgab-black-2 border-[0.5px] bg-transparent block p-2 text-base text-wellgab-black-2 font-normal w-full outline-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="pb-3 block dark:text-wellgab-white-1 text-wellgab-black-1 font-medium text-sm text-left"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*********"
                  className="rounded-lg border-wellgab-black-2 border-[0.5px] bg-transparent block p-2 text-base text-wellgab-black-2 font-normal w-full outline-transparent"
                />
              </div>
              <div className="flex items-center justify-center my-8">
                <div className="border-t border-gray-500 w-full"></div>
                <div className="mx-4 text-gray-500 uppercase">or</div>
                <div className="border-t border-gray-500 w-full"></div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 my-4">
                <button className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-7 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:border-0 focus:text-grey-100 flex gap-4">
                  <Image priority src={Google} alt="Google sign in button" />
                  Continue with Google
                </button>
                <button className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-6 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:border-0 focus:text-grey-100 flex gap-4">
                  <Image
                    priority
                    src={Microsoft}
                    alt="Microsoft sign in button"
                  />
                  Continue with Microsoft
                </button>
                <button className="border-[0.3px] border-wellgab-black-2 rounded-lg py-2 px-6 dark:text-white dark:bg-wellgab-black-3 text-wellgab-black-1 text-lg text-left font-normal w-full hover:text-grey-800 hover:border-0 focus:text-grey-100 flex gap-4 items-center">
                  <Image priority src={Apple} alt="Apple sign in button" />
                  Continue with Apple
                </button>
                <button className="rounded-lg bg-wellgab-green py-2 px-6 dark:text-white text-wellgab-white-1 text-lg text-center font-normal w-full hover:text-black focus:text-black">
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
