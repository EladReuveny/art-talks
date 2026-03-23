import { Copyright } from "lucide-react";

type FooterProps = {};

const Footer = ({}: FooterProps) => {
  return (
    <footer className="w-screen bg-slate-200 py-10 text-center mt-20">
      <code>
        Created by Elad Reuveny | <Copyright className="inline-block" /> 2026
        All Rights Reserved
      </code>
    </footer>
  );
};

export default Footer;
