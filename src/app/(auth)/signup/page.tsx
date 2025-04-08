import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse | PRO",
  description: "Crea una cuenta en PRO y comienza tu experiencia deportiva",
};

export default function SignupPage() {
  return <SignupForm />;
}
