import Topbar from "@/components/layout/Topbar";
import Image from "next/image";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Topbar />
      <div className="relative min-h-80vh">
        {/* Background Image */}
        <Image
          src="/illust.jpg"
          alt="Hero Background"
          fill
          objectFit="cover"
          className="absolute z-0 opacity-50"
        />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col  justify-center items-center  text-white">
          <div className="p-8 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#9d9fe6]">
                Transform your learning experience via Social learning
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-[#000000]">
                Become <br />
                A Professional in your field <br />
                through Social Learning.
              </h1>
              <p className="mt-6 text-lg md:text-xl lg:text-2xl text-[#000000]">
                Eduxpert helps you gain skills for jobs relevant to the market.
              </p>
              {/* Add a call to action button here if needed */}
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default HomeLayout;
