"use client";
import { useQuery } from "@tanstack/react-query";

const GetTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json();
};
const AboutPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: () => GetTodos(),
  });

  return (
    <div>
      <h1 className="text-center py-5 text-2xl font-semibold">
        Using TanSatck Query
      </h1>
      <div className="flex justify-center py-5 flex-wrap px-2 gap-4">
        {isPending ? (
          <center>loading...</center>
        ) : (
          data.slice(0, 10).map((item: any) => {
            return (
              <div
                key={item.id}
                className="flex flex-col p-5 bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 w-100 rounded hover:shadow-md transition ">
                <p>
                  <strong>id: </strong>
                  {item.id}
                </p>
                <p>
                  <strong>userId: </strong>
                  {item.userId}
                </p>
                <p>
                  <strong>title: </strong>
                  {item.title}
                </p>
                <p>
                  <strong>body: </strong>
                  {item.body}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AboutPage;
