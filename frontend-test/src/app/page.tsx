import Image from "next/image";
import Link from "next/link";

const frontendTests = [
  {
    name: "Test 1 - 详情页面",
    path: "/details",
  },
  {
    name: "Test 2 - 图片裁剪器",
    path: "/image_cropper",
  },
  {
    name: "Test 3 - 异步任务队列",
    path: "/promise_queue",
  },
];

const solidityTests = [
  {
    name: "Test 1 - ERC20 Token",
    path: "/erc20",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 sm:py-0">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        Frontend Test
      </h1>

      <div className="flex gap-4 items-center justify-center mt-8">
        {frontendTests.map((test) => (
          <Link
            key={test.path}
            href={test.path}
            className="flex items-center justify-center w-64 h-16 px-4 py-2 mb-4 text-lg font-bold text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {test.name}
          </Link>
        ))}
      </div>

      <h1 className="text-4xl font-bold text-center text-gray-900">
        Solidity Test
      </h1>

      <div className="flex gap-4 items-center justify-center mt-8">
        {solidityTests.map((test) => (
          <Link
            key={test.path}
            href={test.path}
            className="flex items-center justify-center w-64 h-16 px-4 py-2 mb-4 text-lg font-bold text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {test.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
