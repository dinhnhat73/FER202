import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
  return (
    <div className="footer">
      <h2 style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        Footer Page Example
      </h2>
      <MyFooter
        author="TraLTB"
        email="traltb@fe.edu.vn"
        linkGithub="Movies Management Project"
      />
    </div>
  );
}
