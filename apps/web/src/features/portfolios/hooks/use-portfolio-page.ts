import { useRouter } from "next/router";

const usePortfolioPage = () => {
  const router = useRouter();

  return {
    slug: router.query.portfolioSlug as string,
  };
};

export default usePortfolioPage;
