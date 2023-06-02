import { render, screen } from "@testing-library/react";

import Layout, { type LayoutProps } from "./layout";

const setup = <C extends React.ElementType = "div">({
  children,
  ...props
}: LayoutProps<C>) => {
  return render(
    // @ts-expect-error TODO fix
    <Layout data-testid="layout" {...props}>
      {children}
    </Layout>
  );
};

const getLayoutElement = () => screen.getByTestId("layout");

describe("Layout", () => {
  it("should default render as div", () => {
    setup({ children: "test" });
    expect(getLayoutElement().nodeName).toBe("DIV");
  });
  it("should render section element when as = section", () => {
    setup({ as: "section", children: "test" });
    expect(getLayoutElement().nodeName).toBe("SECTION");
  });
  it("provided content should render", () => {
    const content = "testcontent";
    setup({ children: content });
    expect(getLayoutElement()).toHaveTextContent(content);
  });
  it("should contain valid class", () => {
    setup({ children: "test" });
    expect(getLayoutElement().classList.contains("container")).toBe(true);
    expect(getLayoutElement().classList.contains("mx-auto")).toBe(true);
  });
});
