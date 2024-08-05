import Footer from "../Footer";
import FooterWrapper from "../Footer/footer-wrapper";
import Header from "../Header";



export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Header />
      {children}
     <FooterWrapper />
    </>
  );
}
