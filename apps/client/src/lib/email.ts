import axios from "axios";

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string,
) => {
  await axios.post("/api/send-email", {
    to: email,
    subject: "Confirmação de Email",
    template: "confirmEmail",
    data: {
      name: name,
      link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email?token=${token}&callbackUrl=${encodeURIComponent(`${window.location.origin}/auth/login`)}`,
    },
  });
};
