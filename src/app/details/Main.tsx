import Accordion from "@/components/details/Accordion";
import ActivityTable from "@/components/details/ActityTable";
import Button from "@/components/details/Button";
import Clipboard from "@/components/details/Clipboard";
import Image from "next/image";

export default function Main() {
  return (
    <div className="w-full text-sm text-white bg-[#09121D]">
      <main className="max-w-[1520px] mx-auto px-[5.75rem] pt-8 pl-20 pr-16 flex gap-7">
        <div className="flex flex-col gap-5">
          <div className="relative w-[27.375rem] h-[27.375rem]">
            <Image
              src="/assets/images/vitalik.eth.png"
              alt="vitalik.eth"
              width={454}
              height={454}
            />
            <span className="absolute left-[3.4rem] bottom-[3.4rem] text-white text-[2.4rem] font-normal">
              vitalik.eth
            </span>
          </div>

          <Accordion title="Description" defaultActive>
            <div className="flex flex-col gap-3.5">
              {description.map(({ label, value }, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[#52525B]">{label()}</span>
                  <span className="text-[#F7FAFD]">{value()}</span>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="Unicode" defaultActive>
            <div className="flex flex-col gap-3.5">
              {unicode.map(({ label, value }, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[#52525B]">{label()}</span>
                  <span className="text-[#F7FAFD]">{value()}</span>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="Details" defaultActive>
            <div className="flex flex-col gap-3.5">
              {details.map(({ label, value }, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[#52525B]">{label()}</span>
                  <span className="text-[#F7FAFD]">{value()}</span>
                </div>
              ))}
            </div>
          </Accordion>
        </div>

        <div className="flex-1">
          <div className="flex justify-between h-[3.4rem] items-center">
            <div className="flex gap-1 items-center">
              <Image
                src="/assets/images/arb.svg"
                alt="arb"
                width={18}
                height={18}
              />
              <div className="text-[#8FC7FF]">.arb Name Service</div>
              <Image
                src="/assets/images/check.svg"
                alt="check"
                width={20}
                height={20}
              />
            </div>
            <div className="flex gap-7">
              <Image
                src="/assets/images/share.svg"
                alt="share"
                width={24}
                height={24}
              />
              <Image
                src="/assets/images/refresh.svg"
                alt="refresh"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="text-3xl">vitalik.eth</div>
          <div className="flex gap-1 mb-2">
            <span>Owned by</span>
            <span className="text-[#8FC7FF]">0x22....3a9d</span>
          </div>
          <div className="text-lg mb-3">Price</div>
          <div className="flex items-center mb-5">
            <Image
              src="/assets/images/eth.svg"
              alt="eth"
              width={28.5}
              height={48}
            />
            <span className="text-5xl font-semibold">0.0034</span>
            <span className="ml-3 text-[#52525B] text-xl">($7.74)</span>
          </div>
          <div className="flex items-center mb-5">
            <Image
              src="/assets/images/opensea.svg"
              alt="opensea"
              width={30}
              height={30}
            />
            <span className="ml-1.5 text-[#F7FAFD]">Time left: 4 weeks</span>
          </div>
          <Button
            rightIcon={
              <Image
                src="/assets/images/cart.svg"
                alt="cart"
                width={18}
                height={18}
              />
            }
          >
            Buy Now
          </Button>

          <div className="bg-[#2C2D31] my-5 rounded-lg border border-[#52525B] flex justify-between py-2.5 pl-4 pr-6">
            <div className="flex flex-col items-start font-normal text-[1.125rem] opacity-50 text-[#F7FAFD]">
              <span>Beat Offer</span>
              <span>—</span>
            </div>
            <Button>Make Offer</Button>
          </div>

          <Accordion defaultActive title="Active Offers" className="my-5">
            <div className="flex opacity-50 text-[#F7FAFD] justify-center">
              No Active Offers
            </div>
          </Accordion>

          <Accordion
            defaultActive
            title="Activity"
            className="my-5"
            contentStyle={{
              padding: "0",
            }}
            actionBeforeContent={
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#232530] text-[#A8B0C1] w-[6.75rem]">
                <span className="flex gap-2.5 items-center">
                  <Image
                    src="/assets/images/all.svg"
                    alt="all"
                    width={20}
                    height={20}
                  />
                  <span>All</span>
                </span>
                <Image
                  src="/assets/images/arrow_top.svg"
                  alt="arrow"
                  width={3.5}
                  height={8}
                  className="rotate-180 scale-[3]"
                />
              </div>
            }
          >
            <div className="h-[328px]">
              <ActivityTable activity={activity}></ActivityTable>
            </div>
          </Accordion>

          <Accordion defaultActive title="History" className="my-5">
            <div className="flex items-center flex-col opacity-50 text-[#F7FAFD] justify-center">
              <Image
                src="/assets/images/clock.svg"
                alt="clock"
                width={36}
                height={36}
              />
              <span>No history yet.</span>
            </div>
          </Accordion>
        </div>
      </main>
    </div>
  );
}

const description = [
  {
    label: () => "lssued by",
    value: () => (
      <span className="flex gap-2.5">
        <Image
          src="/assets/images/ens.svg"
          alt="ens"
          className="mr-2"
          width={16}
          height={16}
        />
        <span>Ethereum Name Service</span>
      </span>
    ),
  },
  {
    label: () => "Wrapped",
    value: () => (
      <span className="flex gap-2.5">
        <Image
          src="/assets/images/ethereum.svg"
          alt="ethereum"
          className="mr-2"
          width={16}
          height={16}
        />
        <span>Ethereum</span>
      </span>
    ),
  },
  {
    label: () => "Registration Date",
    value: () => "2022-05-05 16:32",
  },
  {
    label: () => "Expiration Date",
    value: () => "2022-05-05 16:32",
  },
];

const unicode = [
  {
    label: () => "Metadata",
    value: () => (
      <span className="flex gap-2">
        <span>\u0076\u0069\u0074\u0061\u…</span>
        <Clipboard text="\u0076\u0069\u0074\u0061\u…" />
      </span>
    ),
  },
];

const details = [
  {
    label: () => "Contract Address",
    value: () => "0x57....ea85",
  },
  {
    label: () => "Token ID",
    value: () => (
      <span className="flex gap-2">
        <span>705532662614...</span>
        <Clipboard text="705532662614..." />
      </span>
    ),
  },
  {
    label: () => "Token Standard",
    value: () => "ERC-721",
  },
  {
    label: () => "Namehash",
    value: () => (
      <span className="flex gap-2">
        <span>0x3aabf90b8f...</span>
        <Clipboard text="0x3aabf90b8f..." />
      </span>
    ),
  },
  {
    label: () => "Metadata",
    value: () => (
      <span className="flex gap-2">
        <span>https://metadata.ens.domai…</span>
      </span>
    ),
  },
  {
    label: () => "Wrapped",
    value: () => "No",
  },
];

const activity = [
  {
    price: () => (
      <div className="flex items-center">
        <Image
          src="/assets/images/opensea.svg"
          alt="opensea"
          width={16}
          height={16}
        />
        <Image
          src="/assets/images/eth.svg"
          alt="eth"
          width={8.75}
          height={14}
          className="ml-2 mr-1"
        />
        <span>0.0034</span>
      </div>
    ),
    type: () => (
      <div className="flex gap-2 items-center">
        <Image
          src="/assets/images/list.svg"
          alt="list"
          width={16}
          height={16}
        />
        <span>List</span>
      </div>
    ),
    from: () => <span className="text-[#3F69D4]">0x62....4773</span>,
    to: () => "--",
    status: () => "2023-12-05 03:16:07 UTC",
  },
  {
    price: () => (
      <div className="flex items-center">
        <Image
          src="/assets/images/opensea.svg"
          alt="opensea"
          width={16}
          height={16}
        />
        <Image
          src="/assets/images/eth.svg"
          alt="eth"
          width={8.75}
          height={14}
          className="ml-2 mr-1"
        />
        <span>0.039</span>
      </div>
    ),
    type: () => (
      <div className="flex gap-2 items-center">
        <Image
          src="/assets/images/register.svg"
          alt="register"
          width={16}
          height={16}
        />
        <span className="text-white opacity-80">Register</span>
      </div>
    ),
    from: () => <span className="text-[#3F69D4]">0x81....907f</span>,
    to: () => "--",
    status: () => "2023-12-05 03:16:07 UTC",
  },
  {
    price: () => (
      <div className="flex items-center">
        <Image
          src="/assets/images/opensea.svg"
          alt="opensea"
          width={16}
          height={16}
        />
        <Image
          src="/assets/images/eth.svg"
          alt="eth"
          width={8.75}
          height={14}
          className="ml-2 mr-1"
        />
        <span>0.07</span>
      </div>
    ),
    type: () => (
      <div className="flex gap-2 items-center">
        <Image
          src="/assets/images/transfer.svg"
          alt="transfer"
          width={16}
          height={16}
        />
        <span>Transfer</span>
      </div>
    ),
    from: () => <span className="text-[#3F69D4]">0x62....4773</span>,
    to: () => "--",
    status: () => "2023-12-05 03:16:07 UTC",
  },
];
