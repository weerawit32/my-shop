import Header from "@/components/header";

const MainLayout = ({ children }: any) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-x-hidden">
      <Header />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default MainLayout;
