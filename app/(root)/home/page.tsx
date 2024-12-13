import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CommunityCard from "@/components/cards/CommunityCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help me?",
    members: 123,
    price: 0,
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    description:
      "I want to learn JavaScript, can anyone help me? I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?I want to learn JavaScript, can anyone help me?",
    members: 435,
    price: 999,
  },
  {
    _id: "3",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    members: 435,
    price: 999,
  },
  {
    _id: "4",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    members: 435,
    price: 999,
  },
  {
    _id: "5",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    members: 435,
    price: 999,
  },
];

// const test = async () => {
//   try {
//     return await api.users.getByEmail("sabrusabarish@gmail.com");
//   } catch (error) {
//     return handleError(error);
//   }
// };

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const result = await auth();

  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());
    const matchesFilter = filter
      ? question.title.toLowerCase().includes(filter?.toLowerCase())
      : true;
    return matchesQuery && matchesFilter;
  });

  return result?.user ? (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">My Communities</h1>

        {/* <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.CREATE_COMMUNITY}>Ask a Question</Link>
        </Button> */}
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/home"
          imgSrc="/icons/search.svg"
          placeholder="Search for your communities..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredQuestions.map((question) => (
          <CommunityCard
            key={question._id}
            title={question.title}
            description={question.description}
            members={question.members}
            price={question.price}
          />
        ))}
      </div>
    </>
  ) : (
    redirect("/")
  );
};

export default Home;
