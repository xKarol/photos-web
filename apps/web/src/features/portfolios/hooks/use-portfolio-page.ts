import { useRouter } from "next/router";

const usePortfolioPage = () => {
  const router = useRouter();
  const slug = router.query.portfolioSlug as string;

  return {
    slug: slug,
    selectedIndex: Number(router.query?.selected),
  };
};

export default usePortfolioPage;
