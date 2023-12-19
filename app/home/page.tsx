import { Footer } from "../(marketing)/_components/footer";
import { Heading } from "../(marketing)/_components/heading";
import { HomeHeading } from "./_components/home-heading";
import { HomeControl } from "./_components/home-control";

const HomePage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <HomeHeading />
        <HomeControl />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;