import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full text-sm text-white bg-[#09121D]">
      <div className="w-full max-w-[1376px] pb-9 mx-auto">
        <div className="h-[1px] w-full bg-white opacity-10 mb-12"></div>
        <div className="flex items-center justify-between">
          <span>© 2023 DIDhub. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <div className="border border-[#798DA3] rounded-full w-10 h-10 flex justify-center items-center">
              <Image
                alt="x"
                src="/assets/images/x.svg"
                width={18}
                height={18}
              />
            </div>
            <div className="border border-[#798DA3] rounded-full w-10 h-10 flex justify-center items-center">
              <Image
                alt="tg"
                src="/assets/images/tg.svg"
                width={18}
                height={18}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
