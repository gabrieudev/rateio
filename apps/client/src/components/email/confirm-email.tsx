import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ConfirmEmailProps {
  name: string;
  link: string;
}

export const ConfirmEmail = ({ name, link }: ConfirmEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirme seu e-mail para ativar sua conta</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`}
              width="150"
              height="50"
              alt="Logo"
              style={logo}
            />
          </Section>

          {/* Mensagem principal */}
          <Section style={contentSection}>
            <Text style={heading}>Olá, {name}!</Text>
            <Text style={paragraph}>
              Obrigado por se cadastrar! Para começar a usar nossa plataforma,
              precisamos confirmar seu endereço de e-mail. Clique no botão
              abaixo para ativar sua conta.
            </Text>

            {/* Botão de confirmação */}
            <Section style={buttonContainer}>
              <Button style={button} href={link}>
                Confirmar e-mail
              </Button>
            </Section>

            {/* Link alternativo */}
            <Text style={fallbackText}>
              Se o botão não funcionar, copie e cole o link abaixo no seu
              navegador:
            </Text>
            <Link href={link} style={linkStyle}>
              {link}
            </Link>
          </Section>

          <Hr style={hr} />

          {/* Rodapé */}
          <Section style={footerSection}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Rateio. Todos os direitos reservados.
            </Text>
            <Text style={footerText}>
              Se você não se cadastrou em nossa plataforma, ignore este e-mail.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logo = {
  margin: "0 auto",
};

const contentSection = {
  backgroundColor: "#ffffff",
  padding: "40px 40px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.3",
  color: "#333333",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#555555",
  margin: "0 0 24px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#5469d4",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  padding: "12px 24px",
  display: "inline-block",
};

const fallbackText = {
  fontSize: "14px",
  color: "#888888",
  margin: "16px 0 8px 0",
};

const linkStyle = {
  fontSize: "14px",
  color: "#5469d4",
  wordBreak: "break-all" as const,
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "32px 0",
};

const footerSection = {
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#999999",
  margin: "4px 0",
};
