"use client";
import useSWR, { mutate } from "swr";

interface DogVideo {
  url: string;
  isLiked: boolean;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const URL = "https://dogs-api.nomadcoders.workers.dev";
export default function Home() {
  const { data, mutate: refetch } = useSWR<DogVideo>(URL, fetcher);
  if (!data) return <></>;
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 h-[800px] bg-gray-700">
        <iframe src={data.url} allowFullScreen title="Dog Video" className="h-[500px] w-full" />
        <div className="w-full p-10 h-52 gap-3 flex">
          <button className="bg-white py-4 rounded-lg w-full" onClick={() => refetch()}>
            New Dog!
          </button>
          <button
            className="bg-blue-600  py-4 rounded-lg text-white w-full"
            onClick={() => mutate(URL, { ...data, isLiked: !data.isLiked }, false)}
          >
            {data.isLiked ? "like" : "unlike"}
          </button>
        </div>
      </div>
    </main>
  );
}
